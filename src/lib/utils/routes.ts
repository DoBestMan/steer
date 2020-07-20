import queryString from 'query-string';
import { UrlObject } from 'url';

import { brackets, diameterFormat } from './regex';

export type Url = string | UrlObject;

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
 * Return stringified query param
 */
export function getStringifiedParams(
  params: Record<string, string | string[]>,
): Record<string, string> {
  const queryParams: Record<string, string> = {};
  Object.entries(params).map(([key, value]) => {
    queryParams[key] = getParam(value);
  });
  return queryParams;
}

export const getUrlObject = (pathname: string, query: string): Url => ({
  pathname,
  query: queryString.parse(query),
});
