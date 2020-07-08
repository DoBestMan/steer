import { siteProductMock } from './ProductDetail.mock';
import { mapDataToRecirculation } from './recirculation';

describe('pages/ProductDetails/mappers/recirculation', () => {
  it('returns parsed recirculation props', () => {
    expect(
      mapDataToRecirculation({
        siteProduct: siteProductMock,
      }),
    ).toStrictEqual(siteProductMock.siteProductRecirculation);
  });
});
