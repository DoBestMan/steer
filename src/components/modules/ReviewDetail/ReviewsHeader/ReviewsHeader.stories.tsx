import { mockReviewDetail } from '~/components/modules/ReviewDetail/ReviewDetail.mocks';

import ReviewsHeader from './ReviewsHeader';

export default {
  component: ReviewsHeader,
  title: 'SEO Landing/Review Detail/ReviewsHeader',
};

export function Header() {
  const {
    brand,
    brandUrl,
    breadcrumbs,
    ratings,
    ratingStars,
    stats,
    tire,
  } = mockReviewDetail;

  return (
    <ReviewsHeader
      brand={brand}
      brandUrl={brandUrl}
      breadcrumbs={breadcrumbs}
      ratings={ratings}
      ratingStars={ratingStars}
      stats={stats}
      tire={tire}
    />
  );
}
