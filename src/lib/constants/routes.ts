// TODO Finalize routes
// https://simpletire.atlassian.net/browse/WCS-9

import { ui } from '../utils/ui-dictionary';

export enum ROUTES {
  ABOUT = 'about',
  BRAND_CATEGORY = 'brandCategory',
  BRAND_DETAIL = 'brandDetail',
  BRAND_LANDING = 'brandLanding',
  BRAND_REVIEWS = 'brandReviews',
  BRAND_TYPE = 'brandType',
  CATEGORY_DETAIL = 'categoryDetail',
  CATEGORY_LANDING = 'categoryLanding',
  CATEGORY_REVIEWS = 'categoryReviews',
  CUSTOMER_SUPPORT = 'customerSupport',
  DEALS = 'deals',
  FAQS = 'faqs',
  FINANCING = 'financing',
  FREE_SHIPPING = 'freeShipping',
  HOME = 'home',
  LEARN = 'learn',
  ORDER_TRACKING = 'orderTracking',
  ORDER_TRACKING_RESULT = 'orderTrackingResult',
  PRODUCT_DETAIL = 'productDetail',
  PRODUCT_DETAIL_PLA = 'productDetailPla',
  PRODUCT_REVIEWS = 'productReviews',
  RETURNS = 'returns',
  SITEMAP = 'sitemap',
  TERMS = 'terms',
  TIRE_BUYING_GUIDE = 'tireBuyingGuide',
  TIRE_REVIEWS = 'tireReviews',
  TIRE_REVIEWS_TEMP = 'tireReviewsTempBrandOrCategoryOrType',
  TIRE_SIZE_CATALOG_OR_CATEGORY = 'tireSizeCatalogOrCategory',
  TYPE_DETAIL = 'typeDetail',
  TYPE_LANDING = 'typeLanding',
  TYPE_REVIEWS = 'typeReviews',
  VEHICLE_CATALOG = 'vehicleCatalog',
  WRITE_REVIEW = 'writeReview',
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
  [ROUTES.WRITE_REVIEW]: '/brands/[brand]/[productLine]/write-a-review',
  [ROUTES.CATEGORY_LANDING]: '/categories',
  [ROUTES.CATEGORY_DETAIL]: '/categories/[category]',
  [ROUTES.CATEGORY_REVIEWS]: '/categories/[category]/reviews',
  [ROUTES.TIRE_REVIEWS]: '/tire-reviews',
  [ROUTES.TIRE_REVIEWS_TEMP]: '/tire-reviews/[section]',
  [ROUTES.TYPE_LANDING]: '/types',
  [ROUTES.TYPE_DETAIL]: '/types/[type]',
  [ROUTES.TYPE_REVIEWS]: '/types/[type]/reviews',
  [ROUTES.VEHICLE_CATALOG]: '/vehicles/[make]/[model]/[year]',
  [ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY]: '/tire-sizes/[size]',
  // Order does not matter starting here
  [ROUTES.ABOUT]: '/about',
  [ROUTES.CUSTOMER_SUPPORT]: '/customer-support',
  [ROUTES.DEALS]: '/tire-deals',
  [ROUTES.FAQS]: '/faqs',
  [ROUTES.FREE_SHIPPING]: '/free-shipping',
  [ROUTES.FINANCING]: '/financing',
  [ROUTES.LEARN]: '/learn',
  [ROUTES.ORDER_TRACKING_RESULT]: '/track-your-order/result',
  [ROUTES.ORDER_TRACKING]: '/track-your-order',
  [ROUTES.PRODUCT_DETAIL_PLA]: '/paid',
  [ROUTES.RETURNS]: '/returns',
  [ROUTES.SITEMAP]: '/sitemap',
  [ROUTES.TERMS]: '/terms',
  [ROUTES.TIRE_BUYING_GUIDE]: '/tire-buying-guide',
};

export const CATALOG_ROUTES = [
  ROUTE_MAP[ROUTES.BRAND_CATEGORY],
  ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
  ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
];

export const ACCOUNT_ROUTE =
  'https://checkout.simpletire.com/my_customers/login';

// null for dynamic labels
export const ROUTE_LABELS: Record<string, string | null> = {
  [ROUTE_MAP[ROUTES.HOME]]: ui('breadcrumbs.home'),
  [ROUTE_MAP[ROUTES.BRAND_LANDING]]: ui('breadcrumbs.brands'),
  [ROUTE_MAP[ROUTES.BRAND_DETAIL]]: null,
  [ROUTE_MAP[ROUTES.BRAND_REVIEWS]]: ui('breadcrumbs.reviews'),
  [ROUTE_MAP[ROUTES.CATEGORY_LANDING]]: ui('breadcrumbs.categories'),
  [ROUTE_MAP[ROUTES.CATEGORY_DETAIL]]: null,
  [ROUTE_MAP[ROUTES.CATEGORY_REVIEWS]]: ui('breadcrumbs.reviews'),
  [ROUTE_MAP[ROUTES.PRODUCT_DETAIL]]: null,
  [ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA]]: null,
  [ROUTE_MAP[ROUTES.PRODUCT_REVIEWS]]: ui('breadcrumbs.reviews'),
  [ROUTE_MAP[ROUTES.BRAND_CATEGORY]]: null,
  [ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY]]: null,
  [ROUTE_MAP[ROUTES.TIRE_REVIEWS]]: ui('breadcrumbs.tireReviews'),
  [ROUTE_MAP[ROUTES.TIRE_REVIEWS_TEMP]]: null,
  [ROUTE_MAP[ROUTES.TYPE_LANDING]]: ui('breadcrumbs.types'),
  [ROUTE_MAP[ROUTES.TYPE_DETAIL]]: null,
  [ROUTE_MAP[ROUTES.TYPE_REVIEWS]]: ui('breadcrumbs.reviews'),
  [ROUTE_MAP[ROUTES.SITEMAP]]: ui('breadcrumbs.sitemap'),
  [ROUTE_MAP[ROUTES.VEHICLE_CATALOG]]: null,
  [ROUTE_MAP[ROUTES.WRITE_REVIEW]]: ui('breadcrumbs.writeReview'),
};
