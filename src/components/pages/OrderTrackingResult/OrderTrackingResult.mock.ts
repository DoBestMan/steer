import { SiteImage } from '~/data/models/SiteImage';
import { SiteLink } from '~/data/models/SiteLink';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export const orderTrackingLinkMock = {
  href: 'https://account.simpletire.com/orders/111111111111',
  isExternal: true,
} as SiteLink;

export const orderAddressMock = {
  cityName: 'Brooklyn',
  line1: '244 Water St',
  line2: '5th Floor',
  stateAbbr: 'NY',
  zip: '11201',
};

export const orderItemsMock = [
  {
    name: 'Bridgestone Dueler A/T Revo 2 - P215/75R16 - 001311',
    image: {
      altText: 'Tire sidewall',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidetread_f24ld3.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 543,
    } as SiteImage,
    quantity: 2,
  },
  {
    name: 'Bridgestone Dueler A/T Revo 2 - P215/75R16 - 001311',
    image: {
      altText: 'Tire sidewall',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 800,
    } as SiteImage,
    quantity: 4,
  },
  {
    name: 'Bridgestone Dueler A/T Revo 2 - P215/75R16 - 001311',
    image: {
      altText: 'Tire sidewall',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidetread_f24ld3.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 543,
    } as SiteImage,
    quantity: 2,
  },
];
