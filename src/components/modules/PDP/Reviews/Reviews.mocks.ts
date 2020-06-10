import { mockReviews } from '~/components/global/ReviewCard/ReviewCard.mocks';

export const mockReviewData = {
  ratingStars: 4.8,
  reviews: mockReviews,
  seeAllReviewsLink: {
    href: '/',
    isExternal: false,
  },
  seeAllReviewsLinkLabel: 'See all customer reviews',
  sources: ['115 on SimpleTire', '72 from Google Shopping'],
  title: '115 reviews',
  writeReviewLink: {
    href: '/',
    isExternal: false,
  },
  writeReviewLinkLabel: 'Write a review',
};
