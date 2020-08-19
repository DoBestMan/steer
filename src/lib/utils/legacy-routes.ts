import queryString from 'query-string';

import { LEGACY_ROUTE_MAP, LEGACY_ROUTES } from '../constants/legacy-routes';
import { URLS } from '../constants/urls';
import { isProductionDeploy } from './deploy';
import { interpolateRoute } from './routes';

export function getLegacyAccountURL(): string {
  return isProductionDeploy()
    ? URLS.ACCOUNT_PRODUCTION
    : URLS.ACCOUNT_INTEGRATION;
}

interface CheckoutURLParams {
  front: string;
  quantity: { front: number; rear?: number };
  rear?: string;
  roadHazard?: boolean;
  userZip?: string;
}

export function getLegacyCheckoutURL(params?: CheckoutURLParams): string {
  let baseRoute = LEGACY_ROUTE_MAP[LEGACY_ROUTES.CHECKOUT];
  let query = {};

  if (params) {
    const { front, quantity, rear, roadHazard, userZip } = params;
    const isStaggered = front && rear && quantity.front && quantity.rear;

    baseRoute = interpolateRoute(
      LEGACY_ROUTE_MAP[
        isStaggered ? LEGACY_ROUTES.ADD_CART_STAGGERED : LEGACY_ROUTES.ADD_CART
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
    baseRoute = baseRoute.replace(/\/\//g, '');

    query = {
      rh: roadHazard ? 1 : undefined,
      zipCode: userZip,
    };
  }

  const hasQuery = Object.values(query).some((item) => item !== undefined);

  const baseUrl = isProductionDeploy()
    ? URLS.CHECKOUT_PRODUCTION
    : URLS.CHECKOUT_INTEGRATION;

  return `${baseUrl}${baseRoute}${
    hasQuery ? `?${queryString.stringify(query)}` : ''
  }`;
}
