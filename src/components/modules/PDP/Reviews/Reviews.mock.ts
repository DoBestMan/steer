import { reviewCardMock } from '~/components/global/ReviewCard/ReviewCard.mock';

export const momentListMock = [
  {
    label: "Honda Civic's ranking",
    value: '1st in popularity',
  },
  {
    label: 'Would you buy again',
    value: '98%',
  },
];

export const ratingsMock = [
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

export const reviewsMock = {
  momentList: momentListMock,
  ratings: ratingsMock,
  ratingStars: 4.8,
  reviews: reviewCardMock,
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
