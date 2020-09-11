import Stars, { HALF_WIDTH_STARS } from '~/components/global/Stars/Stars';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { useScrollToAnchor } from '~/hooks/useScrollToAnchor';
import { COLORS, RATINGS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { ProductInfoProps } from './ProductInfo';
import styles from './Rating.styles';

function Rating({
  rating,
  reviews,
}: Pick<ProductInfoProps, 'rating' | 'reviews'>) {
  const { lessThan } = useBreakpoints();
  const { scrollToAnchor } = useScrollToAnchor();

  if (!rating) {
    return null;
  }

  const reviewQuantityStyles = reviews?.hasReviews
    ? [styles.ratingQuantity, styles.borderBottom]
    : styles.ratingQuantity;

  return (
    <div
      css={styles.reviews}
      aria-label={ui('ratings.fullRatingWithReviews', {
        rating: rating.value,
        maxRating: RATINGS.MAX_RATING,
        reviews: rating.quantity,
      })}
    >
      {reviews?.hasReviews && (
        <a
          css={styles.reviewsLink}
          href={`#${reviews.refId}`}
          onClick={scrollToAnchor}
          aria-hidden
        />
      )}
      <span aria-hidden>
        <Stars
          color={COLORS.GLOBAL.BLACK}
          number={rating.value}
          width={lessThan.L ? HALF_WIDTH_STARS : 80}
        />
      </span>
      <span css={styles.ratingValue} aria-hidden>
        {rating.value}
        <span css={reviewQuantityStyles}>({rating.quantity})</span>
      </span>
    </div>
  );
}

export default Rating;
