import Icon from '~/components/global/Icon/Icon';
import StarsWithRating from '~/components/global/Stars/StarsWithRating';
import { SiteIcon } from '~/data/models/SiteIcon';
import { typography } from '~/styles/typography.styles';

import styles from './Ratings.styles';

interface Props {
  ratingLabel: string;
  ratingLabelIcon: SiteIcon | null;
  ratingStars: number;
}

function Ratings({ ratingLabel, ratingLabelIcon, ratingStars }: Props) {
  return (
    <div css={[typography.primaryHeadline, styles.container]}>
      <StarsWithRating
        number={ratingStars}
        typographyStyle={typography.primaryHeadline}
      />
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
