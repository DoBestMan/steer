import { FeaturedInfoModuleProps } from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { LINK_TYPES, ROUTE_MAP, ROUTES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

export const PROMOTIONS: { [key: string]: FeaturedInfoModuleProps } = {
  easyReturn: {
    action: {
      as: LINK_TYPES.A,
      href: ROUTE_MAP[ROUTES.RETURNS],
      text: ui('footer.promotions.easyReturnAction'),
    },
    copy: ui('footer.promotions.easyReturnCopy'),
    icon: ICONS.FREE_RETURNS,
    title: ui('footer.promotions.easyReturnTitle'),
  },
  freeShipping: {
    action: {
      as: LINK_TYPES.A,
      href: ROUTE_MAP[ROUTES.FREE_SHIPPING],
      text: ui('footer.promotions.freeShippingAction'),
    },
    copy: ui('footer.promotions.freeShippingCopy'),
    icon: ICONS.FREE_SHIPPING,
    title: ui('footer.promotions.freeShippingTitle'),
  },
  giftCard: {
    copy: ui('footer.promotions.giftCardCopy'),
    icon: ICONS.GIFT,
    title: ui('footer.promotions.giftCardTitle'),
  },
  militaryDiscount: {
    action: {
      as: LINK_TYPES.A,
      href: ROUTE_MAP[ROUTES.MILITARY_DISCOUNT],
      text: ui('footer.promotions.militaryDiscountAction'),
    },
    copy: ui('footer.promotions.militaryDiscountCopy'),
    icon: ICONS.MONEY_BACK,
    title: ui('footer.promotions.militaryDiscountTitle'),
  },
  signUp: {
    copy: ui('footer.promotions.signUpCopy'),
    icon: ICONS.LIGHTNING_OUTLINE,
    title: ui('footer.promotions.signUpTitle'),
  },
};
