import { text } from '@storybook/addon-knobs';

import Reviews from './Reviews';

import { COLORS } from '~/lib/constants';

export default {
  component: Reviews,
  title: 'Reviews',
};

export function ReviewsWithKnobs() {
  const reviewsMockData = {
    description:
      'Shopper Approved actively collects reviews from actual verified customers, which helps more accurately reflect customer’s overall satisfaction with this company.',
    link: {
      href: '',
      title: 'See all reviews',
    },
    numberOfReviews: 52135,
    pressReviews: [
      {
        imageUrl: text(
          'Image URL',
          'https://via.placeholder.com/100x35.png?text=Inc.',
        ),
        name: text('Press Name', 'Inc. Magazine'),
        quote: text('Quote', 'Fastest-growing'),
      },
      {
        imageUrl: 'https://via.placeholder.com/160x60.png?text=Forbes',
        name: 'Forbes',
        quote: 'Innovative',
      },
      {
        imageUrl: 'https://via.placeholder.com/120x44.png',
        name: 'Tire Business',
        quote: 'A new way',
      },
    ],
    rating: 4.8,
    title: 'Why replace with us',
    userReviews: [
      {
        avatarURL: 'https://via.placeholder.com/100?text=:)',
        name: 'Melissa',
        review:
          "I bought several tires on different orders and I'm totally satisfied.",
        title: 'Huge inventory',
      },
      {
        avatarURL: 'https://via.placeholder.com/100?text=:D',
        name: 'James',
        review:
          'Great service and less expensive than going to the dealership.',
        title: 'Easy installation',
      },
      {
        avatarURL: 'https://via.placeholder.com/100?text=;P',
        name: 'Andrew',
        review:
          'We did a price comparison. We saved about $121 with SimpleTire.',
        title: 'Great deal',
      },
    ],
  };

  return (
    <div css={{ backgroundColor: COLORS.GLOBAL.BLACK }}>
      <Reviews {...reviewsMockData} />
    </div>
  );
}
