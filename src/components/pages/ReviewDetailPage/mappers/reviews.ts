import format from 'date-fns/format';

import { ReviewCardProps } from '~/components/global/ReviewCard/ReviewCard';
import { ReviewsProps } from '~/components/modules/ReviewDetail/Reviews/Reviews';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { ui } from '~/lib/utils/ui-dictionary';

export function mapDataToReviews({
  siteProductReviews: { listResultMetadata, reviewsList, reviewsSource },
}: {
  siteProductReviews: SiteProductReviews;
}): ReviewsProps {
  const reviews: ReviewCardProps[] = reviewsList.map((item, idx) => ({
    body: item.additionalComments,
    car: item.vehicle || undefined,
    date: item.purchaseDate
      ? format(new Date(item.purchaseDate), 'MMM d, yyyy')
      : null,
    id: idx.toString(),
    isVerified: item.verifiedCustomer,
    location: item.address,
    momentList: item.dataMomentList,
    ratings: item.performanceRating.ratingList,
    ratingStars: item.performanceRating.overall,
    title: item.name,
  }));

  const numberOfReviews = Object.values(reviewsSource).reduce(
    (acc: number, cur) => acc + (cur || 0),
    0,
  );

  const title = numberOfReviews
    ? ui('reviews.numReviews', { quantity: numberOfReviews })
    : ui('reviews.noReviews');

  return {
    listResultMetadata,
    reviews,
    sources: reviewsSource,
    title,
  };
}
