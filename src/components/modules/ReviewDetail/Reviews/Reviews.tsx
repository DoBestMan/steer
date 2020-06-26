import { useState } from 'react';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import ReviewCard, {
  ReviewCardProps,
} from '~/components/global/ReviewCard/ReviewCard';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Reviews.styles';

interface Props {
  reviews?: ReviewCardProps[];
  sources?: string[];
}

const CONSTANTS = {
  NUM_REVIEWS_TO_DISPLAY_ON_LOAD: 5,
};

function Reviews({ reviews, sources }: Props) {
  const numReviews = !!reviews && reviews.length;

  const title = numReviews
    ? ui('reviews.numReviews', {
        quantity: numReviews,
      })
    : ui('pdp.reviews.none');

  const [numVisibleReviews, setNumVisibleReviews] = useState(
    CONSTANTS.NUM_REVIEWS_TO_DISPLAY_ON_LOAD,
  );

  const hasMoreReviews = numReviews > numVisibleReviews;

  function handleButtonClick() {
    setNumVisibleReviews(numReviews || 0);
  }

  return (
    <Grid as="section">
      <GridItem gridColumnL="3/13" gridColumnXL="4/12" css={styles.container}>
        <div css={styles.header}>
          <div css={styles.titleContainer}>
            <div css={styles.title}>{title}</div>
            {!!sources && (
              <span css={styles.sources}>
                {sources.map((source) => (
                  <span css={styles.source} key={source}>
                    {source}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      </GridItem>
      {!!reviews && (
        <>
          <GridItem gridColumnL="3/13" gridColumnXL="4/12">
            {reviews.slice(0, numVisibleReviews).map((review) => (
              <ReviewCard key={review.id} theme={THEME.LIGHT} {...review} />
            ))}
          </GridItem>
          {hasMoreReviews && (
            <GridItem
              gridColumnL="3/13"
              gridColumnXL="4/12"
              css={styles.seeAll}
            >
              <Link
                as="button"
                theme={THEME.LIGHT}
                icon={ICONS.CHEVRON_RIGHT}
                onClick={handleButtonClick}
              >
                {ui('reviews.seeAll')}
              </Link>
            </GridItem>
          )}
        </>
      )}
    </Grid>
  );
}

export default Reviews;
