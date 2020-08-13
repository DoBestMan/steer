import queryString from 'query-string';

import { LEGACY_ROUTE_MAP, LEGACY_ROUTES } from '../constants/legacy-routes';
import { URLS } from '../constants/urls';
import { interpolateRoute } from './routes';

export function getLegacyAccountURL(): string {
  // This function will allow for different URLs in different environments
  // in the future. For now, we're keepping it simple and, just like checkout,
  // all Steer environments point to the production account URL.
  return URLS.ACCOUNT;
}

export function getLegacyCheckoutURL({
  front,
  quantity,
  rear,
  roadHazard,
  userZip,
}: {
  front: string;
  quantity: { front: number; rear?: number };
  rear?: string;
  roadHazard?: boolean;
  userZip?: string;
}): string {
  const isStaggered = front && rear && quantity.front && quantity.rear;

  const baseRoute = interpolateRoute(
    LEGACY_ROUTE_MAP[
      isStaggered ? LEGACY_ROUTES.CHECKOUT_STAGGERED : LEGACY_ROUTES.CHECKOUT
    ],
    {
      a: (quantity.front && front) || (quantity.rear && rear) || '',
      aQuantity:
        (quantity.front && quantity.front.toString()) ||
        (quantity.rear && quantity.rear.toString()) ||
        '',
      b: rear || '',
      bQuantity: (quantity.rear && quantity.rear.toString()) || '',
    },
  );

  // Remove '//' in case of single size
  const parsedBaseRoute = baseRoute.replace(/\/\//g, '');

  const query = {
    rh: roadHazard ? 1 : undefined,
    zipCode: userZip,
  };

  const hasQuery = Object.values(query).some((item) => item !== undefined);

  const baseUrl = URLS.CHECKOUT;

  return `${baseUrl}${parsedBaseRoute}${
    hasQuery ? `?${queryString.stringify(query)}` : ''
  }`;
}
