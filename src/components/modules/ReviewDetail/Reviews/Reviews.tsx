import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import ReviewCard, {
  ReviewCardProps,
} from '~/components/global/ReviewCard/ReviewCard';
import StickyBar from '~/components/modules/StickyBar/StickyBar';
import { primaryColumnStyles } from '~/components/modules/StickyBar/StickyBar.styles';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Reviews.styles';

export interface ReviewsProps {
  onSeeMoreClick?: () => void;
  reviews: ReviewCardProps[];
  sources?: {
    googleShopping?: number | null;
    simpleTire?: number | null;
  };
  title: string;
  total?: number;
  viewTireUrl?: string;
  writeReviewUrl?: string;
}

function Reviews({
  onSeeMoreClick,
  reviews,
  sources,
  title,
  viewTireUrl,
  writeReviewUrl,
  total = 0,
}: ReviewsProps) {
  const hasMoreReviews = reviews.length < total;
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
      {reviews && (
        <>
          <GridItem gridColumnL="3/13" gridColumnXL="4/12">
            {reviews.map((review, idx) => (
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
              <Button onClick={onSeeMoreClick}>{ui('tireReviews.more')}</Button>
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
