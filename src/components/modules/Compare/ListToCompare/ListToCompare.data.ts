import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

export const CAROUSEL_CLASS_NAMES = {
  NEXT_BUTTON: 'swiper-button-next',
  PAGINATION_CONTAINER: 'carousel-pagination',
  PREV_BUTTON: 'swiper-button-prev',
  SWIPER_CONTAINER: 'swiper-container',
  WRAPPER_CONTAINER: 'product-card-carousel',
};

export const CAROUSEL_PARAM_BREAKPOINT = {
  S: 320,
  M: 768,
  L: 1024,
  XL: 1200,
};

const mockProduct = {
  activeFilterValueList: null,
  brand: {
    label: 'Firestone',
  },
  dataMomentList: null,
  deliveryInfo: null,
  gridAttribute: null,
  highlight: null,
  imageList: [
    {
      image: {
        altText: '300x300 image',
        src: 'https://via.placeholder.com/300',
        type: ICON_IMAGE_TYPE.IMAGE,
      } as SiteImage,
      productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
    },
  ],
  link: { href: '/', isExternal: false },
  loadSpeedRating: '91H',
  name: 'Turanza1',
  performanceRatingList: [
    {
      label: 'Dry',
      value: 5,
    },
  ],
  priceList: [
    {
      label: null,
      price: {
        salePriceInCents: '7699',
        estimatedRetailPriceInCents: '12000',
      },
    },
  ],
  rating: {
    quantity: 113,
    value: 4.3,
  },
  siteCatalogPromotionInfo: null,
  size: '215/50 R17',
  specList: [{ label: 'Type', value: 'All Season', concise: 'All Season' }],
  topPicksAttribute: null,
} as SiteCatalogProductItem;

export const mockProductList = [
  {
    activeFilterValueList: null,
    brand: {
      label: 'Firestone',
    },
    dataMomentList: null,
    deliveryInfo: null,
    gridAttribute: null,
    highlight: null,
    imageList: [
      {
        image: {
          altText: '300x300 image',
          src: 'https://via.placeholder.com/300',
          type: ICON_IMAGE_TYPE.IMAGE,
        } as SiteImage,
        productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
      },
    ],
    link: { href: '/', isExternal: false },
    loadSpeedRating: '91H',
    name: 'Turanza1',
    performanceRatingList: [
      {
        label: 'Dry',
        value: 5,
      },
    ],
    priceList: [
      {
        label: null,
        price: {
          salePriceInCents: '7699',
          estimatedRetailPriceInCents: '12000',
        },
      },
    ],
    rating: {
      quantity: 113,
      value: 4.3,
    },
    siteCatalogPromotionInfo: null,
    size: '215/50 R17',
    specList: [{ label: 'Type', value: 'All Season', concise: 'All Season' }],
    topPicksAttribute: null,
  } as SiteCatalogProductItem,
  {
    activeFilterValueList: null,
    brand: {
      label: 'Firestone',
    },
    dataMomentList: null,
    deliveryInfo: null,
    gridAttribute: null,
    highlight: null,
    imageList: [
      {
        image: {
          altText: '300x300 image',
          src: 'https://via.placeholder.com/300',
          type: ICON_IMAGE_TYPE.IMAGE,
        } as SiteImage,
        productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
      },
    ],
    link: { href: '/', isExternal: false },
    loadSpeedRating: '91H',
    name: 'Turanza2',
    performanceRatingList: [
      {
        label: 'Dry',
        value: 5,
      },
    ],
    priceList: [
      {
        label: null,
        price: {
          salePriceInCents: '7699',
          estimatedRetailPriceInCents: '12000',
        },
      },
    ],
    rating: {
      quantity: 113,
      value: 4.3,
    },
    siteCatalogPromotionInfo: null,
    size: '215/50 R17',
    specList: [{ label: 'Type', value: 'All Season', concise: 'All Season' }],
    topPicksAttribute: null,
  } as SiteCatalogProductItem,
  {
    activeFilterValueList: null,
    brand: {
      label: 'Firestone',
    },
    dataMomentList: null,
    deliveryInfo: null,
    gridAttribute: null,
    highlight: null,
    imageList: [
      {
        image: {
          altText: '300x300 image',
          src: 'https://via.placeholder.com/300',
          type: ICON_IMAGE_TYPE.IMAGE,
        } as SiteImage,
        productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
      },
    ],
    link: { href: '/', isExternal: false },
    loadSpeedRating: '91H',
    name: 'Turanza3',
    performanceRatingList: [
      {
        label: 'Dry',
        value: 5,
      },
    ],
    priceList: [
      {
        label: null,
        price: {
          salePriceInCents: '7699',
          estimatedRetailPriceInCents: '12000',
        },
      },
    ],
    rating: {
      quantity: 113,
      value: 4.3,
    },
    siteCatalogPromotionInfo: null,
    size: '215/50 R17',
    specList: [{ label: 'Type', value: 'All Season', concise: 'All Season' }],
    topPicksAttribute: null,
  } as SiteCatalogProductItem,
  {
    activeFilterValueList: null,
    brand: {
      label: 'Firestone',
    },
    dataMomentList: null,
    deliveryInfo: null,
    gridAttribute: null,
    highlight: null,
    imageList: [
      {
        image: {
          altText: '300x300 image',
          src: 'https://via.placeholder.com/300',
          type: ICON_IMAGE_TYPE.IMAGE,
        } as SiteImage,
        productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
      },
    ],
    link: { href: '/', isExternal: false },
    loadSpeedRating: '91H',
    name: 'Turanza4',
    performanceRatingList: [
      {
        label: 'Dry',
        value: 5,
      },
    ],
    priceList: [
      {
        label: null,
        price: {
          salePriceInCents: '7699',
          estimatedRetailPriceInCents: '12000',
        },
      },
    ],
    rating: {
      quantity: 113,
      value: 4.3,
    },
    siteCatalogPromotionInfo: null,
    size: '215/50 R17',
    specList: [{ label: 'Type', value: 'All Season', concise: 'All Season' }],
    topPicksAttribute: null,
  } as SiteCatalogProductItem,
];

export default mockProduct;
