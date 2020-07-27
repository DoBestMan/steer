import { mapDataToBreadcrumbs } from './breadcrumbs';
import { routerMock, siteProductMock } from './ProductDetail.mock';

describe('pages/ProductDetails/mappers/breadcrumbs', () => {
  it('returns parsed breadcrumbs props', () => {
    expect(
      mapDataToBreadcrumbs({
        siteProduct: {
          ...siteProductMock,
          siteProductLineSizeDetail: null,
          siteProductLineRearSizeDetail: null,
        },
        router: routerMock,
      }),
    ).toStrictEqual([
      { label: 'Home', url: '/' },
      { label: 'All brands', url: '/brands' },
      { label: 'Achilles', url: '/brands/continental-tires' },
      { currentPath: true, label: 'DH2', url: '/brands/continental-tires/dh2' },
    ]);
  });

  it('returns parsed breadcrumbs props with size selected', () => {
    expect(
      mapDataToBreadcrumbs({
        siteProduct: {
          ...siteProductMock,
          siteProductLineRearSizeDetail: null,
        },
        router: {
          ...routerMock,
          asPath: `${routerMock.asPath}#tireSize=100-20r`,
        },
      }),
    ).toStrictEqual([
      { label: 'Home', url: '/' },
      { label: 'All brands', url: '/brands' },
      { label: 'Achilles', url: '/brands/continental-tires' },
      { label: 'DH2', url: '/brands/continental-tires/dh2' },
      {
        currentPath: true,
        label: '215/50 R17 91H',
        url: '/brands/continental-tires/dh2#tireSize=100-20r',
      },
    ]);
  });

  it('returns parsed breadcrumbs props with rear and front sizes selected', () => {
    expect(
      mapDataToBreadcrumbs({
        siteProduct: siteProductMock,
        router: {
          ...routerMock,
          asPath: `${routerMock.asPath}#tireSize=100-20r&rearSize=200-20r`,
        },
      }),
    ).toStrictEqual([
      { label: 'Home', url: '/' },
      { label: 'All brands', url: '/brands' },
      { label: 'Achilles', url: '/brands/continental-tires' },
      { label: 'DH2', url: '/brands/continental-tires/dh2' },
      {
        currentPath: true,
        label: '215/50 R17 91H + 215/50 R19 91J',
        url: '/brands/continental-tires/dh2#tireSize=100-20r&rearSize=200-20r',
      },
    ]);
  });
});
