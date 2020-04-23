import styles from './UserReview.styles';

import { typography } from '~/styles/typography.styles';
import GridItem from '~/components/global/Grid/GridItem';

export interface UserReviewProps {
  avatarURL: string;
  key?: string;
  name: string;
  review: string;
  title: string;
}

function UserReview(props: UserReviewProps) {
  const { avatarURL, key, name, review, title } = props;
  return (
    <GridItem
      as="div"
      gridColumnS="1/5"
      gridColumnM="5/8"
      gridColumnL="8/13"
      css={styles.container}
      key={key}
      isGrid
    >
      <GridItem
        as="div"
        gridColumnS="1/4"
        gridColumnM="1/3"
        gridColumnL="1/4"
        css={[styles.review, typography.bodyCopy]}
      >
        <div css={styles.title}>{title}</div>
        {review}
        <br />
        {name}
      </GridItem>
      <div
        css={[styles.avatar, { backgroundImage: `url("${avatarURL}")` }]}
      ></div>
    </GridItem>
  );
}

export default UserReview;
