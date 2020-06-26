import { mockReviewDetail } from '~/components/modules/ReviewDetail/ReviewDetail.mocks';

import Reviews from './Reviews';

export default {
  component: Reviews,
  title: 'SEO Landing/Review Detail/Reviews',
};

export function ReviewsWithKnobs() {
  const { reviews, sources } = mockReviewDetail;

  return <Reviews reviews={reviews} sources={sources} />;
}
