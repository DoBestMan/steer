import format from 'date-fns/format';
import { NextRouter } from 'next/router';

import { ReviewCardProps } from '~/components/global/ReviewCard/ReviewCard';
import { ReviewsProps } from '~/components/modules/PDP/Reviews/Reviews';
import { SiteProductReviews } from '~/data/models/SiteProductReviews';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
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
    query: { brandName },
  } = router;

  const momentList = dataMomentList;
  const ratingStars = performanceRating.overall;
  const ratings = performanceRating.ratingList;
  const reviews: ReviewCardProps[] = reviewsList.map((item, idx) => ({
    body: item.additionalComments,
    car: item.vehicle || undefined,
    date: item.purchaseDate
      ? format(new Date(item.purchaseDate), 'EEEE MMMM d')
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
  const sources = numberOfReviews
    ? [
        reviewsSource.googleShopping &&
          ui('reviews.reviewsFromGoogle', {
            number: reviewsSource.googleShopping,
          }),
        reviewsSource.simpleTire &&
          ui('reviews.reviewsOnSimpleTire', {
            number: reviewsSource.simpleTire,
          }),
      ].filter((e): e is string => !!e)
    : undefined;
  const title = numberOfReviews
    ? ui('reviews.tireReviews', { tire: numberOfReviews })
    : undefined;
  const seeAllReviewsLink = {
    href: interpolateRoute(ROUTE_MAP[ROUTES.BRAND_REVIEWS], {
      brandName,
    }),
    isExternal: false,
  };

  // TODO: Implement write a review functionality
  const writeReviewLink = {
    href: '/',
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
