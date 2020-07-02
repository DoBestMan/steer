import { SiteCatalogFilterItem } from '~/data/models/SiteCatalogFilterItem';
import {
  SiteCatalogFilterList,
  SiteCatalogFilterListTypeEnum,
} from '~/data/models/SiteCatalogFilterList';
import {
  SiteCatalogFilterRange,
  SiteCatalogFilterRangeTypeEnum,
} from '~/data/models/SiteCatalogFilterRange';
import {
  SiteCatalogFilterToggle,
  SiteCatalogFilterToggleTypeEnum,
} from '~/data/models/SiteCatalogFilterToggle';
import { SiteCatalogSortListItem } from '~/data/models/SiteCatalogSortListItem';

/* eslint-disable sort-keys */
export const filterTypeSelect = [
  SiteCatalogFilterListTypeEnum.SiteCatalogFilterList,
  SiteCatalogFilterRangeTypeEnum.SiteCatalogFilterRange,
  SiteCatalogFilterToggleTypeEnum.SiteCatalogFilterToggle,
];

export const warrantyFilter = {
  type: 'SiteCatalogFilterRange',
  id: 'warranty',
  header: {
    title: 'Warranty',
    infoLink: {
      label: 'How to choose?',
      siteStaticModal: {
        contentId: 'TBD',
        type: 'SiteStaticModal',
      },
    },
  },
  minValue: 0,
  maxValue: 70000,
  currentMinValue: null,
  currentMaxValue: null,
  step: 5000,
  unit: 'UnitMiles',
} as SiteCatalogFilterRange;

export const mockPriceFilter = {
  type: 'SiteCatalogFilterRange',
  id: 'price',
  header: {
    title: 'Price',
    infoLink: null,
  },
  minValue: 49,
  maxValue: 349,
  currentMinValue: null,
  currentMaxValue: null,
  step: 1,
  unit: 'UnitUSD',
} as SiteCatalogFilterRange;

export const filterSort = [
  {
    title: 'Best match',
    description: 'Fastest delivery, best ratings and value',
    state: 'Normal',
    value: {
      sort: 'bestMatch',
    },
  },
  {
    title: 'Best Value',
    description: null,
    state: 'Normal',
    value: {
      sort: 'bestValue',
    },
  },
  {
    title: 'Price: Low to High',
    description: null,
    state: 'Selected',
    value: {
      sort: 'price',
      order: 'asc',
    },
  },
  {
    title: 'Price: High to Low',
    description: null,
    state: 'Normal',
    value: {
      sort: 'price',
      order: 'desc',
    },
  },
  {
    title: 'Best Seller',
    description: null,
    state: 'Normal',
    value: {
      sort: 'bestSeller',
    },
  },
  {
    title: 'Brand: A-Z',
    description: null,
    state: 'Normal',
    value: {
      sort: 'brand',
      order: 'asc',
    },
  },
  {
    title: 'Brand: Z-A',
    description: null,
    state: 'Normal',
    value: {
      sort: 'brand',
      order: 'desc',
    },
  },
  {
    title: 'Mileage Warranty',
    description: null,
    state: 'Normal',
    value: {
      sort: 'warranty',
    },
  },
  {
    title: 'Highest Rating',
    description: null,
    state: 'Normal',
    value: {
      sort: 'rating',
    },
  },
] as Array<SiteCatalogSortListItem>;

export const filterChecklist = {
  type: 'SiteCatalogFilterList',
  presentationStyle: 'Normal',
  header: {
    title: 'Tire type',
    infoLink: {
      label: 'How to choose?',
      siteStaticModal: {
        contentId: 'TBD',
        type: 'SiteStaticModal',
      },
    },
  },
  filterGroups: [
    {
      groupType: 'Checklist',
      header: {
        title: 'Tire type',
        infoLink: null,
      },
      items: [
        {
          title: 'Industrial',
          flair: null,
          description: null,
          count: 14,
          state: 'Normal',
          value: {
            subtype: 'industrial',
          },
        },
        {
          title: 'Passenger',
          flair: null,
          description: null,
          count: 80,
          state: 'Normal',
          value: {
            subtype: 'passenger',
          },
        },
      ],
    },
    {
      groupType: 'Checklist',
      header: {
        title: 'Performance',
        infoLink: {
          label: "What's this?",
          siteStaticModal: {
            contentId: 'TBD',
            type: 'SiteStaticModal',
          },
        },
      },
      items: [
        {
          title: 'All season',
          flair: 'Civic standard',
          description: 'Most common: Good handle on dry, wet or snow',
          count: 86,
          state: 'Normal',
          value: {
            category: 'allSeason',
          },
        },
        {
          title: 'Winter',
          flair: null,
          description: 'For snow, ice, and freezing temperatures',
          count: 12,
          state: 'Normal',
          value: {
            category: 'winter',
          },
        },
        {
          title: 'Summer',
          flair: null,
          description: 'For dry roads and warm, arid climates',
          count: 8,
          state: 'Normal',
          value: {
            category: 'summer',
          },
        },
        {
          title: 'Performance',
          flair: null,
          description: 'For sport/luxury vehicles and high-speed handling',
          count: 4,
          state: 'Normal',
          value: {
            category: 'performance',
          },
        },
        {
          title: 'Racing',
          flair: null,
          description: 'Maximum traction for competition',
          count: 3,
          state: 'Normal',
          value: {
            category: 'racing',
          },
        },
        {
          title: 'Touring',
          flair: null,
          description: 'For durability and smooth long rides',
          count: 12,
          state: 'Normal',
          value: {
            category: 'touring',
          },
        },
      ],
    },
  ],
} as SiteCatalogFilterList;

export const mockSiteCatalogFilters = [
  {
    type: 'SiteCatalogFilterToggle',
    item: {
      title: 'Deals',
      flair: null,
      description: null,
      count: 135,
      state: 'Normal',
      value: {
        deals: 'true',
      },
    },
  },
  {
    type: 'SiteCatalogFilterToggle',
    item: {
      title: 'All Season',
      flair: null,
      description: null,
      count: 86,
      state: 'Normal',
      value: {
        category: 'allSeason',
      },
    },
  },
  {
    type: 'SiteCatalogFilterToggle',
    item: {
      title: 'Free installation',
      flair: null,
      description: null,
      count: 10,
      state: 'Normal',
      value: {
        freeInstall: 'true',
      },
    },
  },
  {
    type: 'SiteCatalogFilterToggle',
    item: {
      title: '2-day delivery',
      flair: null,
      description: null,
      count: 120,
      state: 'Normal',
      value: {
        twoDayDelivery: 'true',
      },
    },
  },
  {
    type: 'SiteCatalogFilterToggle',
    item: {
      title: 'Original tires',
      flair: null,
      description: null,
      count: 50,
      state: 'Normal',
      value: {
        originalTire: 'true',
      },
    },
  },
  {
    type: 'SiteCatalogFilterList',
    presentationStyle: 'Normal',
    header: {
      title: 'Brand',
      infoLink: {
        label: 'Learn more',
        siteStaticModal: {
          contentId: 'TBD',
          type: 'SiteStaticModal',
        },
      },
    },
    filterGroups: [
      {
        groupType: 'Checklist',
        header: null,
        items: [
          {
            title: 'Popular brands',
            flair: null,
            description: null,
            count: 86,
            state: 'Normal',
            value: {
              brandCategory: 'popularBrands',
            },
          },
          {
            title: 'Highest rated brands',
            flair: null,
            description: null,
            count: 12,
            state: 'Normal',
            value: {
              brandCategory: 'highestRatedBrands',
            },
          },
          {
            title: 'Local brands',
            flair: null,
            description: null,
            count: 8,
            state: 'Normal',
            value: {
              brandCategory: 'localBrands',
            },
          },
        ],
      },
      {
        groupType: 'Checklist',
        header: {
          title: 'Featured',
          infoLink: null,
        },
        items: [
          {
            title: 'Firestone',
            flair: 'Best seller',
            description: null,
            count: 3,
            state: 'Normal',
            value: {
              brand: 'firestone',
            },
          },
          {
            title: 'Goodyear',
            flair: null,
            description: null,
            count: 4,
            state: 'Selected',
            value: {
              brand: 'goodyear',
            },
          },
          {
            title: 'Nexen',
            flair: null,
            description: null,
            count: 2,
            state: 'Normal',
            value: {
              brand: 'nexen',
            },
          },
          {
            title: 'Pirelli',
            flair: 'Top rated',
            description: null,
            count: 9,
            state: 'Selected',
            value: {
              brand: 'pirelli',
            },
          },
          {
            title: 'Contintental',
            flair: null,
            description: null,
            count: 19,
            state: 'Normal',
            value: {
              brand: 'contintental',
            },
          },
        ],
      },
    ],
  },
  {
    type: 'SiteCatalogFilterList',
    presentationStyle: 'Normal',
    header: {
      title: 'Tire type',
      infoLink: null,
    },
    filterGroups: [
      {
        groupType: 'Checklist',
        header: {
          title: 'Tire type',
          infoLink: null,
        },
        items: [
          {
            title: 'Industrial',
            flair: null,
            description: null,
            count: 14,
            state: 'Normal',
            value: {
              subtype: 'industrial',
            },
          },
          {
            title: 'Passenger',
            flair: null,
            description: null,
            count: 80,
            state: 'Normal',
            value: {
              subtype: 'passenger',
            },
          },
        ],
      },
      {
        groupType: 'Checklist',
        header: {
          title: 'Performance',
          infoLink: null,
        },
        items: [
          {
            title: 'All season',
            flair: 'Civic standard',
            description: 'Most common: Good handle on dry, wet or snow',
            count: 86,
            state: 'Normal',
            value: {
              category: 'allSeason',
            },
          },
          {
            title: 'Winter',
            flair: null,
            description: 'For snow, ice, and freezing temperatures',
            count: 12,
            state: 'Normal',
            value: {
              category: 'winter',
            },
          },
          {
            title: 'Summer',
            flair: null,
            description: 'For dry roads and warm, arid climates',
            count: 8,
            state: 'Normal',
            value: {
              category: 'summer',
            },
          },
          {
            title: 'Performance',
            flair: null,
            description: 'For sport/luxury vehicles and high-speed handling',
            count: 4,
            state: 'Normal',
            value: {
              category: 'performance',
            },
          },
          {
            title: 'Racing',
            flair: null,
            description: 'Maximum traction for competition',
            count: 3,
            state: 'Normal',
            value: {
              category: 'racing',
            },
          },
          {
            title: 'Touring',
            flair: null,
            description: 'For durability and smooth long rides',
            count: 12,
            state: 'Normal',
            value: {
              category: 'touring',
            },
          },
        ],
      },
    ],
  },
  {
    type: 'SiteCatalogFilterList',
    presentationStyle: 'Normal',
    header: {
      title: 'Speed',
      infoLink: null,
    },
    filterGroups: [
      {
        groupType: 'Checklist',
        header: null,
        items: [
          {
            title: 'S - 112 mph',
            flair: 'Civic standard',
            description: null,
            count: 123,
            state: 'Normal',
            value: {
              speedrating: 's',
            },
          },
          {
            title: 'T - 118 mph',
            flair: null,
            description: null,
            count: 50,
            state: 'Normal',
            value: {
              speedrating: 't',
            },
          },
          {
            title: 'Y - 186 mph',
            flair: null,
            description: null,
            count: 34,
            state: 'Normal',
            value: {
              speedrating: 'y',
            },
          },
        ],
      },
    ],
  },
  {
    type: 'SiteCatalogFilterList',
    presentationStyle: 'Normal',
    header: {
      title: 'Load',
      infoLink: null,
    },
    filterGroups: [
      {
        groupType: 'Checklist',
        header: {
          title: 'Range',
          infoLink: {
            label: "What's this?",
            siteStaticModal: {
              contentId: 'TBD',
              type: 'SiteStaticModal',
            },
          },
        },
        items: [
          {
            title: 'SL - Standard Load',
            flair: null,
            description: null,
            count: 96,
            state: 'Normal',
            value: {
              loadrange: 'sl',
            },
          },
          {
            title: 'XL - Standard Load',
            flair: null,
            description: null,
            count: 35,
            state: 'Normal',
            value: {
              loadrange: 'xl',
            },
          },
          {
            title: 'B',
            flair: null,
            description: null,
            count: 98,
            state: 'Normal',
            value: {
              loadrange: 'b',
            },
          },
          {
            title: 'RE',
            flair: null,
            description: null,
            count: 8,
            state: 'Normal',
            value: {
              loadrange: 're',
            },
          },
        ],
      },
      {
        groupType: 'Checklist',
        header: {
          title: 'Index',
          infoLink: {
            label: "What's this?",
            siteStaticModal: {
              contentId: 'TBD',
              type: 'SiteStaticModal',
            },
          },
        },
        items: [
          {
            title: '91 – 1356 lbs',
            flair: 'Civic standard',
            description: null,
            count: 86,
            state: 'Normal',
            value: {
              loadindex: '91_1356',
            },
          },
          {
            title: '90 - 1323 lbs',
            flair: null,
            description: null,
            count: 12,
            state: 'Normal',
            value: {
              loadindex: '90_1323',
            },
          },
          {
            title: '87-1201 lbs',
            flair: null,
            description: null,
            count: 22,
            state: 'Normal',
            value: {
              loadindex: '87_1201',
            },
          },
        ],
      },
    ],
  },
  warrantyFilter,
  {
    type: 'SiteCatalogFilterList',
    presentationStyle: 'Large',
    header: {
      title: 'More filters',
      infoLink: null,
    },
    filterGroups: [
      {
        groupType: 'Checklist',
        header: {
          title: 'Features',
          infoLink: null,
        },
        items: [
          {
            title: 'Fuel efficient',
            flair: null,
            description:
              'Less rolling resistence, requiring less energy to move',
            count: 2,
            state: 'Normal',
            value: {
              features: 'fuelEfficient',
            },
          },
        ],
      },
      {
        groupType: 'Checklist',
        header: {
          title: 'Sidewall types',
          infoLink: null,
        },
        items: [
          {
            title: 'BW - Black sidewall',
            flair: null,
            description: null,
            count: 2,
            state: 'Disabled',
            value: {
              sidewall: 'bw',
            },
          },
          {
            title: 'TL - Tubeless',
            flair: null,
            description: null,
            state: 'Normal',
            value: {
              sidewall: 'tl',
            },
          },
          {
            title: 'VSB - Vertical Serrated Band',
            flair: null,
            description: null,
            count: 58,
            state: 'Normal',
            value: {
              sidewall: 'vsb',
            },
          },
        ],
      },
      {
        groupType: 'Radio',
        header: {
          title: 'Run flat',
          infoLink: null,
        },
        items: [
          {
            title: 'Show only runflat',
            flair: null,
            description: 'Can run even with a puncture for a limited distance',
            count: 18,
            state: 'Normal',
            value: {
              runflat: 'true',
            },
          },
          {
            title: 'Do not show runflat',
            flair: null,
            description: null,
            count: 18,
            state: 'Normal',
            value: {
              runflat: 'false',
            },
          },
          {
            title: 'Include runflat',
            flair: null,
            description: null,
            count: 18,
            state: 'Normal',
            value: {
              runFlat: '',
            },
          },
        ],
      },
      {
        groupType: 'Radio',
        header: {
          title: 'Smartway',
          infoLink: null,
        },
        items: [
          {
            title: 'Show only smartway',
            flair: null,
            description: null,
            count: 18,
            state: 'Normal',
            value: {
              smartway: 'true',
            },
          },
          {
            title: 'Do not show smartway',
            flair: null,
            description: null,
            count: 18,
            state: 'Normal',
            value: {
              smartway: 'false',
            },
          },
          {
            title: 'Include smartway',
            flair: null,
            description: null,
            count: 18,
            state: 'Normal',
            value: {
              smartway: '',
            },
          },
        ],
      },
      {
        groupType: 'Radio',
        header: {
          title: 'Studded / Studdable',
          infoLink: null,
        },
        items: [
          {
            title: 'Show only studded',
            flair: null,
            description: 'Made with embedded metal studs for traction on ice',
            count: 58,
            state: 'Normal',
            value: {
              studded: 'true',
              studdable: '',
              studdedStuddable: '',
            },
          },
          {
            title: 'Show only studdable',
            flair: null,
            description: 'Can accept studs for added winter traction',
            count: 19,
            state: 'Normal',
            value: {
              studded: '',
              studdable: 'true',
              studdedStuddable: '',
            },
          },
          {
            title: 'Show both studded and studdable',
            flair: null,
            description: null,
            count: 19,
            state: 'Normal',
            value: {
              studded: '',
              studdable: '',
              studdedStuddable: 'true',
            },
          },
          {
            title: 'Include studded and studdable',
            flair: null,
            description: null,
            count: 19,
            state: 'Normal',
            value: {
              studded: '',
              studdable: '',
              studdedStuddable: '',
            },
          },
        ],
      },
    ],
  },
  mockPriceFilter,
];

// mocks for Filters.utils.test.ts
export const mockItem = ({
  value: { foo: 'bar' },
} as unknown) as SiteCatalogFilterItem;
export const mockToggle = ({
  type: 'SiteCatalogFilterToggle',
  item: {
    state: 'Selected',
    title: 'Toggle Label',
    value: { foo: 'bar' },
  },
} as unknown) as SiteCatalogFilterToggle;
export const mockList = ({
  type: 'SiteCatalogFilterList',
  header: {
    title: 'List Label',
  },
  filterGroups: [
    {
      items: [
        {
          value: { foo: 'bar', baz: 'foo' },
        },
      ],
    },
  ],
} as unknown) as SiteCatalogFilterToggle;
export const mockRange = {
  type: 'SiteCatalogFilterRange',
  id: 'range',
} as SiteCatalogFilterRange;
