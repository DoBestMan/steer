import styles from './UserReview.styles';

import { typography } from '~/styles/typography.styles';
import GridItem from '~/components/global/Grid/GridItem';

export interface UserReviewProps {
  avatarURL: string;
  name: string;
  review: string;
  title: string;
}

function UserReview({ avatarURL, name, review, title }: UserReviewProps) {
  return (
    <GridItem
      as="div"
      gridColumnS="1/5"
      gridColumnM="5/8"
      gridColumnL="8/13"
      css={styles.container}
      isGrid
    >
      <GridItem
        as="div"
        gridColumnS="1/4"
        gridColumnM="1/3"
        gridColumnL="1/4"
        css={[typography.bodyCopy, styles.review]}
      >
        <div css={styles.title}>{title}</div>
        {review}
        <br />
        {name}
      </GridItem>
      <GridItem
        as="div"
        gridColumnS="4/5"
        gridColumnM="3/4"
        gridColumnL="5/6"
        css={[styles.avatar, { backgroundImage: `url("${avatarURL}")` }]}
      ></GridItem>
    </GridItem>
  );
}

export default UserReview;
