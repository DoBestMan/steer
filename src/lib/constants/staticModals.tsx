import { ModalData } from '~/components/global/Modal/Modal.types';
import { SiteImageNullableTypeEnum } from '~/data/models/SiteImageNullable';

import { ui } from '../utils/ui-dictionary';
import { MODAL_DATA_TYPES } from './modal.types';

// Static modals associated with IDs that can be references from the API

export enum STATIC_MODAL_IDS {
  CATALOG_FILTER_LOAD_INDEX = 'catalog-filter-load-index',
  CATALOG_FILTER_LOAD_RANGE = 'catalog-filter-load-range',
  CATALOG_FILTER_MILEAGE_WARRANTY = 'catalog-filter-mileage-warranty',
  CATALOG_FILTER_SPEED_RATING = 'catalog-filter-speed-rating',
  CATALOG_FILTER_TIRE_TYPE_CATEGORY = 'catalog-filter-tire-type-category',
  CATALOG_FILTER_TIRE_TYPE_VEHICLE = 'catalog-filter-tire-type-vehicle',
  GLOBAL_EASY_RETURN = 'global-easy-return',
  GLOBAL_FREE_SHIPPING = 'global-free-shipping',
  GLOBAL_LIVE_CUSTOMER_SUPPORT = 'global-live-customer-support',
  GLOBAL_SUPPORT_LOCAL_BUSINESS = 'global-support-to-local-business',
  HOW_TO_FIND_VEHICLE_TRIM = 'how-to-find-vehicle-trim',
  // TODO update mock data with consistent naming
  HOW_TO_FIND_YOUR_SIZE = 'findYourTireSize',
  ROAD_HAZARD_COVERAGE = 'road-hazard-coverage',
}

// TODO Implement final content WCS-858

/* eslint-disable sort-keys */
const STATIC_MODALS: Record<string, ModalData> = {
  [STATIC_MODAL_IDS.CATALOG_FILTER_LOAD_INDEX]: {
    props: {
      content:
        'A numerical value assigned to a tire that designates its load carrying capacity.',
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
      content:
        'A letter value that determines the construction and ply rating of a tire. SL, XL, and LL are typical for a Passenger Tire, whereas Light Truck ranges from B (4 ply) - G (14 ply).',
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
      content:
        'The manufacturers warranty based on the number of miles that can be driven (with proper tire maintenance) before needing to replace tires again.',
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
      content:
        'A letter value that determines the top speed a tire can safely drive on.',
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
      content:
        'Select the type of tire that best fits your driving and weather needs.',
      title: 'Category type',
      subtitle: null,
      image: null,
      link: null,
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.CATALOG_FILTER_TIRE_TYPE_VEHICLE]: {
    props: {
      content:
        'Select the type of vehicle application for your tire needs. Example: if you drive a Ford F-150 choose Light Truck.',
      title: 'Vehicle type',
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
        '* Estimated delivery of 2-4 days\n* Tires delivered by Fedex, UPS & Local Drivers\n\nEvery tire qualifies for free shipping with no minimum purchase required! Have tires delivered to any home, business, or local installation center within 2-4 business days of placing your order.\n\n*Free shipping available in the contiguous United States only.\n\nAt SimpleTire, keeping our customers and employees safe is a top priority. As an e-commerce company we’ve taken measures to protect against the spread of COVID-19 (Coronavirus) and ensure that we’re 100% operational and so are our suppliers and distributors.\n\nThere has been no impact to our supply and we’re also delivering almost 100% of our orders in 2-4 days to our customers.',
      image: {
        src:
          'https://images.simpletire.com/image/upload/w_1600,f_auto,q_auto:best/v1595012619/steer/seo/free-shipping.jpg',
        altText: 'Free shipping',
        type: SiteImageNullableTypeEnum.SiteImage,
        width: 1600,
        height: 900,
      },
      subtitle: 'Tires shipped for free to anywhere in the U.S.',
      title: 'Free shipping',
      link: null,
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.GLOBAL_SUPPORT_LOCAL_BUSINESS]: {
    props: {
      content:
        'We started out as a local business and haven’t forgotten where we came from. With our national network of distributors, wholesalers, and retailers we rise up together by getting you exactly what you need quickly.',
      title: 'Support local businesses',
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
        'We accept returns of unmounted, unused tires no matter what size or type they are. If circumstances have changed and you don’t need the tires, then we give you 30 days to send them back to us for a full refund minus $15 for return shipping per tire. Return shipping is free if you need to place another order or in the unlikely event that we shipped the wrong tire.',
      title: 'Easy returns',
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
        'Need real answers from real people? We’re here to answer any questions you may have and keep your tire buying experience simple. Let us help you get your questions answered.',
      title: 'Live customer support',
      subtitle: null,
      image: null,
      link: {
        label: 'Visit our Contact us page',
        link: {
          href: '/contact',
          isExternal: false,
        },
      },
      showSupportSection: true,
    },
    type: MODAL_DATA_TYPES.CONTENT,
  },
  [STATIC_MODAL_IDS.HOW_TO_FIND_YOUR_SIZE]: {
    props: {
      eyebrow: ui('search.findTireSize.eyebrow'),
      imageAlt: ui('search.findTireSize.imageAlt'),
      imageSrc: '/static/assets/search/find-tire-size.jpg',
      modalLabel: ui('search.findTireSize.modalLabel'),
      steps: [
        ui('search.findTireSize.stepOne'),
        ui('search.findTireSize.stepTwo'),
        ui('search.findTireSize.stepThree'),
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
          href: '/road-hazard-warranty',
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
