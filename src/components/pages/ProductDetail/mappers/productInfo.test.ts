import {
  globalsMock,
  routerMock,
  siteProductMock,
  siteProductReviewsMock,
} from './ProductDetail.mock';
import { mapDataToProductInfo } from './productInfo';

describe('pages/ProductDetails/mappers/breadcrumbs', () => {
  it('returns parsed product info props', () => {
    expect(
      mapDataToProductInfo({
        siteProduct: siteProductMock,
        siteProductReviews: siteProductReviewsMock,
        router: routerMock,
        globals: globalsMock,
      }),
    ).toMatchObject({
      availableSizes: 3,
      brand: {
        image: {
          altText: 'Achilles',
          height: 20,
          src:
            'https://images.simpletire.com/image/upload/v1593195309/manf-logos/4b.svg',
          type: 'SiteImage',
          width: 120,
        },
        label: 'Achilles',
      },
      brandURL: '/brands/continental-tires',
      callForPricing: false,
      customerServiceNumber: { display: '(888) 123 456', value: '888123456' },
      loadSpeedRating: '91H',
      price: {
        estimatedRetailPriceInCents: '15975',
        salePriceInCents: '13296',
      },
      priceLabel: '60% off',
      productName: 'DH2',
      promoTags: [
        {
          label: '100% Risk-Free',
          icon: { type: 'SiteIcon', svgId: 'fire' },
          style: 'SitePromotionItemOrangePill',
        },
      ],
      rating: { quantity: 187, value: 4.9 },
      rearLoadSpeedRating: '91J',
      rearPrice: {
        estimatedRetailPriceInCents: '12099',
        salePriceInCents: '12099',
      },
      rearSize: '215/50 R19',
      sameSizeSearchResults: null,
      sameSizeSearchURL: '/tire-sizes/p215-50-R17',
      size: '215/50 R17',
      volatileAvailability: false,
    });
  });
});
