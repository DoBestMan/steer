import { ICONS } from '~/components/global/Icon/Icon.constants';
import { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';

export const everyPurchaseIncludesData = [
  {
    description: 'Fast, free shipping on every tire we sell.',
    icon: ICONS.FREE_SHIPPING,
    linkLabel: 'Learn more',
    modalId: STATIC_MODAL_IDS.GLOBAL_FREE_SHIPPING,
    title: 'Free Shipping',
  },
  {
    description:
      'Buy from local distributors, install at local service centers.',
    icon: ICONS.LOCAL_BUSINESS,
    linkLabel: 'How it works',
    modalId: STATIC_MODAL_IDS.GLOBAL_SUPPORT_LOCAL_BUSINESS,
    title: 'Support local businesses',
  },
  {
    description:
      'Sometimes things don’t go as planned. That’s why we accept returns of unmounted tires for up to 30 days.',
    icon: ICONS.FREE_RETURNS,
    linkLabel: '30 day returns',
    modalId: STATIC_MODAL_IDS.GLOBAL_EASY_RETURN,
    title: 'Easy returns',
  },
  {
    description: 'Have questions? Live tire specialists are here to help.',
    icon: ICONS.CUSTOMER_SUPPORT,
    linkLabel: 'Contact us',
    modalId: STATIC_MODAL_IDS.GLOBAL_LIVE_CUSTOMER_SUPPORT,
    title: 'Live customer support',
  },
];
