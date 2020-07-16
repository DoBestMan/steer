import { SIZE_CHECK_STATES } from '~/components/modules/PDP/Insights/Insights.types';

import { mapDataToInsights } from './insights';
import {
  routerMock,
  routerWithTireSizeMock,
  searchContextMock,
  siteProductMock,
  userPersonalizationContextMock,
} from './ProductDetail.mock';

const { vehicle } = userPersonalizationContextMock;

describe('pages/ProductDetails/mappers/insights', () => {
  it('returns parsed insights props', () => {
    expect(
      mapDataToInsights({
        siteProduct: siteProductMock,
        router: routerWithTireSizeMock,
        userPersonalization: userPersonalizationContextMock,
        search: searchContextMock,
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
        userPersonalization: {
          ...userPersonalizationContextMock,
          vehicle: null,
        },
        search: searchContextMock,
      }),
    ).toMatchObject({
      sizeCheckState: SIZE_CHECK_STATES.UNKNOWN,
      vehicle: null,
      showFitBar: false,
    });
  });

  it('returns insights props with no vehicle information', () => {
    expect(
      mapDataToInsights({
        siteProduct: siteProductMock,
        router: routerWithTireSizeMock,
        userPersonalization: {
          ...userPersonalizationContextMock,
          vehicle: null,
        },
        search: searchContextMock,
      }),
    ).toMatchObject({
      sizeCheckState: SIZE_CHECK_STATES.UNKNOWN,
      vehicle: null,
      showFitBar: true,
    });
  });

  it('returns insights props that does not fit the vehicle', () => {
    expect(
      mapDataToInsights({
        siteProduct: siteProductMock,
        router: routerWithTireSizeMock,
        userPersonalization: userPersonalizationContextMock,
        search: searchContextMock,
      }),
    ).toMatchObject({
      sizeCheckState: SIZE_CHECK_STATES.DOES_NOT_FIT,
      showFitBar: true,
      vehicle: `${vehicle?.vehicleMake} ${vehicle?.vehicleModel} ${vehicle?.vehicleYear} ${vehicle?.vehicleTrim}`,
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
        userPersonalization: userPersonalizationContextMock,
        search: searchContextMock,
      }),
    ).toMatchObject({
      sizeCheckState: SIZE_CHECK_STATES.SIZE_FITS,
      showFitBar: true,
      vehicle: `${vehicle?.vehicleMake} ${vehicle?.vehicleModel} ${vehicle?.vehicleYear} ${vehicle?.vehicleTrim}`,
    });
  });
});
