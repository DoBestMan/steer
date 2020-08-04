import {
  mockListResultMetadata,
  mockTireRatings,
} from '~/components/modules/ReviewListing/RatingsTable/RatingsTable.mocks';

export const mockReviewListing = {
  body:
    'All-season or winter tires? Goodyear or Bridgestone? Get the answers you need here.\n\n Hidden text here.',
  breadcrumbs: [
    {
      label: 'Home',
      url: '/',
    },
    {
      currentPath: true,
      label: 'Tire reviews',
      url: '/tire-reviews',
    },
  ],
  filters: [
    {
      label: 'Brand',
      id: 'brand',
      filterGroups: [
        {
          title: 'Featured',
          id: 'brandFeatured',
          items: [
            {
              count: 3,
              description: null,
              flair: 'Best seller',
              id: 'firestone',
              isSelected: false,
              link: {
                href: '/firestone',
                isExternal: false,
              },
              title: 'Firestone',
            },
            {
              count: 4,
              description: null,
              flair: null,
              id: 'goodyear',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Goodyear',
            },
            {
              count: 2,
              description: null,
              flair: null,
              id: 'nexen',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Nexen',
            },
            {
              count: 3,
              description: null,
              flair: 'Top rated',
              id: 'pirelli',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Pirelli',
            },
            {
              count: 1,
              description: null,
              flair: null,
              id: 'michelin',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Michelin',
            },
            {
              count: 19,
              description: null,
              flair: null,
              id: 'contintental',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Contintental',
            },
          ],
        },
        {
          title: 'All',
          id: 'brandAll',
          items: [
            {
              count: 3,
              description: null,
              flair: null,
              id: 'accelera',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Accelera',
            },
            {
              count: 4,
              description: null,
              flair: null,
              id: 'achilles',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Achilles',
            },
            {
              count: 2,
              description: null,
              flair: null,
              id: 'aderenza',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Aderenza',
            },
            {
              count: 9,
              description: null,
              flair: null,
              id: 'atyreAdvance',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Atyre Advance',
            },
          ],
        },
      ],
    },
    {
      id: 'tireType',
      label: 'Tire Type',
      filterGroups: [
        {
          title: null,
          id: 'tireType',
          items: [
            {
              count: 86,
              description: null,
              flair: null,
              id: 'atvutv',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'ATV/UTV',
            },
            {
              count: 34,
              description: null,
              flair: null,
              id: 'antique',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Antique',
            },
            {
              count: 34,
              description: null,
              flair: null,
              id: 'commercial',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Commercial',
            },
            {
              count: 34,
              description: null,
              flair: null,
              id: 'farm',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Farm',
            },
            {
              count: 34,
              description: null,
              flair: null,
              id: 'golf',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Golf',
            },
            {
              count: 19,
              description: null,
              flair: null,
              id: 'industrial',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Industrial',
            },
          ],
        },
      ],
    },
    {
      id: 'tireCategory',
      label: 'Tire Category',
      filterGroups: [
        {
          title: null,
          id: 'tireCategory',
          items: [
            {
              count: 86,
              description: null,
              flair: null,
              id: 'allSeason',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'All season',
            },
            {
              count: 34,
              description: null,
              flair: null,
              id: 'allTerrain',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'All Terrain',
            },
            {
              count: 34,
              description: null,
              flair: null,
              id: 'highway',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Highway',
            },
            {
              count: 34,
              description: null,
              flair: null,
              id: 'mudTerrain',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Mud Terrain',
            },
            {
              count: 34,
              description: null,
              flair: null,
              id: 'performance',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Performance',
            },
            {
              count: 134,
              description: null,
              flair: null,
              id: 'summer',
              isSelected: false,
              link: {
                href: '/',
                isExternal: false,
              },
              title: 'Summer',
            },
          ],
        },
      ],
    },
  ],
  listResultMetadata: mockListResultMetadata,
  ratings: mockTireRatings,
  title: 'Tire Reviews',
};
