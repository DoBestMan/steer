import styles from './Ratings.styles';

import { typography } from '~/styles/typography.styles';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { SiteIcon } from '~/data/models/SiteIcon';

interface Props {
  ratingLabel: string;
  ratingLabelIcon: SiteIcon | null;
  ratingStars: number;
}

function Ratings({ ratingLabel, ratingLabelIcon, ratingStars }: Props) {
  const formattedRating = ratingStars > 0 ? ratingStars.toFixed(1) : 0;
  const ratingFillWidth = (ratingStars / 5) * 100;
  return (
    <div css={styles.container}>
      <div css={styles.ratingContainer}>
        <div css={styles.starContainer}>
          <Icon name={ICONS.FIVE_STARS} />
          <div css={[styles.orangeStars, { width: `${ratingFillWidth}%` }]}>
            <Icon name={ICONS.FIVE_STARS} />
          </div>
        </div>
        <div css={[typography.primaryHeadline, styles.rating]}>
          {formattedRating}
        </div>
      </div>
      <div css={[typography.bodyCopy, styles.ratingCopy]}>
        {ratingLabel}
        {ratingLabelIcon && (
          <Icon css={styles.iconVerified} name={ratingLabelIcon.svgId} />
        )}
      </div>
    </div>
  );
}

export default Ratings;
