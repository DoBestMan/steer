import { RATINGS } from '~/lib/constants';
import { numberWithDecimal, percentageFromNumber } from '~/lib/utils/number';
import { ui } from '~/lib/utils/ui-dictionary';
import { screenReaderText } from '~/styles/document/accessibility.styles';
import { typography } from '~/styles/typography.styles';

import styles from './RatingsBar.styles';

interface Props {
  label: string;
  rating: number;
}

const CONSTANTS = {
  RATING_HIGHLIGHT_THRESHOLD: 4,
};

function RatingsBar({ label, rating }: Props) {
  const isRatingHighlighted = rating >= CONSTANTS.RATING_HIGHLIGHT_THRESHOLD;
  const formattedRating = numberWithDecimal(rating);
  const barWidth = `${percentageFromNumber(rating, RATINGS.MAX_RATING)}%`;
  const highlightedClasses = [styles.emphasized, typography.primarySubhead];
  const a11yLabel = ` ${ui('common.ratings.outOf')} ${RATINGS.MAX_RATING}`;

  return (
    <li css={styles.container}>
      <span css={[typography.bodyCopy, styles.label]}>{label}</span>
      <div css={styles.barContainer}>
        <span css={[styles.bar, styles.barFull]}></span>
        <span
          css={[styles.bar, styles.barProgress, { width: barWidth }]}
        ></span>
      </div>
      <span
        css={[
          typography.bodyCopy,
          styles.rating,
          isRatingHighlighted && highlightedClasses,
        ]}
      >
        {formattedRating}
      </span>
      <span css={screenReaderText}>{a11yLabel}</span>
    </li>
  );
}

export default RatingsBar;
