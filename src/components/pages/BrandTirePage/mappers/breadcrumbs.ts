import { ParsedUrlQuery } from 'querystring';

import { mapPathnameToBreadcrumbs } from '~/lib/utils/breadcrumbs';
import { capitalize } from '~/lib/utils/string';

export function mapPageRouteToBreadcrumbs(
  asPath: string,
  pathname: string,
  query: ParsedUrlQuery,
  urlString: string | string[],
) {
  const breadcrumbs = mapPathnameToBreadcrumbs({
    asPath,
    labels: {
      brand: capitalize(`${urlString}`),
      productLine: 'all',
    },
    pathname,
    query,
  });

  return breadcrumbs;
}
