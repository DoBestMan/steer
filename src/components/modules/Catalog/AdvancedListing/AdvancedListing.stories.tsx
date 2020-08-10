import { boolean, number, text } from '@storybook/addon-knobs';

import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteCatalogProductItemEnum } from '~/data/models/SiteCatalogProductItem';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

import AdvancedListing from './AdvancedListing';

export default {
  component: AdvancedListing,
  title: 'Catalog/Grid/Advanced Listing',
};

const mockImage = {
  altText: '300x265 image',
  src: 'https://via.placeholder.com/300x265',
  type: ICON_IMAGE_TYPE.IMAGE,
} as SiteImage;

const mockImages = [
  {
    image: mockImage,
    productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
  },
];

const mockLogo = {
  altText: '135x20 image',
  src: 'https://via.placeholder.com/135x20',
  type: ICON_IMAGE_TYPE.IMAGE,
} as SiteImage;

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
    style: SitePromotionStyleEnum.SitePromotionItemDefault,
    label: 'Spring Sale',
    icon: { svgId: ICONS.TAG_SMALL, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
  {
    style: SitePromotionStyleEnum.SitePromotionItemWhitePill,
    label: 'Installation included',
    icon: { svgId: ICONS.WRENCH, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
  {
    style: SitePromotionStyleEnum.SitePromotionItemWhitePill,
    label: '$70 rebate',
    icon: { svgId: ICONS.REBATE_SMALL, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
];

const ratingOptions = {
  max: 5,
  min: 0,
  range: true,
  step: 0.1,
};

const mockRatingList = [
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

const mockSpecList = [
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

export function AdvancedListingWithKnobs() {
  const showRatings = boolean('Show ratings', true);
  const showBrandLogo = boolean('Show brand logo', true);
  const promosToRender = number('Promos to display', 1, { max: 3, min: 0 });

  return (
    <div style={{ paddingTop: '30px' }}>
      <AdvancedListing
        brand={{
          image: showBrandLogo ? mockLogo : undefined,
          label: 'Firestone',
        }}
        deliveryInfo={{
          value: text('Delivery info', '2-day free delivery'),
          isFeatured: false,
        }}
        dataMomentList={[
          {
            icon: {
              svgId: ICONS.FIRE,
              type: ICON_IMAGE_TYPE.ICON,
            },
            label: 'Certified lowest price',
          },
          {
            icon: {
              svgId: ICONS.STAR,
              type: ICON_IMAGE_TYPE.ICON,
            },
            label: '#1 choice of Civic drivers',
          },
        ]}
        defaultImage={PRODUCT_IMAGE_TYPES.TREADFULL}
        highlight={text('Highlight', 'Best Seller')}
        name={text('Name', 'FT140')}
        performanceRatingList={mockRatingList}
        priceList={mockPriceList}
        siteCatalogPromotionInfo={{
          count: promosToRender,
          list: mockPromotions.slice(0, promosToRender),
        }}
        imageList={mockImages}
        link={{ href: '/', isExternal: false }}
        rating={
          showRatings
            ? {
                quantity: number('Rating quantity', 113),
                value: number('Rating', 4.3, ratingOptions),
              }
            : null
        }
        size={text('Size', '215/50 R17')}
        specList={mockSpecList}
        type={SiteCatalogProductItemEnum.SiteCatalogProductItem}
      />
    </div>
  );
}
