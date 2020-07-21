import format from 'date-fns/format';

import { ReviewCardProps } from '~/components/global/ReviewCard/ReviewCard';
import { SiteProductLineReviewItem } from '~/data/models/SiteProductLineReviewItem';

export function mapDataToReviewsList(
  reviewsList: SiteProductLineReviewItem[],
): ReviewCardProps[] {
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

  return reviews;
}
