import { SiteCatalogBrand } from '~/data/models/SiteCatalogBrand';
import { SiteCatalogProductImage } from '~/data/models/SiteCatalogProductImage';

export const mockMyOrdersCancellable = {
  listResultMetadata: {
    noExactMatch: false,
    pagination: { total: 4, resultsPerPage: 10, offset: 0 },
  },
  userOrders: [
    {
      canUserCancelOrder: true,
      created: new Date('2018-03-14 17:40:47'),
      orderAppointment: {
        date: new Date('2018-03-21'),
        endTime: '11:00:00',
        installerAddress: {
          addressLine1: '1000 Tierra del Rey',
          addressLine2: null,
          city: 'Chula Vista',
          company: 'Pep Boys',
          phone: '6192164604',
          state: 'CA',
          zip: '91910',
        },
        note:
          'Do not arrive at the installer before their scheduled appointment',
        startTime: '10:00:00',
        timeSlot: '',
      },
      orderId: '12345',
      orderProducts: [
        {
          brand: {
            image: {
              altText: 'Nankang',
              height: 200,
              src:
                'https://images.simpletire.com/images/manf-logos/65b/nankang.svg',
              type: 'SiteImage',
              width: 500,
            },
            label: 'Nankang',
          } as SiteCatalogBrand,
          extendedPrice: 491.92,
          imageList: [
            {
              image: {
                altText: 'Tire Sidetread',
                height: 800,
                src:
                  'https://images.simpletire.com/images/line-images/1880/1880-sidetread/nankang-sp-7.png',
                type: 'SiteImage',
                width: 800,
              },
              productImageType: 'sidetread',
              type: 'SiteCatalogProductImage',
            },
          ] as Array<SiteCatalogProductImage>,
          loadRange: 'XL',
          loadSpeedRating: '110V',
          model: 'SP-7',
          partNumber: '24976001',
          price: 122.98,
          productId: 122209,
          quantity: 4,
          size: '285/40R22',
        },
      ],
      shippingCarriers: [
        {
          carrierImage: null,
          carrierName: 'Fedex',
        },
        {
          carrierImage: null,
          carrierName: 'Fedex',
        },
        {
          carrierImage: null,
          carrierName: 'Fedex',
        },
        {
          carrierImage: null,
          carrierName: 'Fedex',
        },
      ],
      shippingZip: '91910',
      status: 'Delivered',
      total: '467.32',
    },
  ],
};

export const mockMyOrders = {
  listResultMetadata: mockMyOrdersCancellable.listResultMetadata,
  userOrders: [
    {
      ...mockMyOrdersCancellable.userOrders[0],
      canUserCancelOrder: false,
      status: 'Cancellation in progress',
    },
  ],
};
