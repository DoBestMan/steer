import { BreadcrumbsItem } from '~/components/global/Breadcrumbs/Breadcrumbs';
import { ROUTE_LABELS, ROUTE_MAP, ROUTES } from '~/lib/constants';
import { removeUrlParams } from '~/lib/utils/string';

import { absoluteUrlGroups } from './regex';
import { interpolateRoute } from './routes';
import { ui } from './ui-dictionary';

interface BreadcrumbsItemWithPath extends BreadcrumbsItem {
  path: string;
}

/**
 * Returns an array of breadcrumbs based on the pathname.
 * To handle dynamic labels, it's necessary to send an object with the same
 * queryParams as their are set in the ROUTE_MAP.
 * If `querystringNodeLabel` is set, the current path is splitted into two nodes,
 * one for the path without querystrings and another with the querystrings set.
 */
export function mapPathnameToBreadcrumbs({
  asPath,
  labels,
  pathname,
  query,
  querystringNodeLabel,
}: {
  asPath: string;
  labels: { [key: string]: string };
  pathname: string;
  query: { [key: string]: string | string[] };
  querystringNodeLabel?: string | null;
}): BreadcrumbsItem[] {
  const splitPathname = pathname.match(new RegExp(absoluteUrlGroups, 'g'));
  const [querystring] = asPath.match(/[^(#?)]*$/g) || [];

  const intermediaryBreadcrumbs = splitPathname?.reduce<
    BreadcrumbsItemWithPath[]
  >((acc, cur) => {
    const isDynamic = cur.includes('[');
    const param = (isDynamic && cur.replace(/\W/g, '')) || null;
    const completePath = `${acc.slice().pop()?.path || ''}${cur}`;
    const routeExists = Object.values(ROUTE_MAP).includes(completePath);

    if (!routeExists) {
      return acc;
    }

    const staticLabel = ROUTE_LABELS[completePath];
    const label = !staticLabel && param ? labels[param] : staticLabel || '';

    return [
      ...acc,
      {
        label,
        url: interpolateRoute(completePath, query),
        path: completePath,
      },
    ];
  }, []);

  let final: BreadcrumbsItem[] = [
    {
      label: ui('breadcrumbs.home'),
      url: ROUTE_MAP[ROUTES.HOME],
    },
  ];

  if (intermediaryBreadcrumbs) {
    final = [
      ...final,
      ...intermediaryBreadcrumbs.map((item) => ({
        label: item.label,
        url: item.url,
      })),
    ];
  }

  if (querystring && querystringNodeLabel) {
    final = [
      ...final,
      {
        currentPath: true,
        label: querystringNodeLabel,
        url: asPath,
      },
    ];
  } else {
    const lastChild = final[final.length - 1];
    lastChild.currentPath = true;
    // Removing URL params on the last child due to a bug that causes
    // params that shouldn't be added to the url to show up when you hover the link
    // WCS-1606, WCS-1616

    lastChild.url = removeUrlParams(asPath);
  }

  return final;
}

/**
 * Returns an array of breadcrumbs based on an array.
 */
export function mapArrayToBreadcrumbs(
  items: {
    label?: string;
    labels?: { [key: string]: string };
    type?: ROUTES;
    url?: string;
  }[],
  query?: { [key: string]: string },
): BreadcrumbsItem[] {
  return items
    .map((item, index, array) => {
      const isCurrentPath = index === array.length - 1;
      if (item.type) {
        const route = ROUTE_MAP[item.type];

        return {
          label: item.label || ROUTE_LABELS[route],
          url: query ? interpolateRoute(route, query) : route,
          currentPath: isCurrentPath,
        };
      }

      if (!item.label || !item.url) {
        return null;
      }

      return {
        label: item.label,
        url: item.url,
        currentPath: isCurrentPath,
      };
    })
    .filter(Boolean) as BreadcrumbsItem[];
}
