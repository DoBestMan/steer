/* eslint-disable sort-keys */

import { mapDataToLinkingData } from './linkingData';
import {
  routerMock,
  siteProductMock,
  siteProductReviewsMock,
} from './ProductDetail.mock';

describe('pages/ProductDetails/mappers/linkingData', () => {
  it('returns parsed linking data', () => {
    expect(
      mapDataToLinkingData({
        siteProduct: siteProductMock,
        siteProductReviews: siteProductReviewsMock,
        hostUrl: 'https://simpletire.com',
        router: routerMock,
      }),
    ).toStrictEqual({
      '@type': 'Product',
      name: 'DH2',
      image: [
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidewall_kri3pe.png',
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidetread_f24ld3.png',
        'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-treadfull_xpitvf.png',
        'https://images.simpletire.com/image/upload/v1591705546/line-images/1349/1349-treadonly_pa1oew.png',
      ],
      description:
        "The ContiProContact is Continental's Grand Touring All-Season tire originally developed for European sport coupes and sedans sold in North America, and is now available for a wide range of imported and domestic cars.",
      sku: '12345678',
      mpn: '12345678',
      brand: { '@type': 'Brand', name: 'Achilles' },
      review: [
        {
          '@type': 'Review',
          reviewBody:
            'Excellent tire and great smooth ride and handling ability.',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: 4.9,
            bestRating: 5,
            worstRating: 1,
          },
          author: { '@type': 'Person', name: 'Victor' },
        },
        {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: 4.9,
            bestRating: 5,
            worstRating: 1,
          },
          author: { '@type': 'Person', name: 'Joe' },
        },
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: 187,
      },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'USD',
        lowPrice: '49.99',
        highPrice: '69.99',
        offerCount: 3,
        offers: [
          {
            '@type': 'Offer',
            url: 'https://simpletire.com/brands/continental-tires/dh2',
            priceCurrency: 'USD',
            price: '49.99',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'SimpleTire' },
            sku: '12345678',
            mpn: '12345678',
          },
          {
            '@type': 'Offer',
            url: 'https://simpletire.com/brands/continental-tires/dh2',
            priceCurrency: 'USD',
            price: '59.99',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'SimpleTire' },
            sku: '00000000',
            mpn: '00000000',
          },
          {
            '@type': 'Offer',
            url: 'https://simpletire.com/brands/continental-tires/dh2',
            priceCurrency: 'USD',
            price: '69.99',
            itemCondition: 'https://schema.org/NewCondition',
            availability: 'https://schema.org/InStock',
            seller: { '@type': 'Organization', name: 'SimpleTire' },
            sku: '11111111',
            mpn: '11111111',
          },
        ],
      },
    });
  });
});
