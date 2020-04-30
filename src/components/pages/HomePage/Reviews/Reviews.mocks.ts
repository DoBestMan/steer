import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteReviews } from '~/data/models/SiteReviews';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

export const mockReviews: SiteReviews = {
  body:
    'Shopper Approved actively collects reviews from actual verified customers, which helps more accurately reflect customer’s overall satisfaction with this company.',
  link: {
    href: '',
    isExternal: false,
  },
  linkLabel: 'See all reviews',
  ratingLabel: 'Rated by 52,135 verified customers',
  ratingLabelIcon: {
    svgId: ICONS.REVIEWS_VERIFIED,
    type: ICON_IMAGE_TYPE.ICON,
  },
  ratingStars: 4.8,
  siteReviewList: [
    {
      authorImage: {
        altText: 'author image',
        srcSet: 'https://via.placeholder.com/100?text=:)',
        type: ICON_IMAGE_TYPE.IMAGE,
      },
      authorName: 'Melissa',
      body:
        "I bought several tires on different orders and I'm totally satisfied.",
      id: '1',
      title: 'Huge inventory',
    },
    {
      authorImage: {
        altText: 'author image',
        srcSet: 'https://via.placeholder.com/100?text=:D',
        type: ICON_IMAGE_TYPE.IMAGE,
      },
      authorName: 'James',
      body: 'Great service and less expensive than going to the dealership.',
      id: '2',
      title: 'Easy installation',
    },
    {
      authorImage: {
        altText: 'author image',
        srcSet: 'https://via.placeholder.com/100?text=;P',
        type: ICON_IMAGE_TYPE.IMAGE,
      },
      authorName: 'Andrew',
      body: 'We did a price comparison. We saved about $121 with SimpleTire.',
      id: '3',
      title: 'Great deal',
    },
  ],
  title: 'Why replace with us',
};
