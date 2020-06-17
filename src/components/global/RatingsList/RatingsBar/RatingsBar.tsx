import { RATINGS, RATINGS_DISPLAY, RATINGS_THEME } from '~/lib/constants';
import { numberWithDecimal, percentageFromNumber } from '~/lib/utils/number';
import { ui } from '~/lib/utils/ui-dictionary';
import { screenReaderText } from '~/styles/document/accessibility.styles';

import styles, { dStyles, tStyles } from './RatingsBar.styles';

export interface Props {
  display?: RATINGS_DISPLAY;
  label: string;
  theme?: RATINGS_THEME;
  value: number;
}

const CONSTANTS = {
  RATING_HIGHLIGHT_THRESHOLD: 4,
};

function RatingsBar({
  display = RATINGS_DISPLAY.DEFAULT,
  label,
  value,
  theme = RATINGS_THEME.DARK,
}: Props) {
  const isRatingHighlighted = value >= CONSTANTS.RATING_HIGHLIGHT_THRESHOLD;
  const formattedRating = numberWithDecimal(value);
  const barWidth = `${percentageFromNumber(value, RATINGS.MAX_RATING)}%`;
  const a11yLabel = ` ${ui('common.ratings.outOf')} ${RATINGS.MAX_RATING}`;
  const highlightedClasses = [
    dStyles[display].emphasized,
    tStyles[theme].emphasized,
  ];

  return (
    <li
      css={[
        styles.container,
        dStyles[display].container,
        tStyles[theme].container,
      ]}
    >
      <span css={dStyles[display].label}>{label}</span>
      <div css={styles.barContainer}>
        <span css={[styles.bar, styles.barFull, tStyles[theme].barFull]} />
        <span
          css={[
            styles.bar,
            styles.barProgress,
            tStyles[theme].barProgress,
            { width: barWidth },
          ]}
        />
      </div>
      <span
        css={[
          styles.rating,
          dStyles[display].rating,
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
