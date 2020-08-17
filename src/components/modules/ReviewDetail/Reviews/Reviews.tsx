import Button from '~/components/global/Button/Button';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import ReviewCard, {
  ReviewCardProps,
} from '~/components/global/ReviewCard/ReviewCard';
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
}

function Reviews({
  onSeeMoreClick,
  reviews,
  sources,
  title,
  total = 0,
}: ReviewsProps) {
  const hasMoreReviews = reviews.length < total;
  const hasSources = sources?.simpleTire || sources?.googleShopping;

  return (
    <Grid as="section">
      <GridItem gridColumnL="3/13" gridColumnXL="4/12" css={styles.container}>
        <div css={styles.header}>
          <div css={styles.titleContainer}>
            <h2 css={styles.title}>{title}</h2>
            {!!hasSources && (
              <span css={styles.sources}>
                {!!sources?.simpleTire && (
                  <span css={styles.source}>
                    {ui('reviews.simpleTire.name', {
                      number: sources.simpleTire,
                      preposition: ui('reviews.simpleTire.preposition'),
                    })}
                  </span>
                )}
                {!!sources?.googleShopping && (
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
      {!!reviews?.length && (
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
    </Grid>
  );
}

export default Reviews;
