import { FeaturedInfoModuleProps } from '~/components/global/FeaturedInfoModule/FeaturedInfoModule';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { LINK_TYPES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

const handleDemoClick = () => {
  //demo handler
};
export const graphicGridItems: Array<FeaturedInfoModuleProps> = [
  {
    action: {
      as: LINK_TYPES.BUTTON,
      onClick: handleDemoClick,
      text: ui('footer.promotions.signUpAction'),
    },
    copy: ui('footer.promotions.signUpCopy'),
    icon: ICONS.LIGHTNING_OUTLINE,
    title: ui('footer.promotions.signUpTitle'),
  },
  {
    action: {
      as: LINK_TYPES.BUTTON,
      onClick: handleDemoClick,
      text: ui('footer.promotions.giftCardAction'),
    },
    copy: ui('footer.promotions.giftCardCopy'),
    icon: ICONS.GIFT,
    title: ui('footer.promotions.giftCardTitle'),
  },
  {
    action: {
      as: LINK_TYPES.A,
      href: '/military-discounts',
      text: ui('footer.promotions.militaryDiscountAction'),
    },
    copy: ui('footer.promotions.militaryDiscountCopy'),
    icon: ICONS.MONEY_BACK,
    title: ui('footer.promotions.militaryDiscountTitle'),
  },
  {
    action: {
      as: LINK_TYPES.A,
      href: '/free-shipping',
      text: ui('footer.promotions.freeShippingAction'),
    },
    copy: ui('footer.promotions.freeShippingCopy'),
    icon: ICONS.FREE_SHIPPING,
    title: ui('footer.promotions.freeShippingTitle'),
  },
];
