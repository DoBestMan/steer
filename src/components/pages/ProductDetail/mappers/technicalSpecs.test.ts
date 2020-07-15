import { routerMock, siteProductMock } from './ProductDetail.mock';
import { mapDataToTechnicalSpecs } from './technicalSpecs';

describe('pages/ProductDetails/mappers/techinicalSpecs', () => {
  it('returns parsed technical specs props', () => {
    expect(
      mapDataToTechnicalSpecs({
        siteProduct: siteProductMock,
        router: routerMock,
      }),
    ).toStrictEqual({
      description:
        "The ContiProContact is Continental's Grand Touring All-Season tire originally developed for European sport coupes and sedans sold in North America, and is now available for a wide range of imported and domestic cars.",
      image: {
        altText: 'Tire treadonly',
        height: 800,
        src:
          'https://images.simpletire.com/image/upload/v1591705546/line-images/1349/1349-treadonly_pa1oew.png',
        type: 'SiteImage',
        width: 800,
      },
      sizes: [
        {
          label: "15''",
          options: [
            {
              label: '100/40R15 89H',
              link: '/brands/continental-tires/dh2?tireSize=100-40r15',
              price: '$59.99',
              specs: [
                {
                  label: 'UTQG',
                  value: '700 AB',
                },
                {
                  label: 'Sidewall',
                  value: 'BW',
                },
                {
                  label: 'Part Nr.',
                  value: '15498150000',
                },
              ],
            },
          ],
        },
        {
          label: "17''",
          options: [
            {
              label: '100/40R17 89H',
              link: '/brands/continental-tires/dh2?tireSize=100-40r17',
              price: '$59.99',
              specs: [
                {
                  label: 'UTQG',
                  value: '700 AB',
                },
                {
                  label: 'Sidewall',
                  value: 'BW',
                },
                {
                  label: 'Part Nr.',
                  value: '15498150000',
                },
              ],
            },
            {
              label: '200/40R17 89H',
              link: '/brands/continental-tires/dh2?tireSize=200-40r17',
              price: '$59.99',
              specs: [
                {
                  label: 'UTQG',
                  value: '700 AB',
                },
                {
                  label: 'Sidewall',
                  value: 'BW',
                },
                {
                  label: 'Part Nr.',
                  value: '15498150000',
                },
              ],
            },
          ],
        },
      ],
      specs: [
        {
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra erat feugiat, sodales sapien non, dictum lacus. Donec a libero.\n\n[Browse All Season tires](/catalog/all-season)',
          label: 'Type',
          value: ['All season'],
        },
        {
          content:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean viverra erat feugiat, sodales sapien non, dictum lacus. Donec a libero.',
          label: 'Warranty',
          value: ['55,000 miles'],
        },
      ],
    });
  });
});
