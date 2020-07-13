import { ICONS } from '~/components/global/Icon/Icon.constants';
import { STATIC_MODAL_IDS } from '~/lib/constants/staticModals';

export const everyPurchaseIncludesData = [
  {
    description: 'Fast, free shipping on every tire we sell.',
    icon: ICONS.FREE_SHIPPING,
    linkLabel: '2 days to Brooklyn, NY',
    modalId: STATIC_MODAL_IDS.GLOBAL_FREE_SHIPPING,
    title: 'Free Shipping',
  },
  {
    description: 'Found a better price after you bought? We match it.',
    icon: ICONS.BEST_PRICE,
    linkLabel: '30 day guarantee',
    modalId: STATIC_MODAL_IDS.GLOBAL_BEST_PRICE_GUARANTEE,
    title: 'Best price guarantee',
  },
  {
    description: 'Buy from local distributores, install in local stores.',
    icon: ICONS.LOCAL_BUSINESS,
    linkLabel: 'How it works',
    modalId: STATIC_MODAL_IDS.GLOBAL_SUPPORT_LOCAL_BUSINESS,
    title: 'Support to local business',
  },
  {
    description: "Don't like it? Unmounted tires can be sent back.",
    icon: ICONS.FREE_RETURNS,
    linkLabel: '30 day free return',
    modalId: STATIC_MODAL_IDS.GLOBAL_EASY_RETURN,
    title: 'Free, easy returns',
  },
  {
    description: 'Unmounted tires will be refunded in full.',
    icon: ICONS.MONEY_BACK,
    linkLabel: 'How it works',
    modalId: STATIC_MODAL_IDS.GLOBAL_MONEY_BACK_GUARANTEE,
    title: 'Money-back guarantee',
  },
  {
    description: 'Tire specialists are here to assist you with any doubt.',
    icon: ICONS.CUSTOMER_SUPPORT,
    linkLabel: 'Contact us',
    modalId: STATIC_MODAL_IDS.GLOBAL_LIVE_CUSTOMER_SUPPORT,
    title: 'Live customer support',
  },
];
