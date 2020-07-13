import { mapDataToInsights } from './insights';
import { siteProductMock } from './ProductDetail.mock';

describe('pages/ProductDetails/mappers/insights', () => {
  it('returns parsed insights props', () => {
    expect(
      mapDataToInsights({
        siteProduct: siteProductMock,
      }),
    ).toMatchObject({
      delivery: 'Free 2-day shipping to Brooklyn, NY',
      doesItFit: false,
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
});
