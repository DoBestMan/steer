import { Cars } from '~/components/global/Car/Car.enums';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import { SiteCatalogProductItem } from '~/data/models/SiteCatalogProductItem';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
import { SiteCatalogSummaryTopPickItem } from '~/data/models/SiteCatalogSummaryTopPickItem';
import { SiteCatalogSummaryTopPickItemAdditionalInfo } from '~/data/models/SiteCatalogSummaryTopPickItemAdditionalInfo';
import { SiteCatalogSummaryTopPicksMore } from '~/data/models/SiteCatalogSummaryTopPicksMore';
import { SiteImage } from '~/data/models/SiteImage';
import { SitePrice } from '~/data/models/SitePrice';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export const brands: SiteCatalogSummary = {
  siteCatalogSummaryBuildIn: null,
  siteCatalogSummaryMeta: null,
  siteCatalogSummaryPrompt: null,
  siteCatalogSummaryRecirculation: {
    title: 'You may also be interested in:',
    items: [
      {
        label: 'Winter tires',
        description: 'For snow, ice and freezing temperatures.',
        icon: {
          type: ICON_IMAGE_TYPE.ICON,
          svgId: 'tiretype-winter',
        },
        siteQueryParams: {
          type: 'winter',
        },
      },
    ],
    more: {
      label: 'See all 253 tires',
      description: 'All of our catalog',
      siteQueryParams: {
        skipGroups: 'true',
      },
    },
  },
  siteCatalogSummaryTopPicksList: [],
  siteCatalogSummaryTopPicksMore: null,
};

export const vehiclesDisambiguation: SiteCatalogSummary = {
  siteCatalogSummaryBuildIn: {
    title: "Ok, let's confirm the tire size of your Civic",
    brandList: null,
  },
  siteCatalogSummaryMeta: {
    sceneryType: Sceneries['scenery--urban'],
    sizeList: [],
    tireImage: {
      altText: '',
      height: 225,
      src: 'https://steer-api-definition.now.sh/mock-images/catalog-tire-1.jpg',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 225,
    },
    totalResults: 0,
    vehicleType: Cars['car--sedan'],
  },
  siteCatalogSummaryPrompt: {
    body:
      "Find it on the sidewall of your current tires, the owner's manual or inside the frame of the driver's door.",
    ctaList: [
      {
        label: '235/40R18 91W',
        link: {
          href:
            'https://simpletire.com/vehicles/acura-tires/rsx/2005?tireSize=23540R1891W',
          isExternal: false,
        },
      },
      {
        label: '235/40R18 95Y XL',
        link: {
          href:
            'https://simpletire.com/vehicles/acura-tires/rsx/2005?tireSize=235/40R1895YXL',
          isExternal: false,
        },
      },
    ],
    infoLink: {
      label: 'Not sure?',
      contentId: 'findYourTireSize',
    },
    mustShow: true,
    title: "Ok, let's confirm the tire size of your Civic",
  },
  siteCatalogSummaryRecirculation: null,
  siteCatalogSummaryTopPicksList: [],
  siteCatalogSummaryTopPicksMore: null,
};

export const vehiclesNoOeWithSize: SiteCatalogSummary = {
  siteCatalogSummaryBuildIn: {
    title: '232 tires fit your Civic',
    brandList: [
      {
        image: {
          altText: '',
          height: 15,
          src: 'https://via.placeholder.com/75x15',
          type: ICON_IMAGE_TYPE.IMAGE,
          width: 75,
        },
        label: 'Continental',
      },
    ],
  },
  siteCatalogSummaryMeta: {
    sceneryType: Sceneries['scenery--urban'],
    sizeList: ['Size 255/30 R20', 'Rear 205/30 R20'],
    tireImage: {
      altText: '',
      height: 225,
      src: 'https://steer-api-definition.now.sh/mock-images/catalog-tire-1.jpg',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 225,
    },
    totalResults: 232,

    vehicleType: Cars['car--sedan'],
  },
  siteCatalogSummaryPrompt: {
    body:
      '**Most drivers like you choose from our top picks**<br />They include the best matches for your Civic based on popularity, user ratings, and price',
    ctaList: [
      {
        label: 'Ok, continue',
        link: null,
      },
    ],
    infoLink: null,
    mustShow: false,
    title: "We'll start with our top picks",
  },
  siteCatalogSummaryRecirculation: {
    title: 'You may also be interested in:',
    items: [
      {
        label: 'Winter tires',
        description: 'For snow, ice and freezing temperatures.',
        icon: {
          type: ICON_IMAGE_TYPE.ICON,
          svgId: 'tiretype-winter',
        },
        siteQueryParams: {
          type: 'winter',
        },
      },
    ],
    more: {
      label: 'See all 253 tires',
      description: 'All of our catalog',
      siteQueryParams: {
        skipGroups: 'true',
      },
    },
  },
  siteCatalogSummaryTopPicksList: [
    /* eslint-disable sort-keys */
    {
      header: {
        titleLine1: "Civic's 1st pick",
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
            altText: 'Aderenza',
            height: 20,
            src:
              'https://images.simpletire.com/image/upload/v1593195322/manf-logos/462b.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
            width: 120,
          } as SiteImage,
          label: 'Aderenza',
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
        titleLine1: '215/50R17 ∙ 2nd pick',
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
            altText: 'Achieva',
            height: 20,
            src:
              'https://images.simpletire.com/image/upload/v1593195323/manf-logos/533b.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
            width: 120,
          } as SiteImage,
          label: 'Achieva',
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
        titleLine1: '215/50R17 ∙ 3rd pick',
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
            altText: 'Achilles',
            height: 20,
            src:
              'https://images.simpletire.com/image/upload/v1593195309/manf-logos/4b.svg',
            type: ICON_IMAGE_TYPE.IMAGE,
            width: 120,
          } as SiteImage,
          label: 'Achilles',
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
    } as SiteCatalogSummaryTopPickItem,
    /* eslint-enable sort-keys */
  ],
  siteCatalogSummaryTopPicksMore: {
    content: {
      subtitleLine1: '2 to 4 day delivery to Brooklyn, NY',
      subtitleLine2: '128 brands, 24,432 reviews',
      title: 'From $49 to $349',
    },
    header: {
      subtitle: '232 tires fit your Civic',
      title: 'Want to dive deeper?',
    },
  } as SiteCatalogSummaryTopPicksMore,
};

export const vehiclesNoResultWithTrim: SiteCatalogSummary = {
  siteCatalogSummaryBuildIn: null,
  siteCatalogSummaryMeta: {
    sceneryType: Sceneries['scenery--urban'],
    sizeList: [],
    tireImage: {
      altText: '',
      height: 225,
      src: 'https://steer-api-definition.now.sh/mock-images/catalog-tire-1.jpg',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 225,
    },
    totalResults: 0,
    vehicleType: Cars['car--sedan'],
  },
  siteCatalogSummaryPrompt: {
    body: null,
    ctaList: null,
    infoLink: null,
    mustShow: true,
    title: 'Sorry, no tires found for your Honda Civic 1982 Type-R',
  },
  siteCatalogSummaryRecirculation: null,
  siteCatalogSummaryTopPicksList: [],
  siteCatalogSummaryTopPicksMore: null,
};
