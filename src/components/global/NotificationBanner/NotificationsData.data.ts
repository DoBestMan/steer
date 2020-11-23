import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteIcon } from '~/data/models/SiteIcon';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

const mockSvg = {
  svgId: ICONS.TAG,
  type: ICON_IMAGE_TYPE.ICON,
} as SiteIcon;

export const NotificationsData = [
  {
    icon: mockSvg,
    id: '10411',
    labelLink: {
      label: 'Learn more',
      link: {
        href: '/',
        isExternal: false,
      },
    },
    subtext: 'Up to 50% off tires!  Act early and avoid the rush.',
    suppressFromHomePage: false,
    title: 'Early Bird Sale',
    type: 'Sale',
  },
  {
    icon: mockSvg,
    id: '10412',
    labelLink: {
      label: 'Learn more',
      link: {
        href: '/',
        isExternal: false,
      },
    },
    subtext: 'Up to 50% off thousands of tires, while stocks last.',
    suppressFromHomePage: false,
    title: 'Black Friday Sale',
    type: 'Sale',
  },
  {
    icon: mockSvg,
    id: '10413',
    labelLink: {
      label: 'Learn more',
      link: {
        href: '/tire-deals/black-friday-sale',
        isExternal: false,
      },
    },
    subtext: 'Up to 50% off thousands of tires, while stocks last.',
    suppressFromHomePage: false,
    title: 'Cyber Weekend Sale',
    type: 'Sale',
  },
  {
    icon: mockSvg,
    id: '10414',
    labelLink: {
      label: 'Learn more',
      link: {
        href: '/',
        isExternal: false,
      },
    },
    subtext: 'Up to 50% off thousands of tires, while stocks last.',
    suppressFromHomePage: false,
    title: 'Cyber Monday Sale',
    type: 'Sale',
  },
  {
    icon: mockSvg,
    id: '10415',
    subtext: 'We recommend you use Chrome or Firefox for the best experience.',
    suppressFromHomePage: false,
    title: 'Internet Explorer not supported',
    type: 'System',
  },
  {
    icon: mockSvg,
    id: '10416',
    subtext: 'We recommend you use Chrome or Firefox for the best experience.',
    suppressFromHomePage: false,
    title: 'Delay in Shipping',
    type: 'System',
  },
  {
    icon: mockSvg,
    id: '10417',
    subtext: 'We recommend you use Chrome or Firefox for the best experience.',
    suppressFromHomePage: false,
    title: 'Delay in Shipping',
    type: 'System',
  },
];
