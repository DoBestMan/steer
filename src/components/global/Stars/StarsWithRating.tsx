import Stars, { Props as StarsProps } from '~/components/global/Stars/Stars';
import { COLORS, RATINGS } from '~/lib/constants';
import { numberWithDecimal } from '~/lib/utils/number';
import { ui } from '~/lib/utils/ui-dictionary';
import { screenReaderText } from '~/styles/document/accessibility.styles';

import styles from './Stars.styles';

function StarsWithRating({
  color = COLORS.GLOBAL.ORANGE,
  isSmall,
  number,
}: StarsProps) {
  const formattedRating = numberWithDecimal(number);
  const a11yLabel = ` ${ui('common.ratings.outOf')} ${RATINGS.MAX_RATING}`;

  return (
    <div css={styles.ratingContainer}>
      <Stars color={color} isSmall={isSmall} number={number} />
      <div css={[styles.rating, isSmall && styles.ratingSmall, { color }]}>
        {formattedRating}
      </div>
      <span css={screenReaderText}>{a11yLabel}</span>
    </div>
  );
}

export default StarsWithRating;