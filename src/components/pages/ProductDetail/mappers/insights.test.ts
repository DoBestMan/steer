import { SIZE_CHECK_STATES } from '~/components/modules/PDP/Insights/Insights.types';

import { mapDataToInsights } from './insights';
import {
  productDetailContextMock,
  routerMock,
  siteProductMock,
  userPersonalizationContextMock,
} from './ProductDetail.mock';

const { vehicle } = userPersonalizationContextMock;

describe('pages/ProductDetails/mappers/insights', () => {
  it('returns parsed insights props', () => {
    expect(
      mapDataToInsights({
        isLoadingData: false,
        productDetail: productDetailContextMock,
        router: routerMock,
        siteProduct: siteProductMock,
        tireSize: '100-40r15',
        userPersonalization: userPersonalizationContextMock,
      }),
    ).toMatchObject({
      delivery: 'Free 2-day shipping to Brooklyn, NY',
      insightItems: [
        {
          label: 'Best seller for Honda Civic \nNew line',
          icon: { type: 'SiteIcon', svgId: 'fire' },
          sectionAnchor: null,
        },
        {
          label: 'Best seller for Porsche Carrera GT \nNew line',
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
        isLoadingData: false,
        productDetail: productDetailContextMock,
        router: routerMock,
        siteProduct: {
          ...siteProductMock,
          siteProductLineSizeDetail: null,
        },
        tireSize: '100-40r17',
        userPersonalization: {
          ...userPersonalizationContextMock,
          vehicle: null,
        },
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
        isLoadingData: false,
        productDetail: productDetailContextMock,
        router: routerMock,
        siteProduct: siteProductMock,
        tireSize: '100-40r15',
        userPersonalization: {
          ...userPersonalizationContextMock,
          vehicle: null,
        },
      }),
    ).toMatchObject({
      sizeCheckState: SIZE_CHECK_STATES.UNKNOWN,
      vehicle: null,
      showFitBar: true,
    });
  });

  it('returns insights props with empty vehicle information object', () => {
    expect(
      mapDataToInsights({
        isLoadingData: false,
        productDetail: productDetailContextMock,
        router: routerMock,
        siteProduct: siteProductMock,
        tireSize: '100-40r15',
        userPersonalization: {
          ...userPersonalizationContextMock,
          vehicle: {} as any,
        },
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
        isLoadingData: false,
        productDetail: productDetailContextMock,
        router: routerMock,
        siteProduct: siteProductMock,
        tireSize: '100-40r15',
        userPersonalization: userPersonalizationContextMock,
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
        isLoadingData: false,
        productDetail: productDetailContextMock,
        router: routerMock,
        siteProduct: siteProductMock,
        tireSize: '100-40r17',
        userPersonalization: userPersonalizationContextMock,
      }),
    ).toMatchObject({
      sizeCheckState: SIZE_CHECK_STATES.SIZE_FITS,
      showFitBar: true,
      vehicle: `${vehicle?.vehicleMake} ${vehicle?.vehicleModel} ${vehicle?.vehicleYear} ${vehicle?.vehicleTrim}`,
    });
  });

  it('returns insights props that fits the tire line', () => {
    expect(
      mapDataToInsights({
        isLoadingData: false,
        productDetail: productDetailContextMock,
        router: routerMock,
        siteProduct: siteProductMock,
        userPersonalization: userPersonalizationContextMock,
      }),
    ).toMatchObject({
      sizeCheckState: SIZE_CHECK_STATES.TIRE_LINE_FITS,
      showFitBar: true,
      vehicle: `${vehicle?.vehicleMake} ${vehicle?.vehicleModel} ${vehicle?.vehicleYear} ${vehicle?.vehicleTrim}`,
    });
  });

  it('returns insights props that does not fit the tire line', () => {
    expect(
      mapDataToInsights({
        isLoadingData: false,
        productDetail: productDetailContextMock,
        router: routerMock,
        siteProduct: {
          ...siteProductMock,
          siteProductLineAvailableSizeList: siteProductMock.siteProductLineAvailableSizeList.map(
            (item) => ({
              ...item,
              isFitForCurrentVehicle: false,
            }),
          ),
        },
        userPersonalization: userPersonalizationContextMock,
      }),
    ).toMatchObject({
      sizeCheckState: SIZE_CHECK_STATES.TIRE_LINE_DOES_NOT_FIT,
      showFitBar: true,
      vehicle: `${vehicle?.vehicleMake} ${vehicle?.vehicleModel} ${vehicle?.vehicleYear} ${vehicle?.vehicleTrim}`,
    });
  });
});
