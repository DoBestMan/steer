import {
  CatalogFilterRange,
  CatalogFilterSort,
  CatalogFilterTypes,
  FilterContentTypes,
} from './Filter.types';

export const filterTypeSelect: FilterContentTypes[] = [
  FilterContentTypes.CatalogFilterChecklist,
  FilterContentTypes.CatalogFilterChecklistLarge,
  FilterContentTypes.CatalogFilterRange,
  FilterContentTypes.CatalogFilterSort,
  FilterContentTypes.CatalogFilterToggle,
];

export const filterRange = {
  currentMax: null,
  currentMin: null,
  id: 'price',
  label: 'Price',
  maxValue: 349,
  minValue: 49,
  step: 1,
  type: FilterContentTypes.CatalogFilterRange,
  unit: 'UnitUSD',
} as CatalogFilterRange;

export const filterSort = {
  label: 'Sort by',
  id: 'sort',
  type: FilterContentTypes.CatalogFilterSort,
  items: [
    {
      title: 'Best match',
      description: 'Fastest delivery, best ratings and value',
      flair: null,
      id: 'bestMatch',
    },
    {
      title: 'Best Value',
      description: null,
      flair: null,
      id: 'bestValue',
    },
    {
      title: 'Price: Low to High',
      description: null,
      flair: null,
      id: 'priceAsc',
    },
    {
      title: 'Price: High to Low',
      description: null,
      flair: null,
      id: 'priceDesc',
    },
    {
      title: 'Best Seller',
      description: null,
      flair: null,
      id: 'bestSeller',
    },
    {
      title: 'Brand: A-Z',
      description: null,
      flair: null,
      id: 'brandAsc',
    },
    {
      title: 'Brand: Z-A',
      description: null,
      flair: null,
      id: 'brandDesc',
    },
    {
      title: 'Mileage Warranty',
      description: null,
      flair: null,
      id: 'warranty',
    },
    {
      title: 'Highest Rating',
      description: null,
      flair: null,
      id: 'highestRating',
    },
  ],
} as CatalogFilterSort;

export const filterTypeMap: Record<FilterContentTypes, CatalogFilterTypes> = {
  /* eslint-disable sort-keys */
  [FilterContentTypes.CatalogFilterToggle]: {
    label: 'Deals',
    type: FilterContentTypes.CatalogFilterToggle,
  },
  [FilterContentTypes.CatalogFilterSort]: filterSort,
  [FilterContentTypes.CatalogFilterRange]: {
    currentMax: null,
    currentMin: null,
    id: 'warranty',
    label: 'Warranty',
    maxValue: 70_000,
    minValue: 0,
    step: 5_000,
    type: FilterContentTypes.CatalogFilterRange,
    unit: 'UnitMiles',
  },
  [FilterContentTypes.CatalogFilterChecklist]: {
    label: 'Brand',
    type: FilterContentTypes.CatalogFilterChecklist,
    filterGroups: [
      {
        title: null,
        id: 'brandCategory',
        items: [
          {
            title: 'Popular brands',
            id: 'popularBrands',
            flair: null,
            description: 'Fastest delivery, best ratings and value',
            count: 86,
            isSelected: true,
          },
          {
            title: 'Highest rated brands',
            id: 'highestRatedBrands',
            flair: null,
            description: null,
            count: 12,
            isSelected: false,
          },
          {
            title: 'Local brands',
            id: 'localBrands',
            flair: null,
            description: null,
            count: 8,
            isSelected: true,
          },
        ],
      },
      {
        title: 'Featured',
        id: 'brandFeatured',
        items: [
          {
            title: 'Firestone',
            id: 'firestone',
            flair: 'Best seller',
            description: null,
            count: 3,
            isSelected: true,
          },
          {
            title: 'Goodyear',
            id: 'goodyear',
            flair: null,
            description: null,
            count: 4,
            isSelected: false,
          },
          {
            title: 'Nexen',
            id: 'nexen',
            flair: null,
            description: null,
            count: 2,
            isSelected: false,
          },
          {
            title: 'Pirelli',
            id: 'pirelli',
            flair: 'Top rated',
            description: null,
            count: 9,
            isSelected: false,
          },
          {
            title: 'Contintental',
            id: 'contintental',
            flair: null,
            description: null,
            count: 19,
            isSelected: false,
          },
        ],
      },
    ],
  },
  [FilterContentTypes.CatalogFilterChecklistLarge]: {
    label: 'More filters',
    type: FilterContentTypes.CatalogFilterChecklistLarge,
    filterGroups: [
      {
        title: 'Features',
        id: 'features',
        items: [
          {
            title: 'Fuel efficient',
            id: 'fuelEfficient',
            flair: null,
            description:
              'Less rolling resistence, requiring less energy to move',
            count: 2,
            isSelected: false,
          },
          {
            title: 'Run flat',
            id: 'runFlat',
            flair: null,
            description: 'Can run even with a puncture for a limited distance',
            count: 18,
            isSelected: false,
          },
          {
            title: 'Studded',
            id: 'studded',
            flair: null,
            description: 'Made with embedded metal studs for traction on ice',
            count: 58,
            isSelected: true,
          },
          {
            title: 'Studdable',
            id: 'studdable',
            flair: null,
            description: 'Can accept studs for added winter traction',
            count: 19,
            isSelected: false,
          },
        ],
      },
      {
        title: 'Sidewall types',
        id: 'sidewall',
        items: [
          {
            title: 'BW - Black sidewall',
            id: 'bw',
            flair: null,
            description: null,
            count: 2,
            isSelected: false,
          },
          {
            title: 'TL - Tubeless',
            id: 'tl',
            flair: null,
            description: null,
            count: 18,
            isSelected: true,
          },
          {
            title: 'VSB - Vertical Serrated Band',
            id: 'vsb',
            flair: null,
            description: null,
            count: 58,
            isSelected: false,
          },
        ],
      },
    ],
  },
};
const filters = [
  filterTypeMap[FilterContentTypes.CatalogFilterRange],
  filterTypeMap[FilterContentTypes.CatalogFilterToggle],
  filterTypeMap[FilterContentTypes.CatalogFilterChecklist],
  {
    label: 'Tire type',
    type: 'CatalogFilterChecklist',
    filterGroups: [
      {
        title: null,
        id: 'tireType',
        items: [
          {
            title: 'All season',
            id: 'allSeason',
            flair: 'Civic standard',
            description: 'Most common: Googlehandle on dry, wet or snow',
            count: 86,
            isSelected: false,
          },
          {
            title: 'Winter',
            id: 'winter',
            flair: null,
            description: 'For snow, ice, and freezing temperatures',
            count: 12,
            isSelected: true,
          },
          {
            title: 'Summer',
            id: 'summer',
            flair: null,
            description: 'For dry roads and warm, arid climates',
            count: 8,
            isSelected: false,
          },
          {
            title: 'Performance',
            id: 'performance',
            flair: null,
            description: 'For sport/luxury vehicles and high-speed handling',
            count: 4,
            isSelected: false,
          },
          {
            title: 'Racing',
            id: 'racing',
            flair: null,
            description: 'Maximum traction for competition',
            count: 3,
            isSelected: false,
          },
          {
            title: 'Touring',
            id: 'touring',
            flair: null,
            description: 'For durability and smooth long rides',
            count: 12,
            isSelected: false,
          },
        ],
      },
    ],
  },
  {
    label: 'Load',
    type: 'CatalogFilterChecklist',
    groups: [
      {
        title: 'Range',
        id: 'range',
        items: [
          {
            title: 'SL - Standard Load',
            id: 'sl',
            flair: null,
            description: null,
            count: '96',
            isSelected: false,
          },
          {
            title: 'XL - Standard Load',
            id: 'xl',
            flair: null,
            description: null,
            count: '35',
            isSelected: false,
          },
          {
            title: 'B',
            id: 'b',
            flair: null,
            description: null,
            count: '98',
            isSelected: false,
          },
          {
            title: 'RE',
            id: 're',
            flair: null,
            description: null,
            count: '8',
            isSelected: false,
          },
        ],
      },
      {
        title: 'Index',
        id: 'index',
        items: [
          {
            title: '91 – 1356 lbs',
            id: '91_1356',
            flair: 'Civic standard',
            description: null,
            count: 86,
            isSelected: false,
          },
          {
            title: '90 - 1323 lbs',
            id: '90_1323',
            flair: null,
            description: null,
            count: 12,
            isSelected: false,
          },
          {
            title: '87-1201 lbs',
            id: '87_1201',
            flair: null,
            description: null,
            count: 22,
            isSelected: false,
          },
        ],
      },
    ],
  },
  filterTypeMap[FilterContentTypes.CatalogFilterChecklistLarge],
];

export default filters as CatalogFilterTypes[];
