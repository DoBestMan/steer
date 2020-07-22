import { Product } from 'schema-dts';

import { SiteProductReviewsListingItem } from '~/data/models/SiteProductReviewsListingItem';

export function mapDataToLinkingData({
  reviewsList,
}: {
  reviewsList: SiteProductReviewsListingItem[];
}): { products: Product[] } {
  const products: Product[] = reviewsList.map(
    ({ overallRating, ratingsCount, label }) => ({
      '@type': 'Product',
      name: label,
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: overallRating,
        reviewCount: ratingsCount,
      },
    }),
  );

  return { products };
}
