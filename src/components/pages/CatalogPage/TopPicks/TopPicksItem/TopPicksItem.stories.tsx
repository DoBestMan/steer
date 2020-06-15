import { boolean, number, text } from '@storybook/addon-knobs';

import { SiteCatalogSummaryTopPickItemAdditionalInfo } from '~/data/models/SiteCatalogSummaryTopPickItemAdditionalInfo';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';
import { SiteImage } from '~/data/models/SiteImage';
import { SitePrice } from '~/data/models/SitePrice';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import TopPicksItem from './TopPicksItem';

export default {
  component: TopPicksItem,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  title: 'Catalog/Top Picks/Top Picks Item',
};

export function TopPicksItemWithKnobs() {
  const data = {
    /* eslint-disable sort-keys */
    index: number('index (Sticker)', 0),
    isCurrent: boolean('Is current', true),
    addVehicleInfo: boolean('Show "Add vechile Info"', false),

    header: {
      additionalInfoLabel: text(
        'Additional info label (original tire button)',
        'original tire',
      ),
      titleLine1: text('Title Top', "Civic's 1st pick"),
      titleLine2: text('Title Bottom', 'Keep original tire'),
      subtitle: text(
        'description',
        'That came with your Honda from the factory',
      ),
    },

    asset: {
      altText: '',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 800,
    } as SiteImage,

    brand: {
      image: {
        altText: '115x25 image',
        height: 25,
        src: 'https://via.placeholder.com/115x25',
        type: ICON_IMAGE_TYPE.IMAGE,
        width: 115,
      } as SiteImage,
      label: 'Continental',
    },

    priceList: [
      {
        label: null,
        price: {
          currentInCents: text('Current price, in cents', '13296'),
          originalInCents: text('Original price, in cents', '15900'),
        } as SitePrice,
      },
    ],

    deliveryInfo: {
      value: text('Delivery info', '2-day free delivery'),
      isFeatured: true, // determines whether is shows up in the grid, or just top picks
    },

    location: text('Location', 'Brooklyn, NY'),

    productName: text('Product Name', 'ProContact'),
    productFeature: text('Product Feature', '65k mile warranty'),

    rating: {
      quantity: 115,
      value: 4.3,
    },

    ctaLabel: 'Select Original',
    url:
      '/brands/achilles-tires/achilles-atr-sport-2?v=1&width=215&ratio=45r&diameter=17&mpn=1463000',

    oeModal: {
      title: 'Original tire',
      content:
        'Originally, your Civic came with tires that are no longer being made.\n\nBut don’t worry, we review the original tire specs when selecting your top picks in order to provide the best match in terms of performance, durability and price.',
      table: {
        title: 'Original tire specs',
        items: [
          { label: 'Warranty', value: '60000 miles' },
          { label: 'Max speed', value: '168 mph' },
          { label: 'Max load', value: '1389 lbs' },
          { label: 'Features', value: 'Runflat, studded, smartway' },
          { label: 'UTQG', value: '500AA' },
          { label: 'Type', value: 'Passenger' },
        ],
      },
    } as SiteCatalogSummaryTopPickItemAdditionalInfo,

    /* eslint-enable sort-keys */
  };

  return <TopPicksItem {...data} />;
}

export function TopPicksItemWithFrontAndRearAndPill() {
  const data = {
    /* eslint-disable sort-keys */
    index: 0,
    isCurrent: true,

    header: {
      titleLine1: "Civic's 1st pick",
      titleLine2: 'Keep original tire',
      pill: '20% off',
    },

    asset: {
      altText: '',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 800,
    } as SiteImage,

    brand: {
      image: {
        altText: '115x25 image',
        height: 25,
        src: 'https://via.placeholder.com/115x25',
        type: ICON_IMAGE_TYPE.IMAGE,
        width: 115,
      } as SiteImage,
      label: 'Continental',
    },

    priceList: [
      {
        label: 'Front',
        price: {
          currentInCents: text('Current price, in cents', '13296'),
          originalInCents: text('Original price, in cents', '15900'),
        } as SitePrice,
      },
      {
        label: 'Back',
        price: {
          currentInCents: text('Current price, in cents', '17659'),
          originalInCents: text('Original price, in cents', '12399'),
        } as SitePrice,
      },
    ],

    deliveryInfo: {
      value: '2-day free delivery',
      isFeatured: true, // determines whether is shows up in the grid, or just top picks
    },
    location: 'Brooklyn, NY',

    productName: 'ProContact',
    productFeature: '65k mile warranty',

    rating: {
      quantity: 115,
      value: 4.3,
    },

    ctaLabel: 'Select Original',
    url:
      '/brands/achilles-tires/achilles-atr-sport-2?v=1&width=215&ratio=45r&diameter=17&mpn=1463000',

    /* eslint-enable sort-keys */
  };

  return <TopPicksItem {...data} />;
}

export function TopPicksItemWithNoPriceAndNoBrandImage() {
  const data = {
    /* eslint-disable sort-keys */
    index: 0,
    isCurrent: true,

    header: {
      titleLine1: "Civic's 1st pick",
      titleLine2: 'Keep original tire',
      subtitle: 'That came with your Honda from the factory',
    },

    asset: {
      altText: '',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 800,
    } as SiteImage,

    brand: {
      label: 'Continental',
    },

    deliveryInfo: {
      value: '2-day free delivery',
      isFeatured: true, // determines whether is shows up in the grid, or just top picks
    },
    location: 'Brooklyn, NY',

    productName: 'ProContact',
    productFeature: '65k mile warranty',

    rating: {
      quantity: 115,
      value: 4.3,
    },

    ctaLabel: 'Select Original',
    url:
      '/brands/achilles-tires/achilles-atr-sport-2?v=1&width=215&ratio=45r&diameter=17&mpn=1463000',

    /* eslint-enable sort-keys */
  };

  return <TopPicksItem {...data} />;
}

export function TopPicksItemWithViewMore() {
  const data = {
    /* eslint-disable sort-keys */
    index: 0,
    isCurrent: boolean('Is current', true),

    viewMoreData: {
      header: {
        title: 'Want to dive deeper?',
        subtitle: '232 tires fit your Civic',
      },
      content: {
        title: 'From $49 to $349',
        subtitleLine1: '2 to 4 day delivery to Brooklyn, NY',
        subtitleLine2: '128 brands, 24,432 reviews',
      },
    } as SiteCatalogSummaryTopPicksMore,

    totalResult: 232,

    exploreMore: () => {},

    /* eslint-enable sort-keys */
  };

  return <TopPicksItem {...data} />;
}
