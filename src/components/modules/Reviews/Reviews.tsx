import UserReview from './UserReview/UserReview';
import Ratings from './Ratings/Ratings';
import Press from './Press/Press';

import styles from './Reviews.styles';

import { typography } from '~/styles/typography.styles';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { layout } from '~/styles/layout.styles';
import { SiteReviews } from '~/data/models/SiteReviews';

function Reviews({
  body,
  link,
  linkLabel,
  ratingStars,
  ratingLabel,
  ratingLabelIcon,
  siteReviewList,
  title,
}: SiteReviews) {
  return (
    <>
      <GridItem gridColumnM="2/5" gridColumnL="3/7">
        <div
          css={[layout.hideOnSmall, typography.primaryHeadline, styles.title]}
        >
          {title}
        </div>
        <Ratings
          ratingStars={ratingStars}
          ratingLabel={ratingLabel}
          ratingLabelIcon={ratingLabelIcon}
        />
        <div
          css={[layout.hideOnSmall, typography.bodyCopy, styles.description]}
        >
          {body}
        </div>
        <Link
          href={link.href}
          css={[layout.hideOnSmall, styles.link]}
          {...link.isExternal}
        >
          {linkLabel}
        </Link>
      </GridItem>
      <GridItem as="div" gridColumnM="5/8" gridColumnL="8/13">
        {siteReviewList.map((review) => (
          <UserReview {...review} key={review.id} />
        ))}
        <Press />
      </GridItem>
    </>
  );
}

export default Reviews;
