import { routerMock, siteProductReviewsMock } from './ProductDetail.mock';
import { mapDataToReviews } from './reviews';

describe('pages/ProductDetails/mappers/reviews', () => {
  it('returns parsed Reviews props', () => {
    expect(
      mapDataToReviews({
        siteProductReviews: siteProductReviewsMock,
        router: routerMock,
      }),
    ).toStrictEqual({
      momentList: [
        { label: "Honda Civic's ranking", value: '1st in popularity' },
        { label: 'Would you buy again', value: '98%' },
      ],
      ratings: [
        { label: 'Dry', value: 5 },
        { label: 'Wet', value: 5 },
        { label: 'Winter', value: 2.7 },
        { label: 'Comfort', value: 4.8 },
        { label: 'Noise', value: 3.5 },
        { label: 'Treadwear', value: 3.7 },
      ],
      ratingStars: 4.9,
      reviews: [
        {
          body: null,
          car: undefined,
          date: null,
          id: '0',
          isVerified: true,
          location: null,
          momentList: [
            { label: 'Would you buy again', value: 'Yes' },
            { label: 'Annual mileage', value: '20,000 - 29,000' },
            { label: 'Driving style', value: 'Cautious' },
            { label: 'Annual mileage', value: '20,000 - 29,000' },
            { label: 'Driving location', value: 'Mostly City' },
          ],
          ratings: [
            { label: 'Dry', value: 5 },
            { label: 'Wet', value: 5 },
            { label: 'Winter', value: 2.7 },
            { label: 'Comfort', value: 4.8 },
            { label: 'Noise', value: 3.5 },
            { label: 'Treadwear', value: 3.7 },
          ],
          ratingStars: 4.9,
          title: 'Joe',
        },
        {
          body: 'Excellent tire and great smooth ride and handling ability.',
          car: 'Honda Civic 2015 EX-L',
          date: 'Jan 12, 2020',
          id: '1',
          isVerified: true,
          location: 'San Francisco, CA',
          momentList: [
            { label: 'Would you buy again', value: 'Yes' },
            { label: 'Annual mileage', value: '20,000 - 29,000' },
            { label: 'Driving style', value: 'Cautious' },
            { label: 'Annual mileage', value: '20,000 - 29,000' },
            { label: 'Driving location', value: 'Mostly City' },
          ],
          ratings: [
            { label: 'Dry', value: 5 },
            { label: 'Wet', value: 5 },
            { label: 'Winter', value: 2.7 },
            { label: 'Comfort', value: 4.8 },
            { label: 'Noise', value: 3.5 },
            { label: 'Treadwear', value: 3.7 },
          ],
          ratingStars: 4.9,
          title: 'Victor',
        },
      ],
      seeAllReviewsLink: {
        href: '/brands/continental-tires/dh2/reviews',
        isExternal: false,
      },
      seeAllReviewsLinkLabel: 'See all customer reviews for dh2 tires',
      sources: { googleShopping: 72, simpleTire: 115 },
      title: '187 Reviews',
      writeReviewLink: {
        href: '/brands/continental-tires/dh2/write-a-review',
        isExternal: false,
      },
    });
  });
});
