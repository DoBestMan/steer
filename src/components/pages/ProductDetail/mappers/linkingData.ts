/* eslint-disable sort-keys */

import { NextRouter } from 'next/router';
import { Offer, Product, Review } from 'schema-dts';

import { SiteCatalogProductImage } from '~/data/models/SiteCatalogProductImage';
import { SiteProduct } from '~/data/models/SiteProduct';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { RATINGS, ROUTE_MAP, ROUTES } from '~/lib/constants';
import { interpolateRoute } from '~/lib/utils/routes';
import { formatDollars } from '~/lib/utils/string';

export function mapDataToLinkingData({
  hostUrl,
  isPLA,
  router: { query },
  siteProduct: { siteProductLine, siteProductLineAvailableSizeList },
  siteProductReviews: { performanceRating, reviewsSource, reviewsList },
}: {
  hostUrl?: string | null;
  isPLA?: boolean;
  router: NextRouter;
  siteProduct: SiteProduct;
  siteProductReviews: SiteProductReviews;
}): Product | null {
  const name = siteProductLine.name;
  const image = siteProductLine.assetList
    .filter((item) => !!Object.prototype.hasOwnProperty.call(item, 'image'))
    .map((item) => (item as SiteCatalogProductImage).image.src);
  const description = siteProductLine.overview || '';
  const brandName = siteProductLine.brand.label;
  const ratingValue = performanceRating.overall;
  const reviewCount =
    (reviewsSource.simpleTire || 0) + (reviewsSource.googleShopping || 0);

  const reviews: Review[] = reviewsList.map((item) => ({
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

  const itemCondition = 'https://schema.org/NewCondition';
  const availability = 'https://schema.org/InStock';
  const sellerName = 'SimpleTire';

  const offers: Offer[] = siteProductLineAvailableSizeList
    .slice()
    .sort((a, b) => parseInt(a.priceInCents, 10) - parseInt(b.priceInCents, 10))
    .sort((a) => (a.isSelected ? -1 : 1))
    .map((item) => {
      const { mpn, oem, tireSize } = item.siteQueryParams;
      const itemQuery = { ...query, ...{ mpn, oem, tireSize } };

      const relativeUrl = interpolateRoute(
        isPLA
          ? ROUTE_MAP[ROUTES.PRODUCT_DETAIL_PLA]
          : ROUTE_MAP[ROUTES.PRODUCT_DETAIL],
        itemQuery,
        isPLA,
      );

      const absoluteUrl = `${hostUrl || ''}${relativeUrl}`;

      return {
        '@type': 'Offer',
        url: absoluteUrl,
        priceCurrency: 'USD',
        price: formatDollars(item.priceInCents).slice(1),
        itemCondition,
        availability,
        seller: {
          '@type': 'Organization',
          name: sellerName,
        },
        sku: isPLA && query.itemId ? query.itemId : item.partNumber,
        mpn: item.partNumber,
      };
    });
  const offersLowPrice = Math.min(
    ...offers.map(
      (item) => (item.price && parseFloat(item.price.toString())) || 0,
    ),
  );
  const offersHighPrice = Math.max(
    ...offers.map(
      (item) => (item.price && parseFloat(item.price.toString())) || 0,
    ),
  );

  if (!offers.length) {
    return null;
  }

  return {
    '@type': 'Product',
    name,
    image,
    description,
    sku: offers[0].sku,
    mpn: offers[0].mpn,
    brand: {
      '@type': 'Brand',
      name: brandName,
    },
    review: reviews,
    aggregateRating:
      ratingValue > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: ratingValue.toString(),
            reviewCount,
          }
        : undefined,
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'USD',
      lowPrice: offersLowPrice.toString(),
      highPrice: offersHighPrice.toString(),
      offerCount: offers.length,
      offers,
    },
  };
}
