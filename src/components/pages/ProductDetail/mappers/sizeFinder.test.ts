import { siteProductMock } from './ProductDetail.mock';
import { mapDataToSizeFinder } from './sizeFinder';

describe('pages/ProductDetails/mappers/sizeFinder', () => {
  it('returns parsed size finder props', () => {
    expect(
      mapDataToSizeFinder({
        currentSizeIndex: -1,
        siteProduct: siteProductMock,
      }),
    ).toEqual({
      currentIndex: 2,
      sizes: siteProductMock.siteProductLineAvailableSizeList,
    });
  });

  it('returns null in case of front and rear', () => {
    expect(
      mapDataToSizeFinder({
        currentSizeIndex: -1,
        isFrontAndRear: true,
        siteProduct: siteProductMock,
      }),
    ).toBeNull();
  });

  it('returns null in case of missing size list', () => {
    expect(
      mapDataToSizeFinder({
        currentSizeIndex: -1,
        isFrontAndRear: true,
        siteProduct: {
          ...siteProductMock,
          siteProductLineAvailableSizeList: [],
        },
      }),
    ).toBeNull();
  });
});
