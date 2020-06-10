import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import ReviewCard, {
  ReviewCardProps,
} from '~/components/global/ReviewCard/ReviewCard';
import StarsWithRating from '~/components/global/Stars/StarsWithRating';
import { SiteLink } from '~/data/models/SiteLink';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Reviews.styles';

interface Props {
  ratingStars?: number;
  reviews?: ReviewCardProps[];
  seeAllReviewsLink: SiteLink;
  seeAllReviewsLinkLabel: string;
  sources?: string[];
  title?: string;
  writeReviewLink: SiteLink;
  writeReviewLinkLabel: string;
}

function Reviews({
  ratingStars,
  reviews,
  sources,
  seeAllReviewsLink,
  seeAllReviewsLinkLabel,
  title = ui('pdp.reviews.none'),
  writeReviewLink,
  writeReviewLinkLabel,
}: Props) {
  return (
    <Grid as="section" css={styles.section}>
      <GridItem gridColumnL="3/7">
        <div css={styles.container}>
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

          <div css={styles.ratingContainer}>
            {!!ratingStars && <StarsWithRating number={ratingStars} />}
            <Link
              css={styles.cta}
              href={writeReviewLink.href}
              isExternal={writeReviewLink.isExternal}
            >
              {writeReviewLinkLabel}
            </Link>
          </div>
        </div>
      </GridItem>
      {!!reviews && (
        <GridItem gridColumnL="8/13">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}

          <Link
            css={styles.seeAll}
            href={seeAllReviewsLink.href}
            isExternal={seeAllReviewsLink.isExternal}
            icon={ICONS.CHEVRON_RIGHT}
          >
            {seeAllReviewsLinkLabel}
          </Link>
        </GridItem>
      )}
    </Grid>
  );
}

export default Reviews;
