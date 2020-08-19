import { reviewCardMock } from '~/components/global/ReviewCard/ReviewCard.mock';
import {
  momentListMock,
  ratingsMock,
} from '~/components/modules/PDP/Reviews/Reviews.mock';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

const mockLogo: SiteImage = {
  altText: 'Brand logo',
  src:
    'https://images.simpletire.com/image/upload/v1592606314/Accelera_Tires_black_j207to.svg',
  type: ICON_IMAGE_TYPE.IMAGE,
};

export const reviewDetailMock = {
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
  ratings: ratingsMock,
  ratingStars: 4.8,
  reviews: [].concat(...Array(15).fill(reviewCardMock)),
  sources: { simpleTire: 115, googleShopping: 72 },
  stats: [momentListMock[1]],
  tire: 'Scorpion Verde All Season Plus Tire',
  title: '187 reviews',
};
