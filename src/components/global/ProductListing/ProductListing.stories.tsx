import { boolean, number, text } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteCatalogProductItemEnum } from '~/data/models/SiteCatalogProductItem';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';
import { PRODUCT_IMAGE_TYPES } from '~/lib/constants/productImage.types';

import ProductListing from './ProductListing';

export default {
  component: ProductListing,
  title: 'Global/Product Listing',
};

const mockPriceList = [
  {
    label: null,
    price: {
      salePriceInCents: '7699',
      estimatedRetailPriceInCents: '12000',
    },
  },
];

const mockImage = {
  altText: '300x300 image',
  src: 'https://via.placeholder.com/300',
  type: ICON_IMAGE_TYPE.IMAGE,
} as SiteImage;

const mockLogo = {
  altText: '75x16 image',
  src: 'https://via.placeholder.com/75x16',
  type: ICON_IMAGE_TYPE.IMAGE,
} as SiteImage;

const mockImages = [
  {
    image: mockImage,
    productImageType: PRODUCT_IMAGE_TYPES.SIDEWALL,
  },
];

const mockFilters = [
  '60K mile warranty',
  '2-day delivery',
  'H (130 mph)',
  '91 (1356 lbs)',
];

const ratingOptions = {
  max: 5,
  min: 0,
  range: true,
  step: 0.1,
};

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

export function ProductListingWithKnobs() {
  const isHighlighted = boolean('Highlighted product', false);
  const showFilters = boolean('Show filters', false);
  const showBrandLogo = boolean('Show brand logo', true);
  const showRatings = boolean('Show ratings', true);
  const promosToRender = number('Promos to display', 1, { max: 3, min: 0 });

  return (
    <Grid>
      <GridItem
        gridColumnS={isHighlighted ? '2 / 6' : '2 / 4'}
        gridColumnM={isHighlighted ? '2 / 8' : '2 / 4'}
        gridColumnL={isHighlighted ? '2 / 8' : '2 / 5'}
      >
        <ProductListing
          index={1}
          product={{
            activeFilterValueList: showFilters ? mockFilters : [],
            brand: {
              image: showBrandLogo ? mockLogo : undefined,
              label: 'Firestone',
            },
            curationType: 'top',
            dataMomentList: null,
            deliveryInfo: {
              value: text('Delivery info', '2-day free delivery'),
              isFeatured: false,
            },
            gridAttribute: text('Attribute', 'Original tire'),
            highlight: text('Highlight', 'best seller'),
            imageList: mockImages,
            link: { href: '/', isExternal: false },
            loadSpeedRating: text('Load/Speed rating', '91H'),
            name: text('Name', 'FT140'),
            priceList: mockPriceList,
            rating: showRatings
              ? {
                  quantity: number('Rating quantity', 113),
                  value: number('Rating', 4.3, ratingOptions),
                }
              : null,
            siteCatalogPromotionInfo: {
              count: promosToRender,
              list: mockPromotions.slice(0, promosToRender),
            },
            size: null,
            specList: [],
            type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          }}
          imageList={mockImages}
          isHighlighted={isHighlighted}
        />
      </GridItem>
    </Grid>
  );
}

export function FilteredProductListing() {
  return (
    <Grid>
      <GridItem
        gridColumnS={'2 / 4'}
        gridColumnM={'2 / 4'}
        gridColumnL={'2 / 5'}
      >
        <ProductListing
          index={1}
          product={{
            activeFilterValueList: mockFilters,
            brand: {
              image: mockLogo,
              label: 'Firestone',
            },
            curationType: 'top',
            dataMomentList: null,
            deliveryInfo: null,
            gridAttribute: null,
            highlight: null,
            imageList: mockImages,
            link: { href: '/', isExternal: false },
            loadSpeedRating: '91H',
            name: 'FT140',
            priceList: mockPriceList,
            rating: {
              quantity: 113,
              value: 4.3,
            },
            siteCatalogPromotionInfo: { count: 0, list: [] },
            size: null,
            specList: [],
            type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          }}
          imageList={mockImages}
        />
      </GridItem>
    </Grid>
  );
}

export function HighlightedProductListing() {
  return (
    <Grid>
      <GridItem
        gridColumnS={'2 / 6'}
        gridColumnM={'2 / 8'}
        gridColumnL={'2 / 8'}
      >
        <ProductListing
          index={1}
          product={{
            activeFilterValueList: mockFilters,
            brand: {
              image: mockLogo,
              label: 'Firestone',
            },
            curationType: 'top',
            dataMomentList: null,
            deliveryInfo: null,
            gridAttribute: null,
            highlight: null,
            imageList: mockImages,
            link: { href: '/', isExternal: false },
            loadSpeedRating: '91H',
            name: 'FT140',
            priceList: mockPriceList,
            rating: {
              quantity: 113,
              value: 4.3,
            },
            siteCatalogPromotionInfo: { count: 0, list: [] },
            size: null,
            specList: [],
            type: SiteCatalogProductItemEnum.SiteCatalogProductItem,
          }}
          imageList={mockImages}
          isHighlighted
        />
      </GridItem>
    </Grid>
  );
}
