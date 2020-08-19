import { reviewDetailMock } from '~/components/modules/ReviewDetail/ReviewDetail.mock';

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
  } = reviewDetailMock;

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
