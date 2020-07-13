import { ModalContentProps } from '~/components/global/ContentModal/ContentModal';
import { SiteImageNullableTypeEnum } from '~/data/models/SiteImageNullable';

// Static modals associated with IDs that can be references from the API

export enum STATIC_MODAL_IDS {
  GLOBAL_BEST_PRICE_GUARANTEE = 'global-best-price-guarantee',
  GLOBAL_EASY_RETURN = 'global-easy-return',
  GLOBAL_FREE_SHIPPING = 'global-free-shipping',
  GLOBAL_LIVE_CUSTOMER_SUPPORT = 'global-live-customer-support',
  GLOBAL_MONEY_BACK_GUARANTEE = 'global-money-back-guarantee',
  GLOBAL_SUPPORT_LOCAL_BUSINESS = 'global-support-to-local-business',
}

// TODO Implement final content WCS-858

/* eslint-disable sort-keys */
const STATIC_MODALS: Record<STATIC_MODAL_IDS, ModalContentProps> = {
  [STATIC_MODAL_IDS.GLOBAL_FREE_SHIPPING]: {
    content:
      'Placeholder content for global-free-shipping\n\n* Estimated delivery in 2-4 business days\n\n * Tires delivered by Fedex, UPS & Local Drivers\n\nAt SimpleTire, keeping our customers and employees safe is a top priority. As an e-commerce company we’ve taken measures to protect against the spread of COVID-19 (Coronavirus) and ensure that we’re 100% operational and so are our suppliers and distributors.\n\nThere has been no impact to our supply and we’re also delivering almost 100% of our orders in 2-4 days to our customers.',
    image: {
      src: 'https://dummyimage.com/1600x900/000/f00.jpg',
      altText: 'Free shipping',
      type: SiteImageNullableTypeEnum.SiteImage,
      width: 1600,
      height: 900,
    },
    subtitle: 'Tires shipped for free to anywhere in the U.S.',
    title: 'Free shipping',
    link: {
      label: 'More info',
      link: {
        href: '/',
        isExternal: false,
      },
    },
    showSupportSection: true,
  },
  [STATIC_MODAL_IDS.GLOBAL_BEST_PRICE_GUARANTEE]: {
    content:
      'Placeholder content for global-best-price-guarantee. Customer support is hidden!',
    title: 'Best price guarantee',
    subtitle: null,
    image: null,
    link: null,
    showSupportSection: false,
  },
  [STATIC_MODAL_IDS.GLOBAL_SUPPORT_LOCAL_BUSINESS]: {
    content: 'Placeholder content for global-support-to-local-business',
    title: 'Support to local business',
    subtitle: null,
    image: null,
    link: null,
    showSupportSection: false,
  },
  [STATIC_MODAL_IDS.GLOBAL_EASY_RETURN]: {
    content: 'Placeholder content for global-easy-return',
    title: 'Easy return',
    subtitle: null,
    image: null,
    link: null,
    showSupportSection: false,
  },
  [STATIC_MODAL_IDS.GLOBAL_MONEY_BACK_GUARANTEE]: {
    content: 'Placeholder content for global-money-back-guarantee',
    title: 'Money back guarantee',
    subtitle: null,
    image: null,
    link: null,
    showSupportSection: false,
  },
  [STATIC_MODAL_IDS.GLOBAL_LIVE_CUSTOMER_SUPPORT]: {
    content: 'Placeholder content for global-live-customer-support',
    title: 'Live customer support',
    subtitle: null,
    image: null,
    link: null,
    showSupportSection: false,
  },
};
/* eslint-enable sort-keys */

export default STATIC_MODALS;
