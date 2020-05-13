import Icon from '~/components/global/Icon/Icon';
import { ICON_SIZES, ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteIcon } from '~/data/models/SiteIcon';
import { COLORS } from '~/lib/constants';
import { randomString } from '~/lib/utils/string';
import { typography } from '~/styles/typography.styles';

import styles from './Ratings.styles';

interface Props {
  ratingLabel: string;
  ratingLabelIcon: SiteIcon | null;
  ratingStars: number;
}

function Ratings({ ratingLabel, ratingLabelIcon, ratingStars }: Props) {
  const formattedRating = ratingStars > 0 ? ratingStars.toFixed(1) : 0;
  const ratingFillWidth = (ratingStars / 5) * 100;
  const RATING_GRADIENT_ID = randomString();

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
            id={RATING_GRADIENT_ID}
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
            { '--rating-gradient-id': `url(#${RATING_GRADIENT_ID})` },
            styles.ratingStars,
          ]}
          name={ICONS.FIVE_STARS}
        />
        <div css={[typography.primaryHeadline, styles.rating]}>
          {formattedRating}
        </div>
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
