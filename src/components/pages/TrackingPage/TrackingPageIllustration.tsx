import Car from '~/components/global/Car/Car';
import { Cars } from '~/components/global/Car/Car.enums';
import GridItem from '~/components/global/Grid/GridItem';
import Scenery from '~/components/global/Scenery/Scenery';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import { COLORS } from '~/lib/constants';

import styles from './TrackingPage.styles';

function TrackingPageIllustration() {
  return (
    <GridItem
      css={styles.illustration}
      gridColumnS="1/7"
      gridColumnM="1/9"
      gridColumnL="1/15"
    >
      <Scenery css={styles.scenery} sceneryID={Sceneries['scenery--urban']} />
      <Car
        css={styles.car}
        carId={Cars['car--commercial']}
        solid
        solidColor={COLORS.GLOBAL.WHITE}
      />
    </GridItem>
  );
}

export default TrackingPageIllustration;
