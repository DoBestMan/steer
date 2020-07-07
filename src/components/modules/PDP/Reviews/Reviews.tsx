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
import { typography } from '~/styles/typography.styles';

import styles from './Reviews.styles';

interface Props {
  momentList?: Array<MomentListItem>;
  ratingStars?: number;
  ratings?: Array<RatingsListItem>;
  reviews?: ReviewCardProps[];
  seeAllReviewsLink: SiteLink;
  seeAllReviewsLinkLabel: string;
  sources?: string[];
  title?: string;
  writeReviewLink: SiteLink;
  writeReviewLinkLabel: string;
}

function Reviews({
  momentList,
  ratings,
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
            {!!ratingStars && (
              <StarsWithRating
                number={ratingStars}
                typographyStyle={typography.labelHeadlineLarge}
              />
            )}
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
