import { FeaturedInfoModuleProps } from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { LINK_TYPES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

export const PROMOTIONS: { [key: string]: FeaturedInfoModuleProps } = {
  signUp: {
    copy: ui('footer.promotions.signUpCopy'),
    icon: ICONS.LIGHTNING_OUTLINE,
    title: ui('footer.promotions.signUpTitle'),
  },
  giftCard: {
    copy: ui('footer.promotions.giftCardCopy'),
    icon: ICONS.GIFT,
    title: ui('footer.promotions.giftCardTitle'),
  },
  militaryDiscount: {
    action: {
      as: LINK_TYPES.A,
      href: '/military-discounts',
      text: ui('footer.promotions.militaryDiscountAction'),
    },
    copy: ui('footer.promotions.militaryDiscountCopy'),
    icon: ICONS.MONEY_BACK,
    title: ui('footer.promotions.militaryDiscountTitle'),
  },
  freeShipping: {
    action: {
      as: LINK_TYPES.A,
      href: '/free-shipping',
      text: ui('footer.promotions.freeShippingAction'),
    },
    copy: ui('footer.promotions.freeShippingCopy'),
    icon: ICONS.FREE_SHIPPING,
    title: ui('footer.promotions.freeShippingTitle'),
  },
};
