import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Stars from '~/components/global/Stars/Stars';
import { RATINGS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { screenReaderText } from '~/styles/document/accessibility.styles';

import styles from './RatingsTable.styles';

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

  function handleButtonClick() {
    setNumVisibleReviews((prev) => (prev += CONSTANTS.MAX_REVIEWS_TO_DISPLAY));
  }

  return (
    <>
      <table css={styles.container}>
        <thead css={styles.headingText}>
          <Grid as="tr">
            <GridItem
              as="th"
              css={styles.column}
              gridColumnS="2/4"
              gridColumnM="2/5"
              gridColumnL="3/9"
              gridColumnXL="4/9"
            >
              {ui('tireReviews.tireHeader')}
            </GridItem>
            <GridItem
              as="th"
              css={styles.column}
              gridColumnS="4/5"
              gridColumnM="5/6"
              gridColumnL="9/11"
              gridColumnXL="9/10"
            >
              {ui('tireReviews.ratingHeader')}
            </GridItem>
            <GridItem
              as="th"
              gridColumnS="5/6"
              gridColumnM="6/8"
              gridColumnL="11/13"
              gridColumnXL="10/12"
              css={[styles.column, styles.lastColumn]}
            >
              {ui('tireReviews.numRatingsHeader')}
            </GridItem>
          </Grid>
        </thead>
        <tbody>
          {reviews.slice(0, numVisibleReviews).map((review) => {
            const a11yLabel = ui('ratings.fullRating', {
              rating: review.rating,
              maxRating: RATINGS.MAX_RATING,
            });

            return (
              <Grid as="tr" css={styles.row} key={review.id}>
                <GridItem
                  as="td"
                  css={[styles.column, styles.headingText]}
                  gridColumnS="2/4"
                  gridColumnM="2/5"
                  gridColumnL="3/9"
                  gridColumnXL="4/9"
                >
                  {review.tire}
                </GridItem>
                <GridItem
                  as="td"
                  css={styles.column}
                  gridColumnS="4/5"
                  gridColumnM="5/6"
                  gridColumnL="9/11"
                  gridColumnXL="9/10"
                >
                  <span>
                    <Stars isSmall number={review.rating} />
                    <span css={screenReaderText}>{a11yLabel}</span>
                  </span>
                </GridItem>
                <GridItem
                  as="td"
                  gridColumnS="5/6"
                  gridColumnM="6/8"
                  gridColumnL="11/13"
                  gridColumnXL="10/12"
                  css={[styles.text, styles.column, styles.lastColumn]}
                >
                  {review.ratingsQuantity}
                  <span css={screenReaderText}>{ui('ratings.ratings')}</span>
                </GridItem>
              </Grid>
            );
          })}
        </tbody>
      </table>
      {hasMoreReviews && (
        <div css={styles.buttonContainer}>
          <Button onClick={handleButtonClick}>{ui('tireReviews.more')}</Button>
        </div>
      )}
    </>
  );
}

export default Results;
