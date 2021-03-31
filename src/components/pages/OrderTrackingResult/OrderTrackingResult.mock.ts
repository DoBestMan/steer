import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export const orderAddressMock = {
  cityName: 'Brooklyn',
  line1: '244 Water St',
  line2: '5th Floor',
  stateAbbr: 'NY',
  zip: '11201',
};

export const orderShippingStageListMock = [
  {
    displayName: 'Order received',
    isCompleted: true,
    name: 'pending',
    note: null,
    orderTrackingNumberList: null,
    sort: 1,
    updatedAt: '2020-06-10T12:00:00Z',
  },
  {
    displayName: 'Ready to pickup',
    isCompleted: true,
    name: 'ready',
    note: 'Shipments can be split in transit AND/OR have two bound tires.',
    orderTrackingNumberList: null,
    sort: 2,
    updatedAt: '2020-06-10T12:00:00Z',
  },
  {
    displayName: 'Order processed',
    isCompleted: true,
    name: 'scheduled',
    note: 'Shipments can be split in transit AND/OR have two bound tires.',
    orderTrackingNumberList: null,
    sort: 3,
    updatedAt: '2020-06-10T12:00:00Z',
  },
  {
    displayName: 'In transit',
    isCompleted: false,
    name: 'transit',
    note: null,
    orderTrackingNumberList: [
      {
        trackingNumber: '12345',
        shippingMethod: 'FedEx',
        status: 'Delivered',
        trackingLink: {
          href: 'https://www.google.com',
          isExternal: true,
        },
      },
      {
        trackingNumber: '54321',
        shippingMethod: 'FedEx',
        status: 'Shipped',
        trackingLink: {
          href: 'https://www.google.com',
          isExternal: true,
        },
      },
    ],
    sort: 4,
    updatedAt: '2020-06-10T12:00:00Z',
  },
];

export const orderAppointmentMock = {
  date: new Date(),
  endTime: '13:00:00',
  installerAddress: {
    addressLine1: '244 Water St',
    addressLine2: null,
    city: 'Brooklyn',
    company: 'Pep Boys',
    state: 'NY',
    zip: '11201',
  },
  note: 'Do not arrive early',
  startTime: '11:00:00',
  timeSlot: 'Morning Drop-off',
};

export const orderItemsMock = [
  {
    canCustomerReorder: true,
    id: 115189,
    image: {
      altText: 'Tire sidewall',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidetread_f24ld3.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 543,
    } as SiteImage,
    name: 'Bridgestone Dueler A/T Revo 2 - P215/75R16 - 001311',
    quantity: 2,
  },
  {
    canCustomerReorder: false,
    id: 128451,
    image: {
      altText: 'Tire sidewall',
      height: 800,
      src:
        'https://images.simpletire.com/image/upload/v1590590461/playground/mich-sidewall-v1_hpb7aj.png',
      type: ICON_IMAGE_TYPE.IMAGE,
      width: 800,
    } as SiteImage,
    name: 'Bridgestone Dueler A/T Revo 2 - P215/75R16 - 001311',
    quantity: 4,
  },
];
