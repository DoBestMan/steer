import { boolean } from '@storybook/addon-knobs';

import Reviews from './Reviews';
import { reviewsMock } from './Reviews.mock';

export default {
  component: Reviews,
  title: 'PDP/Reviews',
};

export function ReviewsWithKnobs() {
  const {
    momentList,
    ratings,
    ratingStars,
    reviews,
    seeAllReviewsLink,
    seeAllReviewsLinkLabel,
    sources,
    title,
    writeReviewLink,
    writeReviewLinkLabel,
  } = reviewsMock;

  const hasReviews = boolean('Has reviews', true);
  const hasSources = boolean('Has sources', true);

  return (
    <Reviews
      momentList={momentList}
      ratings={ratings}
      reviews={(hasReviews && reviews) || []}
      ratingStars={ratingStars}
      seeAllReviewsLink={seeAllReviewsLink}
      seeAllReviewsLinkLabel={seeAllReviewsLinkLabel}
      sources={(hasSources && sources) || {}}
      title={title}
      writeReviewLink={writeReviewLink}
      writeReviewLinkLabel={writeReviewLinkLabel}
    />
  );
}

export function ReviewsEmpty() {
  const {
    seeAllReviewsLink,
    seeAllReviewsLinkLabel,
    writeReviewLink,
    writeReviewLinkLabel,
  } = reviewsMock;

  return (
    <Reviews
      seeAllReviewsLink={seeAllReviewsLink}
      seeAllReviewsLinkLabel={seeAllReviewsLinkLabel}
      writeReviewLink={writeReviewLink}
      writeReviewLinkLabel={writeReviewLinkLabel}
    />
  );
}

export function ReviewsNoSources() {
  const {
    seeAllReviewsLink,
    seeAllReviewsLinkLabel,
    ratingStars,
    reviews,
    title,
    writeReviewLink,
    writeReviewLinkLabel,
  } = reviewsMock;

  return (
    <Reviews
      ratingStars={ratingStars}
      reviews={reviews}
      seeAllReviewsLink={seeAllReviewsLink}
      seeAllReviewsLinkLabel={seeAllReviewsLinkLabel}
      title={title}
      writeReviewLink={writeReviewLink}
      writeReviewLinkLabel={writeReviewLinkLabel}
    />
  );
}

export function ReviewsNoReviews() {
  const {
    ratingStars,
    seeAllReviewsLink,
    seeAllReviewsLinkLabel,
    title,
    writeReviewLink,
    writeReviewLinkLabel,
  } = reviewsMock;

  return (
    <Reviews
      ratingStars={ratingStars}
      seeAllReviewsLink={seeAllReviewsLink}
      seeAllReviewsLinkLabel={seeAllReviewsLinkLabel}
      title={title}
      writeReviewLink={writeReviewLink}
      writeReviewLinkLabel={writeReviewLinkLabel}
    />
  );
}
