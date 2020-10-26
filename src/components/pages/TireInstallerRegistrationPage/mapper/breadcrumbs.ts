import { ParsedUrlQuery } from 'querystring';

import { ROUTES } from '~/lib/constants/routes';
import { mapArrayToBreadcrumbs } from '~/lib/utils/breadcrumbs';

export function mapQueryToBreadcrumbs(query: ParsedUrlQuery, label: string) {
  return mapArrayToBreadcrumbs(
    [
      {
        type: ROUTES.HOME,
      },
      {
        label,
        type: ROUTES.BECOME_A_TIRE_INSTALLER,
      },
    ],
    query,
  );
}
