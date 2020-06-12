import { Cars } from '~/components/global/Car/Car.enums';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import { SiteCatalogSummary } from '~/data/models/SiteCatalogSummary';
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
          svgId: 'winter',
        },
        link: {
          href: '/current-url-here?type=winterTires',
          isExternal: false,
        },
      },
    ],
    more: {
      label: 'See all 253 tires',
      description: 'All of our catalog',
      link: {
        href: '/current-url-here?seeAll=true',
        isExternal: false,
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
    vehicleType: Cars['car--sedan'],
    sceneryType: Sceneries['scenery--urban'],
    tireImage: {
      altText: '',
      height: 225,
      src: 'https://steer-api-definition.now.sh/mock-images/catalog-tire-1.jpg',
      srcSet:
        'https://steer-api-definition.now.sh/mock-images/catalog-tire-1.jpg',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 225,
    },
    sizeList: [],
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
          srcSet: 'https://via.placeholder.com/75x15',
          type: ICON_IMAGE_TYPE.IMAGE,
          width: 75,
        },
        label: 'Continental',
      },
    ],
  },
  siteCatalogSummaryMeta: {
    vehicleType: Cars['car--sedan'],
    sceneryType: Sceneries['scenery--urban'],
    tireImage: {
      altText: '',
      height: 225,
      src: 'https://steer-api-definition.now.sh/mock-images/catalog-tire-1.jpg',
      srcSet:
        'https://steer-api-definition.now.sh/mock-images/catalog-tire-1.jpg',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 225,
    },
    sizeList: ['Size 255/30 R20', 'Rear 205/30 R20'],
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
          svgId: 'winter',
        },
        link: {
          href: '/current-url-here?type=winterTires',
          isExternal: false,
        },
      },
    ],
    more: {
      label: 'See all 253 tires',
      description: 'All of our catalog',
      link: {
        href: '/current-url-here?seeAll=true',
        isExternal: false,
      },
    },
  },
  siteCatalogSummaryTopPicksList: [
    {
      header: {
        titleLine1: "Civic's 1st pick:",
        titleLine2: 'Best match to original tire',
        subtitle: 'With similar, but improved, specs & features',
        pill: null,
      },
      product: {
        type: 'SiteCatalogProductItem',
        name: 'DH2',
      },
      ctaLabel: 'Select original',
      siteCatalogSummaryTopPickItemAdditionalInfo: {
        title: 'Original tire',
        content:
          'Originally, your Civic came with tires that are no longer being made.<br />But don’t worry, we review the original tire specs when selecting your top picks in order to provide the best match in terms of performance, durability and price.',
        table: {
          title: 'Original tire specs',
          items: [
            {
              label: 'Warranty',
              value: '60000 miles',
            },
            {
              label: 'Max speed',
              value: '168 mph',
            },
            {
              label: 'Max load',
              value: '1389 lbs',
            },
            {
              label: 'Features',
              value: 'Runflat, studded, smartway',
            },
            {
              label: 'UTQG',
              value: '500AA',
            },
            {
              label: 'Type',
              value: 'Passenger',
            },
          ],
        },
      },
    },
  ],
  siteCatalogSummaryTopPicksMore: {
    header: {
      title: 'Want to dive deeper?',
      subtitle: '232 tires fit your Civic',
    },
    content: {
      title: 'From $49 to $349',
      subtitleLine1: '2 to 4 day delivery to Brooklyn, NY',
      subtitleLine2: '128 brands, 24,432 reviews',
    },
  },
};

export const vehiclesNoResultWithTrim: SiteCatalogSummary = {
  siteCatalogSummaryBuildIn: null,
  siteCatalogSummaryMeta: {
    vehicleType: Cars['car--sedan'],
    sceneryType: Sceneries['scenery--urban'],
    tireImage: {
      altText: '',
      height: 225,
      src: 'https://steer-api-definition.now.sh/mock-images/catalog-tire-1.jpg',
      srcSet:
        'https://steer-api-definition.now.sh/mock-images/catalog-tire-1.jpg',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 225,
    },
    sizeList: [],
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
