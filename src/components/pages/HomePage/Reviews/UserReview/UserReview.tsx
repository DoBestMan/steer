import styles from './UserReview.styles';

import { typography } from '~/styles/typography.styles';
import { SiteReviewItem } from '~/data/models/SiteReviewItem';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';

function UserReview({ authorImage, authorName, body, title }: SiteReviewItem) {
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
        {body}
        <br />
        {authorName}
      </GridItem>
      <GridItem as="div" gridColumnS="4/5" gridColumnM="3/4" gridColumnL="5/6">
        <Image
          css={styles.avatar}
          srcSet={authorImage.srcSet}
          altText={authorImage.altText}
        />
      </GridItem>
    </GridItem>
  );
}

export default UserReview;
