import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
import { SiteCatalogSummaryTopPickItemAdditionalInfo } from '~/data/models/SiteCatalogSummaryTopPickItemAdditionalInfo';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';
import { SiteImage } from '~/data/models/SiteImage';
import { SitePrice } from '~/data/models/SitePrice';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import { styles } from './TopPick.storiesStyles';
import TopPicks from './TopPicks';

export default {
  component: TopPicks,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  title: 'Catalog/Top Picks/Top Picks',
};

const customerServiceNumber = {
  display: '(888) 410 0604',
  value: '18884100604',
};

export function TopPicksWithKnobs() {
  const picks = [
    /* eslint-disable sort-keys */
    {
      header: {
        titleLine1: "Civic's 1st pick:",
        titleLine2: 'Keep original tire',
        subtitle: 'That came with your Honda from the factory',
        pill: null,
        additionalInfoLabel: 'original tire',
      },

      fallbackImage: null,

      /* Part of a SiteProduct */
      product: {
        imageList: [
          {
            image: {
              altText: '',
              height: 800,
              src:
                'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
              type: ICON_IMAGE_TYPE.IMAGE,
              width: 800,
            } as SiteImage,
            productImageType: 'sidewall',
          },
        ],
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
              salePriceInCents: '23255',
              estimatedRetailPriceInCents: '17800',
            } as SitePrice,
          },
        ],
        deliveryInfo: {
          value: '2-day free delivery',
          isFeatured: true, // determines whether is shows up in the grid, or just top picks
        },
        name: 'ProContact',
        topPicksAttribute: '65k mile warranty',
        rating: {
          quantity: 115,
          value: 4.3,
        },
        link: {
          href:
            '/brands/achilles-tires/achilles-atr-sport-2?v=1&width=215&ratio=45r&diameter=17&mpn=1463000',
          isExternal: false,
        },
      } as SiteCatalogProductItem,

      ctaLabel: 'Select original tire',

      siteCatalogSummaryTopPickItemAdditionalInfo: {
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
    } as SiteCatalogSummaryTopPickItem,
    {
      header: {
        titleLine1: '215/50R17 ∙ 2nd pick:',
        titleLine2: 'The best seller',
        subtitle: 'Excellent price and a high-mileage warranty',
        pill: null,
        additionalInfoLabel: null,
      },

      /* Part of a SiteProduct */
      product: {
        imageList: [
          {
            image: {
              altText: '',
              height: 800,
              src:
                'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
              type: ICON_IMAGE_TYPE.IMAGE,
              width: 800,
            } as SiteImage,
            productImageType: 'sidewall',
          },
        ],
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
              salePriceInCents: '13296',
              estimatedRetailPriceInCents: '15900',
            } as SitePrice,
          },
        ],
        deliveryInfo: {
          value: '2-day free delivery',
          isFeatured: true, // determines whether is shows up in the grid, or just top picks
        },
        name: 'ProContact 2',
        topPicksAttribute: '65k mile warranty',
        rating: {
          quantity: 115,
          value: 4.3,
        },
        link: {
          href:
            '/brands/achilles-tires/achilles-atr-sport-2?v=1&width=215&ratio=45r&diameter=17&mpn=1463000',
          isExternal: false,
        },
      } as SiteCatalogProductItem,

      ctaLabel: 'Select best seller',

      siteCatalogSummaryTopPickItemAdditionalInfo: null,
    } as SiteCatalogSummaryTopPickItem,

    {
      header: {
        titleLine1: '215/50R17 ∙ 3rd pick:',
        titleLine2: 'The best match',
        subtitle: null,
        pill: 'best match',
        additionalInfoLabel: null,
      },

      fallbackImage: null,

      product: {
        imageList: [
          {
            image: {
              altText: '',
              height: 800,
              src:
                'https://images.simpletire.com/image/upload/v1591705397/line-images/1037/1037-sidewall_ludjs0.png',
              type: ICON_IMAGE_TYPE.IMAGE,
              width: 800,
            } as SiteImage,
            productImageType: 'sidewall',
          },
        ],
        brand: {
          image: {
            altText: '115x25 image',
            height: 25,
            src: 'https://via.placeholder.com/115x25',
            type: ICON_IMAGE_TYPE.IMAGE,
            width: 115,
          } as SiteImage,
          label: 'Pirelli',
        },
        priceList: [
          {
            label: null,
            price: {
              salePriceInCents: '15299',
              estimatedRetailPriceInCents: '17900',
            } as SitePrice,
          },
        ],
        deliveryInfo: {
          value: '2-day free delivery',
          isFeatured: true, // determines whether is shows up in the grid, or just top picks
        },
        name: 'P Zero',
        topPicksAttribute: '65k mile warranty',
        rating: {
          quantity: 345,
          value: 4.1,
        },
        link: {
          href:
            '/brands/pirelli-tires/pirelli-p-zero?v=1&width=215&ratio=45r&diameter=17&mpn=1463000',
          isExternal: false,
        },
      } as SiteCatalogProductItem,

      ctaLabel: 'Select Best Match',
    } as SiteCatalogSummaryTopPickItem,
    {
      header: {
        titleLine1: '215/50R18 ∙ 4th pick',
        titleLine2: null,
        subtitle: "Let's find the best tire for you",
        pill: null,
        additionalInfoLabel: null,
      },

      fallbackImage: {
        altText: '',
        height: 800,
        src:
          'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
        type: ICON_IMAGE_TYPE.IMAGE,
        width: 800,
      } as SiteImage,

      product: null,

      ctaLabel: null,

      /* eslint-enable sort-keys */
    } as SiteCatalogSummaryTopPickItem,
  ];

  const viewMoreData: SiteCatalogSummaryTopPicksMore = {
    content: {
      subtitleLine1: '2 to 4 day delivery to Brooklyn, NY',
      subtitleLine2: '128 brands, 24,432 reviews',
      title: 'From $49 to $349',
    },
    header: {
      subtitle: '232 tires fit your Civic',
      title: 'Want to dive deeper?',
    },
  };

  const totalResult = 232;
  const location = 'Brooklyn, NY';
  const exploreMore = () => {};
  const openSearch = () => {};

  return (
    <div css={styles.root}>
      <div css={styles.fakeBackground}>
        <div css={styles.topContent}></div>
        <div css={styles.bottomContent}></div>
      </div>
      <TopPicks
        customerServiceNumber={customerServiceNumber}
        exploreMore={exploreMore}
        openSearch={openSearch}
        totalResult={totalResult}
        viewMoreData={viewMoreData}
        picks={picks}
        location={location}
        showLoadingInterstitial={false}
      />
    </div>
  );
}
