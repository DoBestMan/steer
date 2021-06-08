/* eslint-disable sort-keys */

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteCatalogProductItemEnum } from '~/data/models/SiteCatalogProductItem';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

const mockLogo = {
  altText: '75x16 image',
  src: 'https://via.placeholder.com/75x16',
  type: ICON_IMAGE_TYPE.IMAGE,
} as SiteImage;

const mockImage = {
  altText: '300x300 image',
  src: 'https://via.placeholder.com/300',
  type: ICON_IMAGE_TYPE.IMAGE,
} as SiteImage;

const mockImages = [
  {
    image: mockImage,
    productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
  },
];

const mockPriceList = [
  {
    label: null,
    price: {
      salePriceInCents: '7699',
      estimatedRetailPriceInCents: '12000',
    },
  },
];

const mockPromotions = [
  {
    style: SitePromotionStyleEnum.SitePromotionItemWhitePill,
    label: 'Installation included',
    icon: { svgId: ICONS.WRENCH, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
  {
    style: SitePromotionStyleEnum.SitePromotionItemDefault,
    label: 'Spring Sale',
    icon: { svgId: ICONS.TAG_SMALL, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
  {
    style: SitePromotionStyleEnum.SitePromotionItemWhitePill,
    label: '$70 rebate',
    icon: { svgId: ICONS.REBATE_SMALL, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
];

export const mockProduct = {
  topPicksAttribute: '',
  activeFilterValueList: [],
  brand: {
    image: mockLogo,
    label: 'Firestone',
  },
  curationType: 'top',
  dataMomentList: null,
  deliveryInfo: {
    value: '2-day free delivery',
    isFeatured: false,
  },
  gridAttribute: 'Original tire',
  highlight: 'best seller',
  imageList: mockImages,
  link: {
    href:
      '/brands/hankook-tires/kinergy-gt-h436#v=1&tireSize=215-55r16&mpn=1015886&pageSource=vehicleCatalog&itemId=121247&curationSeq=1&curationPos=2&curationSource=top-pick-oem',
    isExternal: false,
  },
  loadSpeedRating: '91H',
  name: 'FT140',
  priceList: mockPriceList,
  rating: {
    value: 4.8,
    quantity: 5,
  },
  siteCatalogPromotionInfo: {
    count: 1,
    list: mockPromotions.slice(0, 1),
  },
  size: '215/50 R17',
  performanceRatingList: [
    {
      label: 'Dry',
      value: 5.0,
    },
    {
      label: 'Wet',
      value: 5.0,
    },
    {
      label: 'Snow',
      value: 3.0,
    },
    {
      label: 'Comfort',
      value: 3.7,
    },
    {
      label: 'Noise',
      value: 5.0,
    },
    {
      label: 'Treadwear',
      value: 4.5,
    },
  ],
  specList: [
    {
      label: 'Category',
      value: 'All Season',
      concise: 'All Season',
      description: 'description1',
    },
    {
      label: 'Warranty (Miles)',
      value: '60k mi',
      concise: '60k mi warranty',
      description: 'description2',
    },
    {
      label: 'Speed',
      value: 'T',
      concise: 'Speed rating: T',
      description: 'description3',
    },
    {
      label: 'Load',
      value: 'XL (PLY 4)',
      concise: 'Load: XL (PLY 4)',
      description: 'description4',
    },
    {
      label: 'UTQG',
      value: '700 AB',
      concise: '700 AB UTQG',
      description: 'description5',
    },
    {
      label: 'Sidewall',
      value: 'Blackwall',
      concise: 'Blackwall',
      description: 'description',
    },
  ],

  type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
};
