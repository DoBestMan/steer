import isStrictEqual from 'fast-deep-equal';
import { ServerResponse } from 'http';
import queryString, { ParsedQuery } from 'query-string';

import { SiteQueryParams } from '~/data/models/SiteQueryParams';

import { brackets, diameterFormat } from './regex';

interface SimpleUrlObject {
  pathname: string;
  query: ParsedQuery;
}

export type Url = string | SimpleUrlObject;

/**
 * Static build has trailing `/` in routes
 * Remove leading and trailing backslash for matching
 */

export const trimSlash = (str: string) =>
  str.replace(/^\//, '').replace(/\/$/, '');

/*
 * Given a pathname, match the format for diameter + type `[diameter]-inch-[category-or-type]-tires` (eg 12-inch-winter-tires)
 * If route is not in this format we can assume it is the classic format `p[width]-[ratio]r[rim]` (eg p195-45r16)
 */
export function isRouteDiameterFormat(path?: string) {
  if (!path) {
    return false;
  }
  return diameterFormat.test(path);
}

/*
 * Given a pathname, replace interpolated vars
 */
export function interpolateRoute(
  route: string,
  templateVars: { [key: string]: string | string[] },
): string {
  return route.replace(brackets, function (n: string): string {
    let replaced: string = n;

    for (const [key, value] of Object.entries(templateVars)) {
      if (`[${key}]` === n) {
        replaced = String(value);
      }
    }

    return replaced;
  });
}

/*
 * Return stringified query param
 */
export function getParam(param: string | string[]): string {
  if (typeof param !== 'string') {
    return '';
  }

  return param;
}

/*
 * Sanitizes route parameters to transform null, undefined and
 * multiple (string[]) into an empty string value
 */
export function getStringifiedParams(
  params: Record<string, string | string[] | null | undefined>,
): Record<string, string> {
  const queryParams: Record<string, string> = {};
  Object.entries(params).map(([key, value]) => {
    if (value === null || value === undefined) {
      return;
    }

    queryParams[key] = getParam(value);
  });
  return queryParams;
}

export const getUrlObject = (
  pathname: string,
  query: string,
): SimpleUrlObject => ({
  pathname,
  query: queryString.parse(query),
});

/**
 * Build a new url string with additional query params
 */
export const getHrefWithParams = (
  currentPath: string,
  siteQueryParams: SiteQueryParams | null,
): string => {
  let href = currentPath;

  if (!siteQueryParams) {
    return href;
  }

  href = href.includes('?') ? `${href}&` : `${href}?`;

  const newParams = Object.keys(siteQueryParams).map(
    (key) => `${key}=${siteQueryParams[key]}`,
  );
  href = `${href}${newParams.join('&')}`;

  return href;
};

export const isInRouteList = (route: string, routeList: string[]) =>
  routeList.includes(route.split('?')[0]);

export const isInRouteRegexList = (url: string, routeRegexList: RegExp[]) =>
  routeRegexList.some((regex) => regex.test(url));

export function redirectToNotFound(response: ServerResponse) {
  response.setHeader('location', '/not-found');
  response.statusCode = 302;
  response.end();
}

export const isSamePath = (a: string, b: string): boolean => {
  const [pathnameA, queryA] = a.split('?');
  const [pathnameB, queryB] = b.split('?');

  if (pathnameA !== pathnameB) {
    return false;
  }

  // Had to use a spread to convert the parsed queryString object into
  // a primitive object, otherwise it does not work with `isStrictEqual`
  return isStrictEqual(
    { ...queryString.parse(queryA) },
    { ...queryString.parse(queryB) },
  );
};

export function validateRoute(
  param: string | string[],
  pattern: RegExp,
): boolean {
  return pattern.test(param.toString());
}

export function getParsedHash(path: string): ParsedQuery | null {
  if (!path.includes('#')) {
    return null;
  }

  const [hash] = path.match(/[^#]*$/g) || [];
  if (!hash) {
    return null;
  }

  const parsedHash = queryString.parse(hash);

  if (!Object.values(parsedHash).some((item) => item !== null)) {
    return {
      anchor: Object.keys(parsedHash)[0].toString(),
    };
  }

  return queryString.parse(hash);
}

/*
 * Using `getStaticProp()` + `unstable_revalidate` seems to have introduced a bug:
 * When the homepage is rebuild a few second after the initial build, the `router.asPath` value is `/index` instead of `/`.
 * An issue has been opened on the nextJS repo, but meanwhile this fix is specifically aimed at this issue.
 * Issue: https://github.com/vercel/next.js/issues/15845
 */

export function fixHomepageRoute(path: string): string {
  if (path === '/index') {
    return '/';
  }

  return path;
}
