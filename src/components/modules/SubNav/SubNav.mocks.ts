import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteIcon } from '~/data/models/SiteIcon';
import { SiteMenuBrowseGroupItem } from '~/data/models/SiteMenuBrowseGroupItem';
import { SiteMenuBrowseItem } from '~/data/models/SiteMenuBrowseItem';
import { SiteMenuLearn } from '~/data/models/SiteMenuLearn';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

/* eslint-disable sort-keys */
const subnav = {
  siteMenuBrowseList: [
    {
      title: 'Brand',
      icon: null,
      siteMenuBrowseGroupList: [
        {
          header: null,
          items: [
            {
              label: 'Firestone',
              link: { href: '/firestone', isExternal: false },
              flair: { type: 'string', value: 'Best seller' },
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
            {
              label: 'Goodyear',
              link: { href: '/goodyear', isExternal: false },
              flair: null,
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
            {
              label: 'Nexen',
              link: { href: '/nexen', isExternal: false },
              flair: null,
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
            {
              label: 'Pirelli',
              link: { href: '/pirelli', isExternal: false },
              flair: null,
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
            {
              label: 'Michelin',
              link: { href: '/michelin', isExternal: false },
              flair: null,
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
            {
              label: 'Continental',
              link: { href: '/continental', isExternal: false },
              flair: null,
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
          ],
          more: {
            label: 'See all 300 brands',
            flair: null,
            link: { href: '/brands', isExternal: false },
            icon: {
              type: 'SiteImage',
              srcSet: 'https://via.placeholder.com/45',
              altText: '',
            },
          },
        },
      ],
      info: {
        title: 'Did you know?',
        body:
          'A reliable brand is the #1 ask for most drivers. Here you can shop all the most popular brands and discover new ones – all tested, ranked and rated by our customers.',
      },
    },
    {
      title: 'Type',
      icon: null,
      siteMenuBrowseGroupList: [
        {
          header: { title: 'Vehicle type', icon: null },
          items: [
            {
              label: 'Passenger',
              link: { href: '/vehicle/passenger', isExternal: false },
              flair: null,
              icon: { type: 'SiteIcon', svgId: 'vehicle-passenger' },
            },
            {
              label: 'Light trucks',
              link: { href: '/vehicle/light-trucks', isExternal: false },
              flair: null,
              icon: { type: 'SiteIcon', svgId: 'vehicle-light-truck' },
            },
            {
              label: 'Commercial',
              link: { href: '/vehicle/commercial', isExternal: false },
              flair: null,
              icon: { type: 'SiteIcon', svgId: 'vehicle-commercial' },
            },
          ],
          more: {
            label: 'See all 11 vehicle types',
            link: { href: '/vehicles', isExternal: false },
          },
        },
        {
          header: { title: 'Tire category', icon: null },
          items: [
            {
              label: 'Performance',
              link: { href: '/tire-category/performance', isExternal: false },
              flair: null,
              icon: null,
            },
            {
              label: 'All season',
              link: { href: '/tire-category/all-season', isExternal: false },
              flair: null,
              icon: null,
            },
            {
              label: 'Winter',
              link: { href: '/tire-category/winter', isExternal: false },
              flair: null,
              icon: { type: 'SiteIcon', svgId: 'insights-winter' },
            },
          ],
          more: {
            label: 'See all 15 tire categories',
            link: { href: '/tire-category', isExternal: false },
          },
        },
      ],
      info: null,
    },
    {
      title: 'Size',
      icon: null,
      siteMenuBrowseGroupList: [
        {
          header: {
            title: 'Wheel sizes',
            icon: { type: 'SiteIcon', svgId: 'wheel' },
          },
          items: [
            {
              label: '15"',
              link: { href: '/sizes/15-in', isExternal: false },
              flair: null,
              icon: null,
            },
            {
              label: '16"',
              link: { href: '/sizes/16-in', isExternal: false },
              flair: null,
              icon: null,
            },
            {
              label: '17"',
              link: { href: '/sizes/17-in', isExternal: false },
              flair: null,
              icon: null,
            },
          ],
          more: {
            label: 'All wheel sizes',
            link: { href: '/wheel-sizes', isExternal: false },
          },
        },
        {
          header: {
            title: 'Tire sizes',
            icon: { type: 'SiteIcon', svgId: 'tire' },
          },
          items: [
            {
              label: '205/55R16',
              link: { href: '/sizes/205/55R16', isExternal: false },
              flair: null,
              icon: null,
            },
            {
              label: '225/65R17',
              link: { href: '/sizes/225/65R17', isExternal: false },
              flair: null,
              icon: null,
            },
            {
              label: '215/55R17',
              link: { href: '/sizes/215/55R17', isExternal: false },
              flair: null,
              icon: null,
            },
          ],
          more: {
            label: 'All tire sizes',
            link: { href: '/tire-sizes', isExternal: false },
          },
        },
      ],
      info: null,
    },
    {
      title: 'Deals',
      icon: { type: 'SiteIcon', svgId: 'fire' },
      siteMenuBrowseGroupList: [
        {
          header: null,
          items: [
            {
              label: '$100 off on Firestone',
              link: { href: '/firestone', isExternal: false },
              flair: { type: 'SiteIcon', svgId: 'fire' },
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
            {
              label: '$70 off on Goodyear',
              link: { href: '/goodyear', isExternal: false },
              flair: null,
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
            {
              label: '$70 off on Nexen',
              link: { href: '/nexen', isExternal: false },
              flair: null,
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
            {
              label: '$80 off on Pirelli',
              link: { href: '/pirelli', isExternal: false },
              flair: { type: 'SiteIcon', svgId: 'fire' },
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
            {
              label: '$50 off on Michelin',
              link: { href: '/michelin', isExternal: false },
              flair: null,
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
            {
              label: '5% off with military discount',
              flair: null,
              link: { href: '/military-discount', isExternal: false },
              icon: {
                type: 'SiteImage',
                srcSet: 'https://via.placeholder.com/45',
                altText: '',
              },
            },
          ],
          more: {
            label: 'See all 10 deals',
            link: { href: '/deals', isExternal: false },
          },
        },
      ],
      info: null,
    },
  ],
  siteMenuLearn: {
    list: [
      {
        label: 'How SimpleTire works',
        link: { href: '/how-we-work', isExternal: false },
      },
      {
        label: 'Tire maintenance',
        link: { href: '/tire-maintenance', isExternal: false },
      },
      {
        label: 'Tire size calculator',
        link: { href: '/tire-size-calculator', isExternal: false },
      },
      { label: 'FAQs', link: { href: '/faq', isExternal: false } },
    ],
  },
};

// Some of this data is repeated from above, but after
// https://simpletire.atlassian.net/browse/WCS-265 we can remove the duplicates above

const deals: SiteMenuBrowseGroupItem = {
  header: null,
  items: [
    {
      label: '$100 off on Firestone',
      link: { href: '/firestone', isExternal: false },
      flair: { type: 'string', value: 'Best seller' },
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        srcSet: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
    {
      label: '$70 off on Goodyear',
      link: { href: '/goodyear', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        srcSet: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
    {
      label: '$70 off on Nexen',
      link: { href: '/nexen', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        srcSet: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
    {
      label: '$80 off on Pirelli',
      link: { href: '/pirelli', isExternal: false },
      flair: { type: ICON_IMAGE_TYPE.ICON, svgId: 'fire' },
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        srcSet: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
    {
      label: '$50 off on Michelin',
      link: { href: '/michelin', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        srcSet: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
    {
      label: '5% off with military discount',
      flair: null,
      link: { href: '/military-discount', isExternal: false },
      icon: {
        type: ICON_IMAGE_TYPE.IMAGE,
        srcSet: 'https://via.placeholder.com/45',
        altText: '',
      },
    },
  ],
  more: {
    label: 'See all 10 deals',
    link: { href: '/deals', isExternal: false },
  },
};

const vehicleType = {
  header: { title: 'Vehicle type', icon: null },
  items: [
    {
      label: 'Passenger',
      link: { href: '/vehicle/passenger', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.ICON,
        svgId: ICONS.VEHICLE_PASSENGER,
      } as SiteIcon,
    },
    {
      label: 'Light trucks',
      link: { href: '/vehicle/light-trucks', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.ICON,
        svgId: ICONS.VEHICLE_LIGHT_TRUCK,
      } as SiteIcon,
    },
    {
      label: 'Commercial',
      link: { href: '/vehicle/commercial', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.ICON,
        svgId: ICONS.VEHICLE_COMMERCIAL,
      } as SiteIcon,
    },
  ],
  more: {
    label: 'See all 11 vehicle types',
    link: { href: '/vehicles', isExternal: false },
  },
};

const tireCategory = {
  header: { title: 'Tire category', icon: null },
  items: [
    {
      label: 'Performance',
      link: { href: '/tire-category/performance', isExternal: false },
      flair: null,
      icon: null,
    },
    {
      label: 'All season',
      link: { href: '/tire-category/all-season', isExternal: false },
      flair: null,
      icon: null,
    },
    {
      label: 'Winter',
      link: { href: '/tire-category/winter', isExternal: false },
      flair: null,
      icon: {
        type: ICON_IMAGE_TYPE.ICON,
        svgId: ICONS.INSIGHTS_WINTER,
      } as SiteIcon,
    },
  ],
  more: {
    label: 'See all 15 tire categories',
    link: { href: '/tire-category', isExternal: false },
  },
};

const wheelSizes = {
  header: {
    title: 'Wheel sizes',
    icon: { type: ICON_IMAGE_TYPE.ICON, svgId: ICONS.WHEEL } as SiteIcon,
  },
  items: [
    {
      label: '15"',
      link: { href: '/sizes/15-in', isExternal: false },
      flair: null,
      icon: null,
    },
    {
      label: '16"',
      link: { href: '/sizes/16-in', isExternal: false },
      flair: null,
      icon: null,
    },
    {
      label: '17"',
      link: { href: '/sizes/17-in', isExternal: false },
      flair: null,
      icon: null,
    },
  ],
  more: {
    label: 'All wheel sizes',
    link: { href: '/wheel-sizes', isExternal: false },
  },
};

export const browseTiresGroupItems = {
  deals,
  vehicleType,
  tireCategory,
  wheelSizes,
};

export default subnav as {
  siteMenuBrowseList: SiteMenuBrowseItem[];
  siteMenuLearn: SiteMenuLearn;
};
