import { mapDataToInsights } from './insights';
import {
  routerMock,
  routerWithTireSizeMock,
  siteProductMock,
} from './ProductDetail.mock';

const vehicleMetadata = {
  vehicleYear: '2019',
  vehicleMake: 'Honda',
  vehicleModel: 'Civic',
  vehicleTrim: 'Sport Sedan & Coupe',
};

describe('pages/ProductDetails/mappers/insights', () => {
  it('returns parsed insights props', () => {
    expect(
      mapDataToInsights({
        siteProduct: siteProductMock,
        router: routerWithTireSizeMock,
      }),
    ).toMatchObject({
      delivery: 'Free 2-day shipping to Brooklyn, NY',
      insightItems: [
        {
          label: 'Best seller for Honda Civic',
          icon: { type: 'SiteIcon', svgId: 'fire' },
          sectionAnchor: null,
        },
      ],
      rebate: {
        label: 'Save $80 instantly: Use coupon AS23RJ',
        siteDynamicModal: expect.objectContaining({
          title: '$80 Rebate',
        }),
      },
      techSpecsAnchor: 'SiteProductSpecs',
    });
  });

  it('returns insights props with no fitting information', () => {
    expect(
      mapDataToInsights({
        siteProduct: {
          ...siteProductMock,
          siteProductLineSizeDetail: null,
        },
        router: routerMock,
      }),
    ).toMatchObject({
      doesItFit: null,
      vehicle: null,
      showFitBar: false,
    });
  });

  it('returns insights props with no vehicle information', () => {
    expect(
      mapDataToInsights({
        siteProduct: siteProductMock,
        router: routerWithTireSizeMock,
      }),
    ).toMatchObject({
      doesItFit: false,
      vehicle: null,
      showFitBar: true,
    });
  });

  it('returns insights props that does not fit the vehicle', () => {
    expect(
      mapDataToInsights({
        siteProduct: siteProductMock,
        router: routerWithTireSizeMock,
        vehicleMetadata: {
          vehicleYear: '2019',
          vehicleMake: 'Honda',
          vehicleModel: 'Civic',
          vehicleTrim: 'Sport Sedan & Coupe',
        },
      }),
    ).toMatchObject({
      showFitBar: true,
      doesItFit: false,
      vehicle: `${vehicleMetadata.vehicleMake} ${vehicleMetadata.vehicleModel} ${vehicleMetadata.vehicleYear} ${vehicleMetadata.vehicleTrim}`,
    });
  });

  it('returns insights props that fits the vehicle', () => {
    expect(
      mapDataToInsights({
        siteProduct: siteProductMock,
        router: {
          ...routerWithTireSizeMock,
          query: {
            ...routerWithTireSizeMock.query,
            tireSize: '100-40r17',
          },
        },
        vehicleMetadata: {
          vehicleYear: '2019',
          vehicleMake: 'Honda',
          vehicleModel: 'Civic',
          vehicleTrim: 'Sport Sedan & Coupe',
        },
      }),
    ).toMatchObject({
      showFitBar: true,
      doesItFit: true,
      vehicle: `${vehicleMetadata.vehicleMake} ${vehicleMetadata.vehicleModel} ${vehicleMetadata.vehicleYear} ${vehicleMetadata.vehicleTrim}`,
    });
  });
});
