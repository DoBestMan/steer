import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import MomentList, {
  MomentListItem,
} from '~/components/global/MomentList/MomentList';
import { Props as RatingsListItem } from '~/components/global/RatingsList/RatingsBar/RatingsBar';
import RatingsList from '~/components/global/RatingsList/RatingsList';
import ReviewCard, {
  ReviewCardProps,
} from '~/components/global/ReviewCard/ReviewCard';
import StarsWithRating from '~/components/global/Stars/StarsWithRating';
import { SiteLink } from '~/data/models/SiteLink';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';
import { typography } from '~/styles/typography.styles';

import styles from './Reviews.styles';

interface Sources {
  googleShopping?: number | null;
  simpleTire?: number | null;
}

export interface ReviewsProps {
  momentList?: MomentListItem[];
  ratingStars?: number;
  ratings?: RatingsListItem[];
  reviews?: ReviewCardProps[];
  seeAllReviewsLink: SiteLink;
  seeAllReviewsLinkLabel?: string;
  sources?: Sources;
  title?: string;
  writeReviewLink: SiteLink;
  writeReviewLinkLabel?: string;
}

function Reviews({
  momentList,
  ratings,
  ratingStars,
  reviews,
  sources,
  seeAllReviewsLink,
  seeAllReviewsLinkLabel = ui('reviews.seeAll'),
  title = ui('reviews.noReviews'),
  writeReviewLink,
  writeReviewLinkLabel = ui('reviews.writeReview'),
}: ReviewsProps) {
  const hasSources = sources?.simpleTire || sources?.googleShopping;

  return (
    <Grid as="section" css={styles.section}>
      <GridItem gridColumnL="3/7">
        <div css={styles.container}>
          <div css={styles.titleContainer}>
            <div css={styles.title}>{title}</div>
            {hasSources && (
              <span css={styles.sources}>
                {sources?.simpleTire && (
                  <span css={styles.source}>
                    {uiJSX('reviews.simpleTire.name', {
                      number: sources.simpleTire,
                      preposition: (
                        <span className="preposition">
                          {ui('reviews.simpleTire.preposition')}
                        </span>
                      ),
                    })}
                  </span>
                )}
                {sources?.googleShopping && (
                  <span css={styles.source}>
                    {uiJSX('reviews.google.name', {
                      number: sources?.googleShopping,
                      preposition: (
                        <span className="preposition">
                          {ui('reviews.google.preposition')}
                        </span>
                      ),
                    })}
                  </span>
                )}
              </span>
            )}
          </div>
          <div css={styles.ratingContainer}>
            {!!ratingStars && (
              <StarsWithRating
                number={ratingStars}
                typographyStyle={typography.labelHeadlineLarge}
              />
            )}
            {writeReviewLink && (
              <Link
                css={styles.cta}
                href={writeReviewLink.href}
                isExternal={writeReviewLink.isExternal}
              >
                {writeReviewLinkLabel}
              </Link>
            )}
          </div>
        </div>
      </GridItem>
      {reviews?.length && (
        <GridItem gridColumnL="8/13">
          {!!momentList && (
            <MomentList
              customContainerStyles={styles.momentList}
              data={momentList}
            />
          )}
          {!!ratings && (
            <RatingsList
              customContainerStyles={styles.ratingsList}
              ratings={ratings}
            />
          )}
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
          {seeAllReviewsLink && (
            <Link
              css={styles.seeAll}
              href={seeAllReviewsLink.href}
              isExternal={seeAllReviewsLink.isExternal}
              icon={ICONS.CHEVRON_RIGHT}
            >
              {seeAllReviewsLinkLabel}
            </Link>
          )}
        </GridItem>
      )}
    </Grid>
  );
}

export default Reviews;
