import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import Markdown from '~/components/global/Markdown/Markdown';
import { SiteHero } from '~/data/models/SiteHero';
import { typography } from '~/styles/typography.styles';

import {
  DEFAULT_SCENERY,
  DEFAULT_VEHICLE,
  SCENERY_IMG_MAP,
} from './HomeHeader.constants';
import styles from './HomeHeader.styles';

function HomeHeader({ body, eyebrow, sceneryType, title }: SiteHero) {
  const landscapeImg =
    (sceneryType && SCENERY_IMG_MAP[sceneryType]) || DEFAULT_SCENERY;
  const vehicleImage = DEFAULT_VEHICLE;
  const backgroundImage = {
    backgroundImage: `url(${landscapeImg})`,
  };

  return (
    <div css={[styles.container, backgroundImage]}>
      <Grid>
        <GridItem gridColumnS="2/6" gridColumnM="2/8" gridColumnXL="2/8">
          {eyebrow && (
            <div css={styles.eyebrow}>
              <span css={typography.eyebrow}>{eyebrow}</span>
            </div>
          )}
          <h1 css={[typography.jumboHeadline, styles.title]}>
            <Markdown>{title}</Markdown>
          </h1>

          <p css={[typography.bodyCopy, styles.description]}>
            <Markdown>{body}</Markdown>
          </p>

          <Image srcSet={vehicleImage} altText="" css={styles.vehicle} />
        </GridItem>
      </Grid>
    </div>
  );
}

export default HomeHeader;
