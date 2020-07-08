import Car from '~/components/global/Car/Car';
import GridItem from '~/components/global/Grid/GridItem';
import Scenery from '~/components/global/Scenery/Scenery';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import { COLORS } from '~/lib/constants';

import styles from './PageIllustration.styles';

interface Props {
  carId: string;
}

function PageIllustration({ carId }: Props) {
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
        carId={carId}
        solid
        solidColor={COLORS.GLOBAL.WHITE}
      />
    </GridItem>
  );
}

export default PageIllustration;
