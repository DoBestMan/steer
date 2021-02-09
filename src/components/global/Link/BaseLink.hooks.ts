import { LinkProps } from 'next/link';
import queryString from 'query-string';

import { ROUTE_TYPE_MAP } from '~/lib/constants';
import { absoluteLink, specialLink } from '~/lib/utils/regex';
import { getUrlObject, Url } from '~/lib/utils/routes';

// Turn links into regular expressions we can use to match routes from the API
const routeRegexMap: Record<string, RegExp> = {};
Object.values(ROUTE_TYPE_MAP).forEach((route) => {
  routeRegexMap[route] = new RegExp(
    `^${route.replace(/\[\w+\]/g, '[\\w-]+')}(#.*)?$`,
  );
});

export interface RouteQueryParamOptions {
  params: Record<string, string>;
  routes: string[];
}

export interface UseBaseLinkProps {
  href: string;
  isExternal?: boolean;
  routeQueryParamOptions?: RouteQueryParamOptions;
  title?: string;
}

interface ExternalProps {
  rel?: string;
  target?: string;
}

export interface UseBaseLinkReturnProps
  extends Pick<LinkProps, 'as' | 'prefetch'> {
  externalProps: ExternalProps;
  finalHref: Url;
  isInternal: boolean;
  title?: string;
}

export function useBaseLinkProps({
  href,
  isExternal,
  routeQueryParamOptions,
  title,
}: UseBaseLinkProps): UseBaseLinkReturnProps {
  const externalProps = isExternal
    ? { rel: 'noopener noreferrer', target: '_blank' }
    : {};

  const isAbsolute = absoluteLink.test(href);
  const isSpecial = specialLink.test(href);
  const isInternal = !isAbsolute && !isSpecial && !isExternal;

  let as;
  let finalHref: Url = href;
  let prefetch;

  if (isInternal) {
    Object.keys(routeRegexMap).some((route) => {
      const regex = routeRegexMap[route];
      // For urls with query params, only use the path to
      // match against the regex
      const [pathname, query] = href.split('?');
      const match = pathname.match(regex);

      if (match) {
        const isDynamic = route.includes('[');
        if (isDynamic) {
          // if link matches a dynamic route, use an "as"
          finalHref = getUrlObject(route, query);

          /**
           * BaseLink accepts an optional routeQueryParamOptions prop in this format:
           * {
           *   routes: [route1, route2],
           *   params: {
           *     promotion: 'ABC',
           *   },
           * };

           * In this function:
           * - Check if routes list contains finalHref route
           * - If so, append the specified params to query objects

           * Example use case: Apply a promotion filter to all search result links
           * that lead to Vehicle/Tire Size catalog pages.
           */
          const enhancedQuery = {
            ...finalHref.query,
            ...(routeQueryParamOptions?.routes.includes(finalHref.pathname)
              ? routeQueryParamOptions.params
              : {}),
          };
          finalHref.query = enhancedQuery;

          const parsedQuery = queryString.stringify(enhancedQuery);
          as = `${pathname}${parsedQuery ? `?${parsedQuery}` : ''}`;
        }

        // If we found a match, end the search,
        // whether the match was a dynamic route (eg /[slug])
        // or a static route (eg /track-your-order)
        return true;
      }
      return false;
    });
  } else {
    // Turn off prefetching for external/absolute links.
    // Prefer undefined instead of true, per:
    // https://err.sh/zeit/next.js/prefetch-true-deprecated
    prefetch = false;
  }

  return {
    as,
    externalProps,
    finalHref,
    isInternal,
    prefetch,
    title,
  };
}
