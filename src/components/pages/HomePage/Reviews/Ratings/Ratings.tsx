import Icon from '~/components/global/Icon/Icon';
import Stars from '~/components/global/Stars/Stars';
import { SiteIcon } from '~/data/models/SiteIcon';
import { RATINGS } from '~/lib/constants';
import { numberWithDecimal } from '~/lib/utils/number';
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
  const formattedRating = numberWithDecimal(ratingStars);
  const a11yLabel = ` ${ui('common.ratings.outOf')} ${RATINGS.MAX_RATING}`;

  return (
    <div css={styles.container}>
      <div css={styles.ratingContainer}>
        <Stars number={ratingStars} />
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
