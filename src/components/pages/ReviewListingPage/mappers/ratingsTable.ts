import {
  Rating,
  RatingsTableProps,
} from '~/components/modules/ReviewListing/RatingsTable/RatingsTable';
import { ListResultMetadata } from '~/data/models/ListResultMetadata';
import { SiteProductReviewsListingItem } from '~/data/models/SiteProductReviewsListingItem';

export function mapDataToRatingsTable({
  reviewsList,
  listResultMetadata,
}: {
  listResultMetadata: ListResultMetadata;
  reviewsList: SiteProductReviewsListingItem[];
}): RatingsTableProps {
  const reviews: Rating[] = reviewsList.map(
    ({ link, overallRating, ratingsCount, label }, idx) => ({
      id: idx,
      link,
      rating: overallRating,
      ratingsQuantity: ratingsCount,
      tire: label,
    }),
  );

  return { reviews, listResultMetadata };
}
