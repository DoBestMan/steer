export enum LEGACY_ROUTES {
  ADD_CART = 'addCart',
  ADD_CART_STAGGERED = 'addCartStaggered',
  CHECKOUT = 'checkout',
}

// Order is important here
export const LEGACY_ROUTE_MAP: Record<LEGACY_ROUTES, string> = {
  [LEGACY_ROUTES.ADD_CART]: '/MyCart/add/[a]/[aQuantity]',
  [LEGACY_ROUTES.ADD_CART_STAGGERED]:
    '/MyCart/addstaggered/[a]/[aQuantity]/[b]/[bQuantity]',
  [LEGACY_ROUTES.CHECKOUT]: '/my_cart/checkout',
};
