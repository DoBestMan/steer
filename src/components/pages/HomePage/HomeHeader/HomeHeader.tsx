import Car from '~/components/global/Car/Car';
import { CAR_SIZES } from '~/components/global/Car/Car.constants';
import { Cars } from '~/components/global/Car/Car.types';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/Markdown';
import Scenary from '~/components/global/Scenery/Scenery';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import Weather from '~/components/global/Weather/Weather';
import { SiteHero } from '~/data/models/SiteHero';
import { typography } from '~/styles/typography.styles';

import styles from './HomeHeader.styles';

function HomeHeader({
  body,
  eyebrow,
  sceneryType,
  title,
  vehicleTypes,
  weatherType,
}: SiteHero) {
  // TODO: Temp before given by data
  // Needs to do Car rotation from Array of Cars
  const carId =
    vehicleTypes && vehicleTypes.length ? vehicleTypes[0] : Cars['car--sedan'];

  // Default landscape in case data doesn't provide one
  if (!sceneryType) {
    sceneryType = Sceneries['scenery--rural'];
  }

  return (
    <div css={styles.container}>
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
        </GridItem>
      </Grid>

      <Weather weatherID={weatherType} css={styles.weather} />

      <Scenary css={styles.scenery} sceneryID={sceneryType} animate />

      <Car
        solid
        animateWheel
        carId={carId}
        size={CAR_SIZES.SMALL}
        css={styles.vehicle}
      />
    </div>
  );
}

export default HomeHeader;
