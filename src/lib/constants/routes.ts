// TODO Finalize routes
// https://simpletire.atlassian.net/browse/WCS-9

export enum ROUTES {
  BRAND_CATEGORY = 'brandCategory',
  BRAND_DETAIL = 'brandDetail',
  BRAND_LANDING = 'brandLanding',
  BRAND_REVIEWS = 'brandReviews',
  HOME = 'home',
  PRODUCT_DETAIL = 'productDetail',
  PRODUCT_REVIEWS = 'productReviews',
  TIRE_CATEGORY = 'tireCategory',
}

// Order is important here
export const ROUTE_MAP: Record<ROUTES, string> = {
  [ROUTES.HOME]: '/',
  [ROUTES.BRAND_LANDING]: '/brands',
  [ROUTES.BRAND_DETAIL]: '/[brandName]-tires',
  [ROUTES.BRAND_REVIEWS]: '/[brandName]-tires/reviews',
  [ROUTES.BRAND_CATEGORY]: '/[brandName]/[categoryOrType]',
  [ROUTES.PRODUCT_DETAIL]: '/[brandName]-tires/[productLinkIndividualTire]',
  [ROUTES.PRODUCT_REVIEWS]:
    '/[brandName]-tires/[productLinkIndividualTire]/reviews',
  [ROUTES.TIRE_CATEGORY]: 'tire-sizes/[sizeInfo]',
};
