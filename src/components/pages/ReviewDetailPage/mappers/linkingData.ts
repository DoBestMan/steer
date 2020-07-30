import { Product, Review } from 'schema-dts';

import { SiteCatalogProductImage } from '~/data/models/SiteCatalogProductImage';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { RATINGS } from '~/lib/constants';

export function mapDataToLinkingData({
  siteProduct: { siteProductLine },
  siteProductReviews,
}: {
  siteProduct: SiteProduct;
  siteProductReviews: SiteProductReviews;
}): Product {
  const name = siteProductLine.name;
  const image = siteProductLine.assetList
    .filter((item) => !!Object.prototype.hasOwnProperty.call(item, 'image'))
    .map((item) => (item as SiteCatalogProductImage).image.src);
  const description = siteProductLine.overview || '';
  const brandName = siteProductLine.brand.label;
  const ratingValue = siteProductReviews.performanceRating.overall;
  const reviewCount =
    (siteProductReviews.reviewsSource.simpleTire || 0) +
    (siteProductReviews.reviewsSource.googleShopping || 0);

  const reviews: Review[] = siteProductReviews.reviewsList.map((item) => ({
    '@type': 'Review',
    reviewRating: {
      '@type': 'Rating',
      ratingValue: item.performanceRating.overall,
      bestRating: RATINGS.MAX_RATING,
      worstRating: RATINGS.MIN_RATING,
    },
    author: {
      '@type': 'Person',
      name: item.name,
    },
    ...(item.additionalComments && { reviewBody: item.additionalComments }),
  }));

  return {
    '@type': 'Product',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ratingValue.toString(),
      reviewCount,
    },
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    description,
    image,
    name,
    review: reviews,
  };
}
