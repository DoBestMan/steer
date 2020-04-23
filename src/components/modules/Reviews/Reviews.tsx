import UserReview, { UserReviewProps } from './UserReview/UserReview';
import Ratings, { RatingsProps } from './Ratings/Ratings';
import Press, { PressReviewProps } from './Press/Press';

import styles from './Reviews.styles';

import { typography } from '~/styles/typography.styles';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';

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

function Reviews(props: Props) {
  const {
    description,
    link,
    numberOfReviews,
    pressReviews,
    rating,
    title,
    userReviews,
  } = props;
  return (
    <Grid>
      <GridItem gridColumnM="2/5" gridColumnL="3/7">
        <div css={[styles.title, typography.primaryHeadline]}>{title}</div>
        <Ratings numberOfReviews={numberOfReviews} rating={rating} />
        <div css={[styles.description, typography.bodyCopy]}>{description}</div>
        <Link href={link.href} css={styles.link}>
          {link.title}
        </Link>
      </GridItem>
      <GridItem as="div" gridColumnM="5/8" gridColumnL="8/13">
        {userReviews.map((review, index) => {
          return <UserReview {...review} key={`user-review-${index}`} />;
        })}
        <Press pressReviews={pressReviews} />
      </GridItem>
    </Grid>
  );
}

export default Reviews;
