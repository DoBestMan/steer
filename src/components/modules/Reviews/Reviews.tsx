import UserReview, { UserReviewProps } from './UserReview/UserReview';
import Ratings, { RatingsProps } from './Ratings/Ratings';
import Press, { PressReviewProps } from './Press/Press';

import styles from './Reviews.styles';

import { typography } from '~/styles/typography.styles';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import { layout } from '~/styles/layout.styles';

interface Props extends RatingsProps {
  description: string;
  link: {
    href: string;
    title: string;
  };
  pressReviews: PressReviewProps[];
  title: string;
  userReviews: UserReviewProps[];
}

function Reviews({
  description,
  link,
  numberOfReviews,
  pressReviews,
  rating,
  title,
  userReviews,
}: Props) {
  return (
    <Grid>
      <GridItem gridColumnM="2/5" gridColumnL="3/7">
        <div
          css={[layout.hideOnSmall, typography.primaryHeadline, styles.title]}
        >
          {title}
        </div>
        <Ratings numberOfReviews={numberOfReviews} rating={rating} />
        <div
          css={[layout.hideOnSmall, typography.bodyCopy, styles.description]}
        >
          {description}
        </div>
        <Link href={link.href} css={[layout.hideOnSmall, styles.link]}>
          {link.title}
        </Link>
      </GridItem>
      <GridItem as="div" gridColumnM="5/8" gridColumnL="8/13">
        {userReviews.map((review, index) => (
          <UserReview {...review} key={`user-review-${index}`} />
        ))}
        <Press pressReviews={pressReviews} />
      </GridItem>
    </Grid>
  );
}

export default Reviews;
