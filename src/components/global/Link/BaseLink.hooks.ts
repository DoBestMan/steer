import { ROUTE_MAP } from '~/lib/constants';
import { absoluteLink, specialLink } from '~/lib/utils/regex';

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

export function useBaseLinkProps({ href, isExternal }: UseBaseLinkProps) {
  const externalProps = isExternal
    ? { rel: 'noopener noreferrer', target: '_blank' }
    : {};

  const isAbsolute = absoluteLink.test(href);
  const isSpecial = specialLink.test(href);
  const isInternal = !isAbsolute && !isSpecial && !isExternal;

  let as;
  let finalHref = href;
  let prefetch;

  if (isInternal) {
    // if link destination matches a regex, use an "as"
    Object.keys(dynamicRouteRegexMap).some((route) => {
      const regex = dynamicRouteRegexMap[route];
      const match = href.match(regex);
      if (match) {
        as = href;
        finalHref = route;
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
