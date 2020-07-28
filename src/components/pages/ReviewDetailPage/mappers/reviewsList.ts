import { ReviewCardProps } from '~/components/global/ReviewCard/ReviewCard';
import { SiteProductLineReviewItem } from '~/data/models/SiteProductLineReviewItem';
import { formatOrNull } from '~/lib/utils/date';

export function mapDataToReviewsList(
  reviewsList: SiteProductLineReviewItem[],
): ReviewCardProps[] {
  const reviews: ReviewCardProps[] = reviewsList.map((item, idx) => ({
    body: item.additionalComments,
    car: item.vehicle && item.vehicle.trim() !== '' ? item.vehicle : null,
    date: item.purchaseDate
      ? formatOrNull(item.purchaseDate, 'MMM d, yyyy')
      : null,
    id: idx.toString(),
    isVerified: item.verifiedCustomer,
    location: item.address && item.address.trim() !== '' ? item.address : null,
    momentList: item.dataMomentList,
    ratings: item.performanceRating.ratingList,
    ratingStars: item.performanceRating.overall,
    title: item.name,
  }));

  return reviews;
}
