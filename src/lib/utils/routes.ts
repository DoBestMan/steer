import { ROUTES } from '../constants';
import { brackets } from './regex';

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
export function isRouteDiameterFormat(path: string) {
  const regex = /[\d]*-(inch)-[a-zA-Z]*-(tires)/;
  return regex.test(path);
}

export function getRoutesRegex(
  routeMap: Record<ROUTES, string>,
): Record<string, RegExp> {
  return Object.values(routeMap).reduce((acc, route) => {
    return {
      ...acc,
      [route]: new RegExp(`^${route.replace(/\[\w+\]/g, '[\\w-]+')}$`),
    };
  }, {});
}

/*
 * Given a pathname, replace interpolated vars
 */
export function interpolateRoute(
  route: string,
  templateVars: { [key: string]: string },
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
