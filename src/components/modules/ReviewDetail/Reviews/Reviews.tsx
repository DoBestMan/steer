import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import ReviewCard, {
  ReviewCardProps,
} from '~/components/global/ReviewCard/ReviewCard';
import StickyBar from '~/components/modules/StickyBar/StickyBar';
import { primaryColumnStyles } from '~/components/modules/StickyBar/StickyBar.styles';
import { ListResultMetadata } from '~/data/models/ListResultMetadata';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Reviews.styles';

export interface ReviewsProps {
  listResultMetadata?: ListResultMetadata;
  reviews?: ReviewCardProps[] | null;
  sources?: {
    googleShopping?: number | null;
    simpleTire?: number | null;
  };
  title: string;
  viewTireUrl?: string;
  writeReviewUrl?: string;
}

const CONSTANTS = {
  NUM_REVIEWS_TO_DISPLAY_ON_LOAD: 5,
};

function Reviews({
  reviews,
  sources,
  title,
  viewTireUrl,
  writeReviewUrl,
}: ReviewsProps) {
  const numReviews = !!reviews && reviews.length;

  const [numVisibleReviews, setNumVisibleReviews] = useState(
    CONSTANTS.NUM_REVIEWS_TO_DISPLAY_ON_LOAD,
  );

  const hasMoreReviews = numReviews > numVisibleReviews;

  // TODO: Integrate pagination from listResultMetadata WCS-881
  function handleSeeMoreClick() {
    setNumVisibleReviews(
      (prev) => (prev += CONSTANTS.NUM_REVIEWS_TO_DISPLAY_ON_LOAD),
    );
  }

  const hasSources = sources?.simpleTire || sources?.googleShopping;
  const hasStickyBar = viewTireUrl && writeReviewUrl;

  return (
    <Grid as="section">
      <GridItem gridColumnL="3/13" gridColumnXL="4/12" css={styles.container}>
        <div css={styles.header}>
          <div css={styles.titleContainer}>
            <div css={styles.title}>{title}</div>
            {hasSources && (
              <span css={styles.sources}>
                {sources?.simpleTire && (
                  <span css={styles.source}>
                    {ui('reviews.simpleTire.name', {
                      number: sources.simpleTire,
                      preposition: ui('reviews.simpleTire.preposition'),
                    })}
                  </span>
                )}
                {sources?.googleShopping && (
                  <span css={styles.source}>
                    {ui('reviews.google.name', {
                      number: sources?.googleShopping,
                      preposition: ui('reviews.google.preposition'),
                    })}
                  </span>
                )}
              </span>
            )}
          </div>
        </div>
      </GridItem>
      {!!reviews && (
        <>
          <GridItem gridColumnL="3/13" gridColumnXL="4/12">
            {reviews.slice(0, numVisibleReviews).map((review, idx) => (
              <ReviewCard
                key={`${review.id}_${idx}`}
                theme={THEME.LIGHT}
                {...review}
              />
            ))}
          </GridItem>
          {hasMoreReviews && (
            <GridItem
              gridColumnL="3/13"
              gridColumnXL="4/12"
              css={styles.seeMore}
            >
              <Button onClick={handleSeeMoreClick}>
                {ui('tireReviews.more')}
              </Button>
            </GridItem>
          )}
        </>
      )}
      {hasStickyBar && (
        <GridItem fullbleed css={styles.stickyBar}>
          <StickyBar
            theme={THEME.ORANGE}
            primaryColumnCustomStyles={primaryColumnStyles.rightAlign}
          >
            <>
              <Button
                css={primaryColumnStyles.secondaryButton}
                as="a"
                href={writeReviewUrl}
              >
                {ui('reviews.writeReview')}
              </Button>
              <Button
                css={primaryColumnStyles.primaryButton}
                as="a"
                href={viewTireUrl}
                theme={THEME.ORANGE}
              >
                {ui('reviews.viewTire')}
              </Button>
            </>
          </StickyBar>
        </GridItem>
      )}
    </Grid>
  );
}

export default Reviews;
