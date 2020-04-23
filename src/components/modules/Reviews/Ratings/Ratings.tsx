import styles from './Ratings.styles';

import { typography } from '~/styles/typography.styles';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';

export interface RatingsProps {
  numberOfReviews: number;
  rating: number;
}

function Ratings(props: RatingsProps) {
  const { numberOfReviews, rating } = props;
  const ratingFillWidth = (rating / 5) * 100;
  return (
    <div css={styles.container}>
      <div css={styles.ratingContainer}>
        <div css={styles.starContainer}>
          <div css={styles.greyStars}>
            <Icon name={ICONS.STAR} />
            <Icon name={ICONS.STAR} />
            <Icon name={ICONS.STAR} />
            <Icon name={ICONS.STAR} />
            <Icon name={ICONS.STAR} />
          </div>
          <div css={[styles.orangeStars, { width: `${ratingFillWidth}%` }]}>
            <Icon name={ICONS.STAR} />
            <Icon name={ICONS.STAR} />
            <Icon name={ICONS.STAR} />
            <Icon name={ICONS.STAR} />
            <Icon name={ICONS.STAR} />
          </div>
        </div>
        <div css={[styles.rating, typography.primaryHeadline]}>{rating}</div>
      </div>
      <div css={[styles.ratingCopy, typography.bodyCopy]}>
        Rated by {numberOfReviews} verified customers
        <Icon name={ICONS.CHECK_VERIFIED} />
      </div>
    </div>
  );
}

export default Ratings;
