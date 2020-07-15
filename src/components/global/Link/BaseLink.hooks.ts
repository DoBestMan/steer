import { LinkProps } from 'next/link';

import { ROUTE_MAP } from '~/lib/constants';
import { absoluteLink, specialLink } from '~/lib/utils/regex';
import { getUrlObject, Url } from '~/lib/utils/routes';

// Turn links into regular expressions we can use to match routes from the API
const dynamicRouteRegexMap: Record<string, RegExp> = {};
Object.values(ROUTE_MAP).forEach((route) => {
  const isDynamicRoute = route.includes('[');
  if (isDynamicRoute) {
    dynamicRouteRegexMap[route] = new RegExp(
      `^${route.replace(/\[\w+\]/g, '[\\w-]+')}$`,
    );
  }
});

export interface UseBaseLinkProps {
  href: string;
  isExternal?: boolean;
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
}

export function useBaseLinkProps({
  href,
  isExternal,
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
    // if link destination matches a regex, use an "as"
    Object.keys(dynamicRouteRegexMap).some((route) => {
      const regex = dynamicRouteRegexMap[route];
      // For urls with query params, only use the path to
      // match against the regex
      const [pathname, query] = href.split('?');
      const match = pathname.match(regex);

      if (match) {
        as = getUrlObject(pathname, query);
        finalHref = getUrlObject(route, query);
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
  };
}
