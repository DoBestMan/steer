import Icon from '~/components/global/Icon/Icon';
import { ICON_SIZES, ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteIcon } from '~/data/models/SiteIcon';
import { COLORS, RATINGS } from '~/lib/constants';
import { numberWithDecimal, percentageFromNumber } from '~/lib/utils/number';
import { typography } from '~/styles/typography.styles';

import styles, { homeRatingGradientID } from './HomeRatings.styles';

interface Props {
  ratingLabel: string;
  ratingLabelIcon: SiteIcon | null;
  ratingStars: number;
}

function HomeRatings({ ratingLabel, ratingLabelIcon, ratingStars }: Props) {
  const formattedRating = numberWithDecimal(ratingStars);
  const ratingFillWidth = percentageFromNumber(ratingStars, RATINGS.MAX_RATING);

  return (
    <div css={[typography.primaryHeadline, styles.container]}>
      <div css={styles.starsContainer}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          css={{ height: 0, width: 0 }}
          focusable="false"
          width="100%"
          height="100%"
          viewBox={`0 0 ${ICON_SIZES.FIVE_STARS.w} ${ICON_SIZES.FIVE_STARS.h}`}
        >
          <linearGradient
            id={homeRatingGradientID}
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
            <stop offset="0%" stopColor={COLORS.GLOBAL.GRAY_50} />
          </linearGradient>
        </svg>
        <Icon css={styles.stars} name={ICONS.FIVE_STARS} />
        {formattedRating}
      </div>
      <div css={styles.ratingLabel}>
        {ratingLabel}
        {ratingLabelIcon && (
          <Icon css={styles.iconVerified} name={ratingLabelIcon.svgId} />
        )}
      </div>
    </div>
  );
}

export default HomeRatings;
