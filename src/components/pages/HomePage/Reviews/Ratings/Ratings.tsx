import { useEffect, useState } from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICON_SIZES, ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteIcon } from '~/data/models/SiteIcon';
import { COLORS, RATINGS } from '~/lib/constants';
import { numberWithDecimal, percentageFromNumber } from '~/lib/utils/number';
import { randomString } from '~/lib/utils/string';
import { ui } from '~/lib/utils/ui-dictionary';
import { screenReaderText } from '~/styles/document/accessibility.styles';
import { typography } from '~/styles/typography.styles';

import styles from './Ratings.styles';

interface Props {
  ratingLabel: string;
  ratingLabelIcon: SiteIcon | null;
  ratingStars: number;
}

function Ratings({ ratingLabel, ratingLabelIcon, ratingStars }: Props) {
  const [ratingGradientId, setRatingGradientId] = useState<string>();
  const formattedRating = numberWithDecimal(ratingStars);
  const ratingFillWidth = percentageFromNumber(ratingStars, RATINGS.MAX_RATING);
  const a11yLabel = ` ${ui('common.ratings.outOf')} ${RATINGS.MAX_RATING}`;

  useEffect(() => {
    setRatingGradientId(randomString());
  }, []);

  return (
    <div css={styles.container}>
      <div css={styles.ratingContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          css={{ height: 0, width: 0 }}
          aria-hidden="true"
          focusable="false"
          width="100%"
          height="100%"
          viewBox={`0 0 ${ICON_SIZES.FIVE_STARS.w} ${ICON_SIZES.FIVE_STARS.h}`}
        >
          <linearGradient
            id={ratingGradientId}
            gradientUnits="userSpaceOnUse"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              offset={`${ratingFillWidth}%`}
              stopColor={COLORS.GLOBAL.ORANGE}
            />
            <stop offset="0%" stopColor={COLORS.DARK.GRAY_40} />
          </linearGradient>
        </svg>
        <Icon
          css={[
            { '--rating-gradient-id': `url(#${ratingGradientId})` },
            styles.ratingStars,
          ]}
          name={ICONS.FIVE_STARS}
        />
        <div css={[typography.primaryHeadline, styles.rating]}>
          {formattedRating}
        </div>
        <span css={screenReaderText}>{a11yLabel}</span>
      </div>
      <div css={[typography.bodyCopy, styles.ratingLabel]}>
        {ratingLabel}
        {ratingLabelIcon && (
          <Icon css={styles.iconVerified} name={ratingLabelIcon.svgId} />
        )}
      </div>
    </div>
  );
}

export default Ratings;
