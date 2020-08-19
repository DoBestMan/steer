import { reviewDetailMock } from '~/components/modules/ReviewDetail/ReviewDetail.mock';

import Reviews from './Reviews';

export default {
  component: Reviews,
  title: 'SEO Landing/Review Detail/Reviews',
};

export function ReviewsWithKnobs() {
  const { reviews, sources, title } = reviewDetailMock;

  return <Reviews reviews={reviews} sources={sources} title={title} />;
}
