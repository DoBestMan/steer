import {
  VEHICLE_IMG_MAP,
  DEFAULT_SCENERY,
  DEFAULT_VEHICLE,
  SCENERY_IMG_MAP,
} from './HomeHeader.constants';
import styles from './HomeHeader.styles';

import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Image from '~/components/global/Image/Image';
import Markdown from '~/components/global/Markdown/Markdown';

import { typography } from '~/styles/typography.styles';

import { SiteHero } from '~/data/models/SiteHero';

function HomeHeader({
  body,
  eyebrow,
  sceneryType,
  title,
  vehicleType,
}: SiteHero) {
  const landscapeImg = sceneryType
    ? SCENERY_IMG_MAP[sceneryType]
    : DEFAULT_SCENERY;
  const vehicleImage = vehicleType
    ? VEHICLE_IMG_MAP[vehicleType]
    : DEFAULT_VEHICLE;
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
