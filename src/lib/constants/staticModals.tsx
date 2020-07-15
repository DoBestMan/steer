import { ModalData } from '~/components/global/Modal/Modal.types';
import { SiteImageNullableTypeEnum } from '~/data/models/SiteImageNullable';

import { ui } from '../utils/ui-dictionary';
import { uiJSX } from '../utils/ui-dictionary-jsx';
import { MODAL_DATA_TYPES } from './modal.types';

// Static modals associated with IDs that can be references from the API

export enum STATIC_MODAL_IDS {
  CATALOG_FILTER_BRAND = 'catalog-filter-brand',
  CATALOG_FILTER_LOAD_INDEX = 'catalog-filter-load-index',
  CATALOG_FILTER_LOAD_RANGE = 'catalog-filter-load-range',
  CATALOG_FILTER_MILEAGE_WARRANTY = 'catalog-filter-mileage-warranty',
  CATALOG_FILTER_PRICE_RANGE = 'catalog-filter-price-range',
  CATALOG_FILTER_SPEED_RATING = 'catalog-filter-speed-rating',
  CATALOG_FILTER_TIRE_TYPE_CATEGORY = 'catalog-filter-tire-type-category',
  CATALOG_FILTER_TIRE_TYPE_GLOBAL = 'catalog-filter-tire-type-global',
  GLOBAL_BEST_PRICE_GUARANTEE = 'global-best-price-guarantee',
  GLOBAL_EASY_RETURN = 'global-easy-return',
  GLOBAL_FREE_SHIPPING = 'global-free-shipping',
  GLOBAL_LIVE_CUSTOMER_SUPPORT = 'global-live-customer-support',
  GLOBAL_MONEY_BACK_GUARANTEE = 'global-money-back-guarantee',
  GLOBAL_SUPPORT_LOCAL_BUSINESS = 'global-support-to-local-business',
  HOW_TO_FIND_VEHICLE_TRIM = 'how-to-find-vehicle-trim',
  // TODO update mock data with consistent naming
  HOW_TO_FIND_YOUR_SIZE = 'findYourTireSize',
}

// TODO Implement final content WCS-858

/* eslint-disable sort-keys */
const STATIC_MODALS: Record<string, ModalData> = {
  [STATIC_MODAL_IDS.CATALOG_FILTER_BRAND]: {
    props: {
      content: 'Placeholder content for CATALOG_FILTER_BRAND',
      title: 'About this filter',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.CATALOG_FILTER_LOAD_INDEX]: {
    props: {
      content: 'Placeholder content for CATALOG_FILTER_LOAD_INDEX',
      title: 'About this filter',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.CATALOG_FILTER_LOAD_RANGE]: {
    props: {
      content: 'Placeholder content for CATALOG_FILTER_LOAD_RANGE',
      title: 'About this filter',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.CATALOG_FILTER_MILEAGE_WARRANTY]: {
    props: {
      content: 'Placeholder content for CATALOG_FILTER_MILEAGE_WARRANTY',
      title: 'About this filter',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.CATALOG_FILTER_PRICE_RANGE]: {
    props: {
      content: 'Placeholder content for CATALOG_FILTER_PRICE_RANGE',
      title: 'About this filter',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.CATALOG_FILTER_SPEED_RATING]: {
    props: {
      content: 'Placeholder content for CATALOG_FILTER_SPEED_RATING',
      title: 'About this filter',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.CATALOG_FILTER_TIRE_TYPE_CATEGORY]: {
    props: {
      content: 'Placeholder content for CATALOG_FILTER_TIRE_TYPE_CATEGORY',
      title: 'About this filter',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.CATALOG_FILTER_TIRE_TYPE_GLOBAL]: {
    props: {
      content: 'Placeholder content for CATALOG_FILTER_TIRE_TYPE_GLOBAL',
      title: 'About this filter',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_FREE_SHIPPING]: {
    props: {
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
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_BEST_PRICE_GUARANTEE]: {
    props: {
      content: 'Placeholder content for global-best-price-guarantee.',
      title: 'Best price guarantee',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: false,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_SUPPORT_LOCAL_BUSINESS]: {
    props: {
      content: 'Placeholder content for global-support-to-local-business',
      title: 'Support to local business',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: false,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_EASY_RETURN]: {
    props: {
      content: 'Placeholder content for global-easy-return',
      title: 'Easy return',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: false,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_MONEY_BACK_GUARANTEE]: {
    props: {
      content: 'Placeholder content for global-money-back-guarantee',
      title: 'Money back guarantee',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: false,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_LIVE_CUSTOMER_SUPPORT]: {
    props: {
      content: 'Placeholder content for global-live-customer-support',
      title: 'Live customer support',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: false,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.HOW_TO_FIND_YOUR_SIZE]: {
    props: {
      alternateSearch: {
        title: ui('search.findTireSize.alternateSearchTitle'),
        copy: ui('search.findTireSize.alternateSearchCopy'),
      },
      eyebrow: ui('search.findTireSize.eyebrow'),
      imageAlt: ui('search.findTireSize.imageAlt'),
      imageSrc: '/static/assets/search/find-tire-size.jpg',
      modalLabel: ui('search.findTireSize.modalLabel'),
      steps: [
        uiJSX('search.findTireSize.stepOne', {
          link: (
            <a href="#" key="step-1">
              the sidewall
            </a>
          ),
        }),
        uiJSX('search.findTireSize.stepTwo', {
          link: (
            <a href="#" key="step-2">
              inside the frame
            </a>
          ),
        }),
        uiJSX('search.findTireSize.stepThree', {
          link: (
            <a href="#" key="step-3">
              the owner&apos;s manual
            </a>
          ),
        }),
      ],
      title: ui('search.findTireSize.title'),
    },
    type: MODAL_DATA_TYPES.HOW_TO,
  },
  [STATIC_MODAL_IDS.HOW_TO_FIND_VEHICLE_TRIM]: {
    props: {
      alternateSearch: {
        title: ui('search.identifyTrim.alternateSearchTitle'),
        copy: ui('search.identifyTrim.alternateSearchCopy'),
      },
      eyebrow: ui('search.identifyTrim.eyebrow'),
      imageAlt: ui('search.identifyTrim.imageAlt'),
      imageSrc: '/static/assets/search/vehicle-trim.jpg',
      modalLabel: ui('search.identifyTrim.modalLabel'),
      steps: [
        ui('search.identifyTrim.stepOne'),
        ui('search.identifyTrim.stepTwo'),
        ui('search.identifyTrim.stepThree'),
      ],
      title: ui('search.identifyTrim.title'),
    },
    type: MODAL_DATA_TYPES.HOW_TO,
  },
};
/* eslint-enable sort-keys */

export default STATIC_MODALS;
