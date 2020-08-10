import Stars, { HALF_WIDTH_STARS } from '~/components/global/Stars/Stars';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { COLORS, RATINGS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { ProductInfoProps } from './ProductInfo';
import styles from './Rating.styles';

function Rating({ rating }: Pick<ProductInfoProps, 'rating'>) {
  const { lessThan } = useBreakpoints();

  if (!rating) {
    return null;
  }

  return (
    <div
      css={styles.reviews}
      aria-label={ui('ratings.fullRatingWithReviews', {
        rating: rating.value,
        maxRating: RATINGS.MAX_RATING,
        reviews: rating.quantity,
      })}
    >
      <span aria-hidden>
        <Stars
          color={COLORS.GLOBAL.BLACK}
          number={rating.value}
          width={lessThan.L ? HALF_WIDTH_STARS : 80}
        />
      </span>
      <span css={styles.ratingValue} aria-hidden>
        {rating.value}
        <span css={styles.ratingQuantity}>({rating.quantity})</span>
      </span>
    </div>
  );
}

export default Rating;
