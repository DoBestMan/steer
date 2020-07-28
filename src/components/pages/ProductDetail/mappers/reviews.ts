import { NextRouter } from 'next/router';

import { ReviewCardProps } from '~/components/global/ReviewCard/ReviewCard';
import { ReviewsProps } from '~/components/modules/PDP/Reviews/Reviews';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { formatOrNull } from '~/lib/utils/date';
import { interpolateRoute } from '~/lib/utils/routes';
import { ui } from '~/lib/utils/ui-dictionary';

export function mapDataToReviews({
  siteProductReviews: {
    dataMomentList,
    performanceRating,
    reviewsList,
    reviewsSource,
  },
  router,
}: {
  router: NextRouter;
  siteProductReviews: SiteProductReviews;
}): ReviewsProps {
  const {
    query: { brand, productLine },
  } = router;

  const momentList = dataMomentList;
  const ratingStars = performanceRating.overall;
  const ratings = performanceRating.ratingList;
  const reviews: ReviewCardProps[] = reviewsList.map((item, idx) => ({
    body: item.additionalComments,
    car: item.vehicle || undefined,
    date: item.purchaseDate ? formatOrNull(item.purchaseDate) : null,
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

  const sources = reviewsSource;
  const title = numberOfReviews
    ? ui('reviews.tireReviews', { tire: numberOfReviews })
    : undefined;
  const seeAllReviewsLink = {
    href: interpolateRoute(ROUTE_MAP[ROUTES.PRODUCT_REVIEWS], {
      brand,
      productLine,
    }),
    isExternal: false,
  };

  const writeReviewLink = {
    href: interpolateRoute(ROUTE_MAP[ROUTES.WRITE_REVIEW], {
      brand,
      productLine,
    }),
    isExternal: false,
  };

  return {
    momentList,
    ratings,
    ratingStars,
    reviews,
    seeAllReviewsLink,
    sources,
    title,
    writeReviewLink,
  };
}
