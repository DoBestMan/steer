import { SiteBrandDetailsGroups } from '~/data/models/SiteBrandDetails';

import { convertGroupsToAccordionItems } from './accordionItems';

const mockGroups: SiteBrandDetailsGroups[] = [
  {
    sections: [
      {
        links: [
          {
            label: '4x4 Contact',
            link: {
              href: '/about',
              isExternal: false,
            },
            type: 'SiteLinkWithLabel',
          },
          {
            label: 'ContiCross Contact ATR',
            link: {
              href: '/about',
              isExternal: false,
            },
            type: 'SiteLinkWithLabel',
          },
        ],
        title: 'Popular',
      },
    ],
    title: 'Passenger',
  },
  {
    sections: [
      {
        links: [
          {
            label: '4x4 Contact',
            link: {
              href: '/about',
              isExternal: false,
            },
            type: 'SiteLinkWithLabel',
          },
          {
            label: 'ContiCross Contact ATR',
            link: {
              href: '/about',
              isExternal: false,
            },
            type: 'SiteLinkWithLabel',
          },
        ],
        title: 'Popular',
      },
      {
        links: [
          {
            label: '4x4 Contact',
            link: {
              href: '/about',
              isExternal: false,
            },
            type: 'SiteLinkWithLabel',
          },
          {
            label: 'ContiCross Contact ATR',
            link: {
              href: '/about',
              isExternal: false,
            },
            type: 'SiteLinkWithLabel',
          },
        ],
        title: 'Offroad',
      },
    ],
    title: 'Light Truck',
  },
];

describe('convertGroupsToAccordionItems', () => {
  it('returns accordionItems from groups', () => {
    expect(convertGroupsToAccordionItems(mockGroups)).toStrictEqual([
      {
        label: 'Passenger',
        content:
          '** Popular**\n\n [4x4 Contact](/about)\n\n [ContiCross Contact ATR](/about)\n\n',
      },
      {
        label: 'Light Truck',
        content:
          '** Popular**\n\n [4x4 Contact](/about)\n\n [ContiCross Contact ATR](/about)\n\n** Offroad**\n\n [4x4 Contact](/about)\n\n [ContiCross Contact ATR](/about)\n\n',
      },
    ]);
  });
});
