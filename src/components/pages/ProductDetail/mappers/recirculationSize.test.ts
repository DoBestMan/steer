import { siteProductMock } from './ProductDetail.mock';
import { mapDataToRecirculationSize } from './recirculationSize';

const routerMock = {
  pathname: '/brands/[brandName]/[productLine]',
  query: {
    brandName: 'continental-tires',
    productLine: 'dh2',
  },
} as any;

describe('pages/ProductDetails/mappers/recirculationSize', () => {
  it('returns null in case of product line page (no size', () => {
    expect(
      mapDataToRecirculationSize({
        siteProduct: siteProductMock,
        router: routerMock,
      }),
    ).toBeNull();
  });

  it('returns parsed recirculation size props', () => {
    expect(
      mapDataToRecirculationSize({
        siteProduct: siteProductMock,
        router: {
          ...routerMock,
          query: {
            ...routerMock.query,
            tireSize: 'p195-45r16',
          },
        },
      }),
    ).toStrictEqual({
      label: 'See all tires in the size 215/50 R17',
      url: '/tire-sizes/p195-45r16',
    });
  });

  it('returns parsed recirculation size and rear props', () => {
    expect(
      mapDataToRecirculationSize({
        siteProduct: siteProductMock,
        router: {
          ...routerMock,
          query: {
            ...routerMock.query,
            tireSize: 'p195-45r16',
            rearSize: 'p195-45r19',
          },
        },
      }),
    ).toStrictEqual({
      label: 'See all tires in front 215/50 R17 and rear 215/50 R19',
      url: '/tire-sizes/p195-45r16?rear=p195-45r19',
    });
  });
});
