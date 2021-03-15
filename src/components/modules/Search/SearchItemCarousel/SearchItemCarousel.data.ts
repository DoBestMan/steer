/* eslint-disable sort-keys */
import { SiteCar } from '~/data/models/SiteCar';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteSearchResultTextItem } from '~/data/models/SiteSearchResultTextItem';

export const vehicleData: SiteSearchResultTextItem[] = [
  {
    type: 'SiteSearchResultTextItem',
    label: 'Passenger',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Passenger',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=1',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--sedan',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Light Truck',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Light Truck',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=4',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--truck',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Commercial',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Commercial',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=5',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--commercial',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Farm',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Farm',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=6',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--farm',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'SUV/Crossover',
    detailLabel: '',
    labelSegments: [
      {
        label: 'SUV/Crossover',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=19',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--suv',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'ATV/UTV',
    detailLabel: '',
    labelSegments: [
      {
        label: 'ATV/UTV',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=11',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--atv-utv',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Trailer',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Trailer',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=13',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--trailer',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Lawn & Garden',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Lawn & Garden',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=9',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--lawn-and-garden',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Industrial',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Industrial',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=7',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--industrial',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'OTR',
    detailLabel: '',
    labelSegments: [
      {
        label: 'OTR',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=8',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--otr',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Racing',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Racing',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=17',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--racing',
    } as SiteCar,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Golf',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Golf',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'subtype=12',
        isExternal: false,
      },
    },
    image: {
      type: 'SiteCar',
      vehicleType: 'car--sedan',
    } as SiteCar,
  },
];

export const categoryData: SiteSearchResultTextItem[] = [
  {
    type: 'SiteSearchResultTextItem',
    label: 'All Season',
    detailLabel: '',
    labelSegments: [
      {
        label: 'All Season',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=1',
        isExternal: false,
      },
    },
    image: {
      svgId: 'all-season',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'All Terrain',
    detailLabel: '',
    labelSegments: [
      {
        label: 'All Terrain',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=4',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-all-terrain',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Winter',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Winter',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=3',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-winter',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Summer',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Summer',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=10',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-summer',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'UHP',
    detailLabel: '',
    labelSegments: [
      {
        label: 'UHP',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=8',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-uhp',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Highway',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Highway',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=5',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-highway',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Mud Terrain',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Mud Terrain',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=6',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-mud-terrain',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Performance',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Performance',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=2',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-performance',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Touring',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Touring',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=11',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-touring',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'All Weather',
    detailLabel: '',
    labelSegments: [
      {
        label: 'All Weather',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=13',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-all-weather',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Track Competition',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Track Competition',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=20',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-track-competition',
      type: 'SiteIcon',
    } as SiteIcon,
  },
  {
    type: 'SiteSearchResultTextItem',
    label: 'Racing',
    detailLabel: '',
    labelSegments: [
      {
        label: 'Racing',
        matches: false,
      },
    ],
    action: {
      type: 'SiteSearchResultActionLink',
      link: {
        href: 'category=7',
        isExternal: false,
      },
    },
    image: {
      svgId: 'tiretype-racing',
      type: 'SiteIcon',
    } as SiteIcon,
  },
];
