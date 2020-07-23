import { SiteProductLineSizeDetail } from '~/data/models/SiteProductLineSizeDetail';
import { SiteProductLineSizeDetailRoadHazard } from '~/data/models/SiteProductLineSizeDetailRoadHazard';

import { siteProductMock } from './ProductDetail.mock';
import { mapDataToRoadHazard } from './roadHazard';

describe('pages/ProductDetails/mappers/breadcrumbs', () => {
  it('returns road hazard information for single available size', () => {
    expect(
      mapDataToRoadHazard({
        quantity: { front: 4 },
        siteProduct: siteProductMock,
      }),
    ).toMatchObject({
      durationLabel: '3 years',
      price: '5208',
    });
  });

  it('returns null road hazard for single unavailable size', () => {
    expect(
      mapDataToRoadHazard({
        quantity: { front: 4 },
        siteProduct: {
          ...siteProductMock,
          siteProductLineSizeDetail: {
            ...(siteProductMock.siteProductLineSizeDetail as SiteProductLineSizeDetail),
            roadHazard: null,
          },
        },
      }),
    ).toBeNull();
  });

  it('returns road hazard for front + rear available sizes', () => {
    expect(
      mapDataToRoadHazard({
        quantity: { front: 2, rear: 2 },
        siteProduct: siteProductMock,
      }),
    ).toMatchObject({
      durationLabel: '3 years',
      price: '6404',
    });
  });

  it('returns null road hazard for front available + rear unavailable sizes', () => {
    expect(
      mapDataToRoadHazard({
        quantity: { front: 2, rear: 2 },
        siteProduct: {
          ...siteProductMock,
          siteProductLineRearSizeDetail: {
            ...(siteProductMock.siteProductLineRearSizeDetail as SiteProductLineSizeDetail),
            roadHazard: null,
          },
        },
      }),
    ).toBeNull();
  });

  it('returns null road hazard for front unavailable + rear available sizes', () => {
    expect(
      mapDataToRoadHazard({
        quantity: { front: 2, rear: 2 },
        siteProduct: {
          ...siteProductMock,
          siteProductLineSizeDetail: {
            ...(siteProductMock.siteProductLineSizeDetail as SiteProductLineSizeDetail),
            roadHazard: null,
          },
        },
      }),
    ).toBeNull();
  });

  it('returns null road hazard for front + rear available sizes with different durations', () => {
    expect(
      mapDataToRoadHazard({
        quantity: { front: 2, rear: 2 },
        siteProduct: {
          ...siteProductMock,
          siteProductLineSizeDetail: {
            ...(siteProductMock.siteProductLineSizeDetail as SiteProductLineSizeDetail),
            roadHazard: {
              ...((siteProductMock.siteProductLineSizeDetail as SiteProductLineSizeDetail)
                .roadHazard as SiteProductLineSizeDetailRoadHazard),
              durationLabel: '3 years',
            },
          },
          siteProductLineRearSizeDetail: {
            ...(siteProductMock.siteProductLineRearSizeDetail as SiteProductLineSizeDetail),
            roadHazard: {
              ...((siteProductMock.siteProductLineRearSizeDetail as SiteProductLineSizeDetail)
                .roadHazard as SiteProductLineSizeDetailRoadHazard),
              durationLabel: '2 years',
            },
          },
        },
      }),
    ).toBeNull();
  });
});
