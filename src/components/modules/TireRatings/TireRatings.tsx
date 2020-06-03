import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import MomentList, {
  MomentListItem,
} from '~/components/global/MomentList/MomentList';
import RatingsList, {
  RatingsListItem,
} from '~/components/global/RatingsList/RatingsList';
import { typography } from '~/styles/typography.styles';

import styles from './TireRatings.styles';

interface Props {
  momentList?: Array<MomentListItem>;
  ratings: Array<RatingsListItem>;
  title: string;
  videoId?: string;
}

function TireRatings({ videoId, momentList, ratings, title }: Props) {
  return (
    <>
      <GridItem gridColumnM="2/5" gridColumnL="3/7">
        <span css={[typography.primaryHeadline, styles.title]}>{title}</span>
      </GridItem>
      <GridItem gridColumnM="5/8" gridColumnL="8/13" css={styles.container}>
        {!!videoId && (
          <Image
            css={styles.video}
            altText=""
            srcSet="https://picsum.photos/600/300"
          />
        )}

        {!!momentList && <MomentList data={momentList} />}

        <RatingsList ratings={ratings} />
      </GridItem>
    </>
  );
}

export default TireRatings;
