import { mockReviews } from '~/components/global/ReviewCard/ReviewCard.mocks';
import {
  mockMomentList,
  mockRatings,
} from '~/components/modules/PDP/Reviews/Reviews.mocks';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

const mockLogo: SiteImage = {
  altText: 'Brand logo',
  src:
    'https://images.simpletire.com/image/upload/v1592606314/Accelera_Tires_black_j207to.svg',
  type: ICON_IMAGE_TYPE.IMAGE,
};

export const mockReviewDetail = {
  brand: {
    image: mockLogo,
    label: 'Pirelli',
  },
  brandUrl: '/',
  breadcrumbs: [
    {
      label: 'Home',
      url: '/',
    },
    {
      label: 'All Brands',
      url: '/all-brands',
    },
    {
      label: 'Pirelli Tires',
      url: '/pirelli',
    },
    {
      label: 'Reviews',
      url: '/pirelli/reviews',
    },
    {
      currentPath: true,
      label: 'Scorpion Verde All Season Plus',
      url: '/pirelli/reviews/scorpion-verde-all-season-plus',
    },
  ],
  ratings: mockRatings,
  ratingStars: 4.8,
  reviews: [].concat(...Array(15).fill(mockReviews)),
  sources: { simpleTire: 115, googleShopping: 72 },
  stats: [mockMomentList[1]],
  tire: 'Scorpion Verde All Season Plus Tire',
  title: '187 reviews',
};
