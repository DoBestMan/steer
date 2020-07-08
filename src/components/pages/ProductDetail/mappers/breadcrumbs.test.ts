import { mapDataToBreadcrumbs } from './breadcrumbs';
import { routerMock, siteProductMock } from './ProductDetail.mock';

describe('pages/ProductDetails/mappers/breadcrumbs', () => {
  it('returns parsed breadcrumbs props', () => {
    expect(
      mapDataToBreadcrumbs({
        siteProduct: siteProductMock,
        router: routerMock,
      }),
    ).toStrictEqual([
      { label: 'Home', url: '/' },
      { label: 'All brands', url: '/brands' },
      { label: 'Achilles', url: '/brands/continental-tires' },
      { currentPath: true, label: 'DH2', url: '/brands/continental-tires/dh2' },
    ]);
  });
});
