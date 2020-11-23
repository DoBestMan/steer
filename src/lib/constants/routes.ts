// TODO Finalize routes
// https://simpletire.atlassian.net/browse/WCS-9

import { ui } from '../utils/ui-dictionary';

export enum ROUTES {
  ABOUT = 'about',
  ADVOCATE_DASHBOARD = 'advocateDashboard',
  BECOME_A_TIRE_INSTALLER = 'becomeATireInstaller',
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
  INVITE = 'invite',
  LEARN = 'learn',
  LEARN_CATEGORY_SLUG = 'learnCategorySlug',
  MILITARY_DISCOUNT = 'militaryDiscount',
  OPEN_TEMPLATE = 'openTemplate',
  ORDER_TRACKING = 'orderTracking',
  ORDER_TRACKING_RESULT = 'orderTrackingResult',
  PRIVACY = 'privacy',
  PRODUCT_DETAIL = 'productDetail',
  PRODUCT_DETAIL_PLA = 'productDetailPla',
  PRODUCT_REVIEWS = 'productReviews',
  RETURNS = 'returns',
  SITEMAP = 'sitemap',
  TERMS = 'terms',
  TIRE_BUYING_GUIDE = 'tireBuyingGuide',
  TIRE_DEALS_BLACK_FRIDAY = 'tireDealsBlackFriday',
  TIRE_DEALS_CYBER_MONDAY = 'tireDealsCyberMonday',
  TIRE_REVIEWS = 'tireReviews',
  TIRE_REVIEWS_TEMP = 'tireReviewsTempBrandOrCategoryOrType',
  TIRE_SALES = 'tire-sales',
  TIRE_SIZE_CATALOG_OR_CATEGORY = 'tireSizeCatalogOrCategory',
  TIRE_SIZES_LANDING = 'tireSizesLanding',
  TYPE_DETAIL = 'typeDetail',
  TYPE_LANDING = 'typeLanding',
  TYPE_REVIEWS = 'typeReviews',
  VEHICLE_CATALOG = 'vehicleCatalog',
  VEHICLES = 'vehicles',
  WRITE_REVIEW = 'writeReview',
}

// This list includes:
// - Dynamic routes (with [] brackets)
// - Static routes

// Adding a route to ROUTE_TYPE_MAP will make sure the
// BaseLink component avoids refreshing the app for internal link

// Order is important!
export const ROUTE_TYPE_MAP: { [routeName: string]: string } = {
  [ROUTES.HOME]: '/',
  [ROUTES.BRAND_LANDING]: '/brands',
  [ROUTES.BECOME_A_TIRE_INSTALLER]: '/become-a-tire-installer',
  [ROUTES.BRAND_DETAIL]: '/brands/[brand]',
  [ROUTES.BRAND_REVIEWS]: '/brands/[brand]/reviews',
  [ROUTES.BRAND_TYPE]: '/brands/[brand]/types/[categoryOrType]',
  [ROUTES.BRAND_CATEGORY]: '/brands/[brand]/categories/[categoryOrType]',
  [ROUTES.TIRE_DEALS_BLACK_FRIDAY]: '/tire-deals/black-friday-sale',
  [ROUTES.TIRE_DEALS_CYBER_MONDAY]: '/tire-deals/cyber-monday-sale',
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
  [ROUTES.ADVOCATE_DASHBOARD]: '/advocate-dashboard',
  [ROUTES.CUSTOMER_SUPPORT]: '/contact',
  [ROUTES.INVITE]: '/invite',
  [ROUTES.DEALS]: '/tire-deals',
  [ROUTES.ORDER_TRACKING_RESULT]: '/track-your-order/result',
  [ROUTES.ORDER_TRACKING]: '/track-your-order',
  [ROUTES.PRODUCT_DETAIL_PLA]: '/paid',
  [ROUTES.PRIVACY]: '/privacy-policy',
  [ROUTES.SITEMAP]: '/sitemap',
  [ROUTES.VEHICLES]: '/vehicles',
  [ROUTES.TIRE_SIZES_LANDING]: '/tire-sizes',
  [ROUTES.OPEN_TEMPLATE]: '/[slug]',
  [ROUTES.LEARN_CATEGORY_SLUG]: '/learn/[category]/[slug]',
  [ROUTES.TIRE_SALES]: '/tire-sales',
};

// This is a master list of all routes

// This list includes known instances of dynamic routes above.
// For example, we have `/terms`, and instance of `/[slug]`.

// Adding a route to ROUTE_MAP does not affect any logic in BaseLink
// It just stores our known routes as constants for links in the footer, etc.
export const ROUTE_MAP: { [routeName: string]: string } = {
  ...ROUTE_TYPE_MAP,
  [ROUTES.FINANCING]: '/financing',
  [ROUTES.TERMS]: '/terms',
  [ROUTES.ABOUT]: '/about',
  [ROUTES.FAQS]: '/faqs',
  [ROUTES.FREE_SHIPPING]: '/free-shipping',
  [ROUTES.LEARN]: '/learn',
  [ROUTES.MILITARY_DISCOUNT]: '/military-discount',
  [ROUTES.RETURNS]: '/returns-and-refunds',
  [ROUTES.TIRE_BUYING_GUIDE]: '/tire-buying-guide',
};

export const CATALOG_ROUTES = [
  ROUTE_MAP[ROUTES.BRAND_CATEGORY],
  ROUTE_MAP[ROUTES.BRAND_TYPE],
  ROUTE_MAP[ROUTES.VEHICLE_CATALOG],
  ROUTE_MAP[ROUTES.TIRE_SIZE_CATALOG_OR_CATEGORY],
];

export const CATALOG_ROUTES_REGEX = [
  /\/brands\/.*\/categories\/.*/, // '/brands/[brand]/categories/[categoryOrType]'
  /\/vehicles\/.*\/.*\/.*/, // '/vehicles/[make]/[model]/[year]'
  /\/tire-sizes\/.*/, // '/tire-sizes/[size]'
  /\/brands\/.*\/types\/.*/, // '/brands/[brand]/types/[categoryOrType]'
];

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
  [ROUTE_MAP[ROUTES.VEHICLE_CATALOG]]: ui('breadcrumbs.vehicleCatalog'),
  [ROUTE_MAP[ROUTES.WRITE_REVIEW]]: ui('breadcrumbs.writeReview'),
  [ROUTE_MAP[ROUTES.VEHICLES]]: ui('breadcrumbs.vehicles'),
  [ROUTE_MAP[ROUTES.TIRE_SIZES_LANDING]]: ui('breadcrumbs.tireSizes'),
  [ROUTE_MAP[ROUTES.TIRE_SALES]]: ui('breadcrumbs.tireSales'),
};
