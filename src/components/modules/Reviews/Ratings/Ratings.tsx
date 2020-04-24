import styles from './Ratings.styles';

import { typography } from '~/styles/typography.styles';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

export interface RatingsProps {
  numberOfReviews: number;
  rating: number;
}

function Ratings({ numberOfReviews, rating }: RatingsProps) {
  const formattedRating = rating > 0 ? rating.toFixed(1) : 0;
  const ratingFillWidth = (rating / 5) * 100;
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
        Rated by {numberOfReviews.toLocaleString()} verified customers
        <Icon css={styles.iconVerified} name={ICONS.CHECK_VERIFIED} />
      </div>
    </div>
  );
}

export default Ratings;
