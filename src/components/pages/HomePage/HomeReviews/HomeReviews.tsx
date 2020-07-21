import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { SiteReviews } from '~/data/models/SiteReviews';
import { layout } from '~/styles/layout.styles';
import { typography } from '~/styles/typography.styles';

import HomeRatings from './HomeRatings/HomeRatings';
import styles from './HomeReviews.styles';
import Press from './Press/Press';
import UserReview from './UserReview/UserReview';

function HomeReviews({
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
        <h2 css={[typography.primaryHeadline, styles.title]}>{title}</h2>
        <HomeRatings
          ratingStars={ratingStars}
          ratingLabel={ratingLabel}
          ratingLabelIcon={ratingLabelIcon}
        />
        <div css={[typography.bodyCopy, styles.description]}>{body}</div>
        <Link
          href={link.href}
          css={[typography.primarySubhead, layout.hideOnSmall, styles.link]}
          isExternal={link.isExternal}
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

export default HomeReviews;
