import { mockReviews } from '~/components/global/ReviewCard/ReviewCard.mocks';

export const mockMomentList = [
  {
    label: "Honda Civic's ranking",
    value: '1st in popularity',
  },
  {
    label: 'Would you buy again',
    value: '98%',
  },
];

export const mockRatings = [
  {
    label: 'Dry',
    value: 5.0,
  },
  {
    label: 'Wet',
    value: 5.0,
  },
  {
    label: 'Winter',
    value: 2.7,
  },
  {
    label: 'Comfort',
    value: 4.8,
  },
  {
    label: 'Noise',
    value: 3.5,
  },
  {
    label: 'Treadwear',
    value: 3.7,
  },
];

export const mockReviewData = {
  momentList: mockMomentList,
  ratings: mockRatings,
  ratingStars: 4.8,
  reviews: mockReviews,
  seeAllReviewsLink: {
    href: '/',
    isExternal: false,
  },
  seeAllReviewsLinkLabel: 'See all customer reviews',
  sources: { simpleTire: 115, googleShopping: 72 },
  title: '115 reviews',
  writeReviewLink: {
    href: '/',
    isExternal: false,
  },
  writeReviewLinkLabel: 'Write a review',
};
