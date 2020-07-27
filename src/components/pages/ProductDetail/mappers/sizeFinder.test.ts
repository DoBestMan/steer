import { siteProductMock } from './ProductDetail.mock';
import { mapDataToSizeFinder } from './sizeFinder';

describe('pages/ProductDetails/mappers/sizeFinder', () => {
  it('returns parsed size finder props', () => {
    expect(
      mapDataToSizeFinder({
        siteProduct: siteProductMock,
        tireSize: 'p195-45r16',
      }),
    ).toMatchObject({
      sizes: [
        {
          isFitForCurrentVehicle: false,
          isSelected: false,
          loadSpeedRating: '89H',
          priceInCents: '5999',
          rim: 15,
          siteQueryParams: { tireSize: '100-40r15' },
          size: '100/40R15',
          specList: [
            { label: 'UTQG', value: '700 AB' },
            { label: 'Sidewall', value: 'BW' },
            { label: 'Part Nr.', value: '15498150000' },
          ],
        },
        {
          isFitForCurrentVehicle: true,
          isSelected: false,
          loadSpeedRating: '89H',
          priceInCents: '6999',
          rim: 17,
          siteQueryParams: { tireSize: '100-40r17' },
          size: '100/40R17',
          specList: [
            { label: 'UTQG', value: '700 AB' },
            { label: 'Sidewall', value: 'BW' },
            { label: 'Part Nr.', value: '15498150000' },
          ],
        },
        {
          isFitForCurrentVehicle: false,
          isSelected: false,
          loadSpeedRating: '89H',
          priceInCents: '4999',
          rim: 17,
          siteQueryParams: { tireSize: '200-40r17' },
          size: '200/40R17',
          specList: [
            { label: 'UTQG', value: '700 AB' },
            { label: 'Sidewall', value: 'BW' },
            { label: 'Part Nr.', value: '15498150000' },
          ],
        },
      ],
      value: 'p195-45r16',
    });
  });
});
