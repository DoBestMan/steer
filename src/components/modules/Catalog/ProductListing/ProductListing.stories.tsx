import { boolean, number, text } from '@storybook/addon-knobs';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { PROMO_STYLES } from '~/components/global/PromoTag/PromoTag.types';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import ProductListing from './ProductListing';
import { PRODUCT_IMAGE_TYPES } from './ProductListing.types';

export default {
  component: ProductListing,
  title: 'Catalog/Grid/Product Listing',
};

const mockPriceList = [
  {
    label: null,
    price: {
      currentInCents: '7699',
      originalInCents: '12000',
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
    style: PROMO_STYLES.WHITE_PILL,
    label: 'Installation included',
    icon: { svgId: ICONS.WRENCH, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
  {
    style: PROMO_STYLES.DEFAULT,
    label: 'Spring Sale',
    icon: { svgId: ICONS.TAG, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
  },
  {
    style: PROMO_STYLES.WHITE_PILL,
    label: '$70 rebate',
    icon: { svgId: ICONS.RETURN, type: ICON_IMAGE_TYPE.ICON } as SiteIcon,
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
          activeFilterPropertyList={showFilters ? mockFilters : []}
          attribute={text('Attribute', 'Original tire')}
          brand={{
            image: showBrandLogo ? mockLogo : undefined,
            label: 'Firestone',
          }}
          defaultImage={PRODUCT_IMAGE_TYPES.SIDEWALL}
          highlight={text('Highlight', 'best seller')}
          link={{ href: '/', isExternal: false }}
          loadSpeedRating={text('Load/Speed rating', '91H')}
          name={text('Name', 'FT140')}
          priceList={mockPriceList}
          promotionList={{
            count: promosToRender,
            list: mockPromotions.slice(0, promosToRender),
          }}
          images={mockImages}
          isHighlighted={isHighlighted}
          rating={
            showRatings
              ? {
                  quantity: number('Rating quantity', 113),
                  value: number('Rating', 4.3, ratingOptions),
                }
              : null
          }
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
          activeFilterPropertyList={mockFilters}
          brand={{
            image: mockLogo,
            label: 'Firestone',
          }}
          defaultImage={PRODUCT_IMAGE_TYPES.SIDEWALL}
          link={{ href: '/', isExternal: false }}
          loadSpeedRating="91H"
          name="FT140"
          promotionList={{ count: 0, list: [] }}
          priceList={mockPriceList}
          images={mockImages}
          rating={{
            quantity: 113,
            value: 4.3,
          }}
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
          brand={{
            image: mockLogo,
            label: 'Firestone',
          }}
          defaultImage={PRODUCT_IMAGE_TYPES.SIDEWALL}
          link={{ href: '/', isExternal: false }}
          loadSpeedRating="91H"
          name="FT140"
          promotionList={{ count: 0, list: [] }}
          priceList={mockPriceList}
          images={mockImages}
          isHighlighted
          rating={{
            quantity: 113,
            value: 4.3,
          }}
        />
      </GridItem>
    </Grid>
  );
}
