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
    canCustomerCancelReturn: false,
    canCustomerReorder: true,
    canCustomerReturn: false,
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
    canCustomerCancelReturn: false,
    canCustomerReorder: false,
    canCustomerReturn: false,
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

export const orderItemMock = {
  canCustomerCancelReturn: false,
  canCustomerReorder: false,
  canCustomerReturn: false,
  id: 22,
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
};

export const returnReasonsMock = [
  {
    canAddComment: false,
    canUploadImage: false,
    id: 1,
    reasonName: 'Tires were not delivered in time',
    terms:
      'Returns are accepted within 30 days of delivery. Only unused tires that have not been mounted or driven on are eligible for return. Once we receive the tires back in our warehouse we will issue a full refund',
  },
  {
    canAddComment: false,
    canUploadImage: false,
    id: 2,
    reasonName: 'Tires are not the quality I expected',
    terms:
      'Returns are accepted within 30 days of delivery. Only unused tires that have not been mounted or driven on are eligible for return. Once we receive the tires back in our warehouse we will issue a full refund',
  },
  {
    canAddComment: false,
    canUploadImage: false,
    id: 3,
    reasonName: 'I ordered the wrong size/model',
    terms:
      'Returns are accepted within 30 days of delivery. Only unused tires that have not been mounted or driven on are eligible for return. Once we receive the tires back in our warehouse we will issue a full refund (minus a $15 per tire handling fee) back to the original form of payment. If you ordered the wrong size, don’t panic. We won’t charge a handling fee if you place a new order with us for the correct size.',
  },
  {
    canAddComment: false,
    canUploadImage: false,
    id: 4,
    reasonName: 'I found the tires for a better price elsewhere',
    terms:
      'Returns are accepted within 30 days of delivery. Only unused tires that have not been mounted or driven on are eligible for return. Once we receive the tires back in our warehouse we will issue a full refund (minus a $15 per tire handling fee) back to the original form of payment. If you ordered the wrong size, don’t panic. We won’t charge a handling fee if you place a new order with us for the correct size.',
  },
  {
    canAddComment: true,
    canUploadImage: true,
    id: 5,
    reasonName: 'I’m unhappy with the DOT code listed on the tire',
    terms:
      'Returns are accepted within 30 days of delivery. Only unused tires that have not been mounted or driven on are eligible for return. One of our Customer Care Representatives will reach out to you for more information regarding your claim.',
  },
  {
    canAddComment: true,
    canUploadImage: true,
    id: 6,
    reasonName: 'I received the incorrect tires',
    terms:
      'Returns are accepted within 30 days of delivery. Only unused tires that have not been mounted or driven on are eligible for return. One of our Customer Care Representatives will reach out to you for more information regarding your claim.',
  },
  {
    canAddComment: true,
    canUploadImage: true,
    id: 7,
    reasonName: 'My tires have a manufacturer’s defect',
    terms:
      'Returns are accepted within 30 days of delivery. Only unused tires that have not been mounted or driven on are eligible for return. One of our Customer Care Representatives will reach out to you for more information regarding your claim.',
  },
];

export const cancelReturnRequestMock = {
  body: {
    attachedImages: [],
    comment: 'testomg',
    quantity: 1,
    reasonId: 1,
  },
  orderId: '123',
  productId: '123',
  type: 'return',
  zip: '123',
};

export const getReturnReasonsMock = {
  ...orderItemMock,
  zip: '123',
  orderId: '123',
};
