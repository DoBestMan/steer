import { ICONS } from '~/components/global/Icon/Icon.constants';
import { PROMO_STYLES } from '~/components/global/PromoTag/PromoTag.types';
import { SiteCatalogProductGroupList } from '~/data/models/SiteCatalogProductGroupList';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

const performanceRatingList = [
  {
    label: 'Dry',
    value: 5,
  },
  {
    label: 'Wet',
    value: 4.9,
  },
  {
    label: 'Snow',
    value: 3,
  },
  {
    label: 'Comfort',
    value: 3.7,
  },
  {
    label: 'Noise',
    value: 4.5,
  },
  {
    label: 'Treadwear',
    value: 4.5,
  },
];

const specList = [
  { label: 'Type', value: 'All Season', concise: 'All Season' },
  {
    label: 'Warranty',
    value: '60k mi',
    concise: '60k mi warranty',
  },
  { label: 'Speed', value: 'T', concise: 'Speed rating: T' },
  {
    label: 'Load',
    value: 'XL (PLY 4)',
    concise: 'Load: XL (PLY 4)',
  },
  { label: 'UTQG', value: '700 AB', concise: '700 AB UTQG' },
  { label: 'Sidewall', value: 'Blackwall', concise: 'Blackwall' },
];

const siteCatalogPromotionInfo = [
  {
    style: PROMO_STYLES.DEFAULT,
    label: 'Spring Sale',
    icon: { svgId: ICONS.TAG, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
  {
    style: PROMO_STYLES.WHITE_PILL,
    label: 'Installation included',
    icon: { svgId: ICONS.WRENCH, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
  {
    style: PROMO_STYLES.WHITE_PILL,
    label: '$70 rebate',
    icon: { svgId: ICONS.RETURN, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
];

const dataMomentList = [
  {
    icon: {
      svgId: ICONS.FIRE,
      type: ICON_IMAGE_TYPE.ICON,
    } as SiteIcon,
    label: 'Certified lowest price',
  },
  {
    icon: {
      svgId: ICONS.STAR,
      type: ICON_IMAGE_TYPE.ICON,
    } as SiteIcon,
    label: '#1 choice of Civic drivers',
  },
];

const product: SiteCatalogProductItem = {
  activeFilterValueList: null,
  brand: {
    label: 'Firestone',
  },
  dataMomentList,
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
  name: 'Turanza',
  performanceRatingList,
  priceList: [
    {
      label: null,
      price: {
        currentInCents: '7699',
        originalInCents: '12000',
      },
    },
  ],
  rating: {
    quantity: 113,
    value: 4.3,
  },
  siteCatalogPromotionInfo: {
    count: 3,
    list: siteCatalogPromotionInfo,
  },
  size: '215/50 R17',
  specList,
  topPicksAttribute: null,
};

export const products: SiteCatalogProductItem[] = [
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
  product,
];

export const productGroupList: SiteCatalogProductGroupList = [
  {
    description: 'Save up to 30% off with discounts and rebates.',
    icon: null,
    id: 'curatedGroup1',
    name: 'Special deals',
    productList: products,
    siteQueryParams: { group: 'curatedGroup1' },
  },
  {
    description:
      'Save up 10% in fuel with low rolling resistance that require less energy.',
    icon: null,
    id: 'curatedGroup2',
    name: 'Fuel Efficient Tires',
    productList: products,
    siteQueryParams: null,
  },
  {
    description: '20,438 ratings powered by Google Reviews.',
    icon: null,
    id: 'curatedGroup3',
    name: 'Best rated under $100',
    productList: products,
    siteQueryParams: null,
  },
];
