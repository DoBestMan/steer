import { ReviewsProps } from '~/components/modules/ReviewDetail/Reviews/Reviews';
import { mapDataToReviewsList } from '~/components/pages/ReviewDetailPage/mappers/reviewsList';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { ui } from '~/lib/utils/ui-dictionary';

export function mapDataToReviews({
  siteProductReviews: { listResultMetadata, reviewsList, reviewsSource },
}: {
  siteProductReviews: SiteProductReviews;
}): ReviewsProps {
  const numberOfReviews = Object.values(reviewsSource).reduce(
    (acc: number, cur) => acc + (cur || 0),
    0,
  );

  const title = numberOfReviews
    ? ui('reviews.numReviews', { quantity: numberOfReviews })
    : ui('reviews.noReviews');

  return {
    total: listResultMetadata.pagination?.total,
    reviews: mapDataToReviewsList(reviewsList),
    sources: reviewsSource,
    title,
  };
}
