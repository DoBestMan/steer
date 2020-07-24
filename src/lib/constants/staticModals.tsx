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
  ROAD_HAZARD_COVERAGE = 'road-hazard-coverage',
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
        'Placeholder content for global-free-shipping\n\n* Estimated delivery in 2-4 business days\n* Tires delivered by Fedex, UPS & Local Drivers\n\nAt SimpleTire, keeping our customers and employees safe is a top priority. As an e-commerce company we’ve taken measures to protect against the spread of COVID-19 (Coronavirus) and ensure that we’re 100% operational and so are our suppliers and distributors.\n\nThere has been no impact to our supply and we’re also delivering almost 100% of our orders in 2-4 days to our customers.',
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
      content:
        'If the price of your tires drops within 30 days of you buying them, we’ll refund the difference up to $100! Just use the **Norton Shopping Guarantee**, fill out the requested data, and wait for your refund!\n* Free with every purchase\n* Automatic protection for 30 days from your order date\n\nWe’ve done our best to protect you from spending more than you should have to on your tires. Tires are a big purchase and we know it so we’re proud to offer the Low Price Guarantee to all of our customers, absolutely free of any additional charge!',
      title: 'Low Price Guarantee',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: false,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_SUPPORT_LOCAL_BUSINESS]: {
    props: {
      content:
        'Your neighbors are our partners; From the tire distributor to the installer, we work with businesses in your area to promote local economies while making your shopping experience simple.\n* We show you tires in your area so we can ship them to you quickly while bringing your business to local distributors\n* We’ll find local service centers near you and you schedule your installation, all during the checkout process\n\nWe started out as a local business and haven’t forgotten where we came from. With our national network of distributors, wholesalers, and retailers we raise up together by getting you exactly what you need quickly.',
      title: 'Support Local Businesses',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: false,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_EASY_RETURN]: {
    props: {
      content:
        'We know that sometimes things don’t go as planned so we’ll accept returns of unmounted tires for up to 30 days.\n* 30 day returns on unmounted, unused tires\n* Return labels sent to your email\n\nWe accept returns of unmounted, unused tires no matter what size or type they are. If  circumstances have changed and you don’t need the tires or you no longer want them, then we give you 30 days to send them back to us for a full refund minus $15 for return shipping. Return shipping is free if you need to place another order or if we shipped the wrong tire.',
      title: 'Easy Returns',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: false,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_MONEY_BACK_GUARANTEE]: {
    props: {
      content:
        'If you’re not happy with your order, we’ll take the tires back and refund you in full without any hidden fees.\n* Returns accepted for any reason\n* Real refunds, no hidden fees\n\nIf you ordered the wrong tires or they aren’t quite what you expected, we’ll take them back. As long as they haven’t been mounted you’ll get a refund, no restocking fees. Refunds will be in full minus $15 for the cost of shipping.',
      title: 'Money Back Guarantee',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: false,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_LIVE_CUSTOMER_SUPPORT]: {
    props: {
      content:
        'We’re here to answer any questions you may have and keep your tire buying experience simple.\n* Real people, real answers, in real time\n* Support available by phone or email\n\nCheck our FAQ section for answers to our most common questions. If you can’t find an answer to your question then fill out the contact form below and we’ll answer you as soon as possible.',
      title: 'Live Customer Support',
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
  [STATIC_MODAL_IDS.ROAD_HAZARD_COVERAGE]: {
    props: {
      content: ui('roadHazard.content'),
      title: ui('roadHazard.title'),
      subtitle: ui('roadHazard.subtitle'),
      image: {
        src: '/static/assets/road-hazard/modal-image.jpg',
        altText: ui('roadHazard.imageAlt'),
        type: SiteImageNullableTypeEnum.SiteImage,
        width: 768,
        height: 436,
      },
      link: {
        label: ui('roadHazard.linkLabel'),
        link: {
          href: '/road_hazard',
          isExternal: true,
        },
      },
      showSupportSection: false,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
};
/* eslint-enable sort-keys */

export default STATIC_MODALS;
