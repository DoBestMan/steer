import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import BaseLink from '~/components/global/Link/BaseLink';
import Stars from '~/components/global/Stars/Stars';
import { RATINGS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { screenReaderText } from '~/styles/document/accessibility.styles';

import styles from './RatingsTable.styles';
import RatingsTableSort from './RatingsTableSort';

interface Review {
  id: string;
  rating: number;
  ratingsQuantity: number;
  tire: string;
}

interface Props {
  reviews: Review[];
}

const CONSTANTS = {
  MAX_REVIEWS_TO_DISPLAY: 20,
};

function Results({ reviews }: Props) {
  const [numVisibleReviews, setNumVisibleReviews] = useState(
    CONSTANTS.MAX_REVIEWS_TO_DISPLAY,
  );

  const hasMoreReviews = reviews.length > numVisibleReviews;

  function handleSeeMoreClick() {
    setNumVisibleReviews((prev) => (prev += CONSTANTS.MAX_REVIEWS_TO_DISPLAY));
  }

  return (
    <>
      <RatingsTableSort resultsCount={reviews.length} />
      <table css={styles.container}>
        <Grid as="thead" css={styles.headingText}>
          <GridItem
            gridColumnS="2/6"
            gridColumnM="2/8"
            gridColumnL="3/13"
            gridColumnXL="4/12"
            isGrid
            as="tr"
          >
            <GridItem
              as="th"
              css={styles.column}
              gridColumnS="1/3"
              gridColumnM="1/4"
              gridColumnL="1/7"
              gridColumnXL="1/6"
            >
              {ui('tireReviews.tireHeader')}
            </GridItem>
            <GridItem
              as="th"
              css={styles.column}
              gridColumnS="3/4"
              gridColumnM="4/6"
              gridColumnL="7/9"
              gridColumnXL="6/8"
            >
              {ui('tireReviews.ratingHeader')}
            </GridItem>
            <GridItem
              as="th"
              gridColumnS="4/5"
              gridColumnM="6/7"
              gridColumnL="9/11"
              gridColumnXL="8/9"
              css={[styles.column, styles.lastColumn]}
            >
              {ui('tireReviews.numRatingsHeader')}
            </GridItem>
          </GridItem>
        </Grid>
        <Grid as="tbody">
          {reviews.slice(0, numVisibleReviews).map((review) => {
            const a11yLabel = ui('ratings.fullRating', {
              rating: review.rating,
              maxRating: RATINGS.MAX_RATING,
            });

            return (
              <GridItem
                isGrid
                gridColumnS="2/6"
                gridColumnM="2/8"
                gridColumnL="3/13"
                gridColumnXL="4/12"
                as="tr"
                css={styles.row}
                key={review.id}
              >
                <GridItem
                  as="td"
                  css={[styles.column, styles.bordered, styles.headingText]}
                  gridColumnS="1/3"
                  gridColumnM="1/4"
                  gridColumnL="1/7"
                  gridColumnXL="1/6"
                >
                  <BaseLink css={styles.link} href="/">
                    {review.tire}
                  </BaseLink>
                </GridItem>
                <GridItem
                  as="td"
                  css={[styles.column, styles.bordered]}
                  gridColumnS="3/4"
                  gridColumnM="4/6"
                  gridColumnL="7/9"
                  gridColumnXL="6/8"
                >
                  <span>
                    <Stars isSmall number={review.rating} />
                    <span css={screenReaderText}>{a11yLabel}</span>
                  </span>
                </GridItem>
                <GridItem
                  as="td"
                  css={[styles.column, styles.bordered, styles.lastColumn]}
                  gridColumnS="4/5"
                  gridColumnM="6/7"
                  gridColumnL="9/11"
                  gridColumnXL="8/9"
                >
                  {review.ratingsQuantity}
                  <span css={screenReaderText}>{ui('ratings.ratings')}</span>
                </GridItem>
              </GridItem>
            );
          })}
        </Grid>
      </table>

      {hasMoreReviews && (
        <div css={styles.buttonContainer}>
          <Button onClick={handleSeeMoreClick}>{ui('tireReviews.more')}</Button>
        </div>
      )}
    </>
  );
}

export default Results;
