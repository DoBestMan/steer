// TODO Finalize routes
// https://simpletire.atlassian.net/browse/WCS-9

import { ui } from '../utils/ui-dictionary';

export enum ROUTES {
  BRAND_CATEGORY = 'brandCategory',
  BRAND_DETAIL = 'brandDetail',
  BRAND_LANDING = 'brandLanding',
  BRAND_REVIEWS = 'brandReviews',
  BRAND_TYPE = 'brandType',
  CATEGORY_REVIEWS = 'categoryReviews',
  HOME = 'home',
  ORDER_TRACKING = 'orderTracking',
  ORDER_TRACKING_RESULT = 'orderTrackingResult',
  PRODUCT_DETAIL = 'productDetail',
  PRODUCT_DETAIL_PLA = 'productDetailPla',
  PRODUCT_REVIEWS = 'productReviews',
  TIRE_CATEGORY = 'tireCategory',
  TIRE_REVIEWS = 'tireReviews',
  TYPE_REVIEWS = 'typeReviews',
  VEHICLES_CATEGORY = 'vehiclesCategory',
}

// Order is important here
export const ROUTE_MAP: Record<ROUTES, string> = {
  [ROUTES.HOME]: '/',
  [ROUTES.BRAND_LANDING]: '/brands',
  [ROUTES.BRAND_DETAIL]: '/brands/[brand]',
  [ROUTES.BRAND_REVIEWS]: '/brands/[brand]/reviews',
  [ROUTES.BRAND_TYPE]: '/brands/[brand]/types/[categoryOrType]',
  [ROUTES.BRAND_CATEGORY]: '/brands/[brand]/categories/[categoryOrType]',
  [ROUTES.PRODUCT_DETAIL]: '/brands/[brand]/[productLine]',
  [ROUTES.PRODUCT_REVIEWS]: '/brands/[brand]/[productLine]/reviews',
  [ROUTES.CATEGORY_REVIEWS]: '/categories/[category]/reviews',
  [ROUTES.TIRE_CATEGORY]: '/tire-sizes/[sizeInfo]',
  [ROUTES.TIRE_REVIEWS]: '/tire-reviews',
  [ROUTES.TYPE_REVIEWS]: '/types/[type]/reviews',
  [ROUTES.VEHICLES_CATEGORY]: '/vehicles/[make]/[model]/[year]',
  [ROUTES.ORDER_TRACKING]: '/track-your-order',
  [ROUTES.ORDER_TRACKING_RESULT]: '/track-your-order/result',
  [ROUTES.TIRE_CATEGORY]: '/tire-sizes/[size]',
  [ROUTES.PRODUCT_DETAIL_PLA]: '/paid',
};

// null for dynamic labels
export const ROUTE_LABELS: Record<string, string | null> = {
  [ROUTE_MAP[ROUTES.HOME]]: ui('breadcrumbs.home'),
  [ROUTE_MAP[ROUTES.BRAND_LANDING]]: ui('breadcrumbs.brands'),
  [ROUTE_MAP[ROUTES.BRAND_DETAIL]]: null,
  [ROUTE_MAP[ROUTES.BRAND_REVIEWS]]: ui('breadcrumbs.reviews'),
  [ROUTE_MAP[ROUTES.PRODUCT_DETAIL]]: null,
  [ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA]]: null,
  [ROUTE_MAP[ROUTES.PRODUCT_REVIEWS]]: ui('breadcrumbs.reviews'),
  [ROUTE_MAP[ROUTES.BRAND_CATEGORY]]: null,
  [ROUTE_MAP[ROUTES.TIRE_CATEGORY]]: null,
  [ROUTE_MAP[ROUTES.VEHICLES_CATEGORY]]: null,
};
