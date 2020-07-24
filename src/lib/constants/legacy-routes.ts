export enum LEGACY_ROUTES {
  CHECKOUT = 'checkout',
  CHECKOUT_STAGGERED = 'checkoutStaggered',
}

// Order is important here
export const LEGACY_ROUTE_MAP: Record<LEGACY_ROUTES, string> = {
  [LEGACY_ROUTES.CHECKOUT]: '/MyCart/add/[a]/[aQuantity]',
  [LEGACY_ROUTES.CHECKOUT_STAGGERED]:
    '/MyCart/addstaggered/[a]/[aQuantity]/[b]/[bQuantity]',
};
