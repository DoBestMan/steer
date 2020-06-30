import Car from '~/components/global/Car/Car';
import { Cars } from '~/components/global/Car/Car.enums';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Scenery from '~/components/global/Scenery/Scenery';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import { COLORS } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import OrderTrackingForm from './OrderTrackingForm/OrderTrackingForm';
import styles from './TrackingPage.styles';

function TrackingPage() {
  const handleLoginClick = () => {
    // TODO open subnav to account modal
  };

  return (
    <Grid css={styles.root}>
      <GridItem css={styles.header}>
        <h1 css={styles.title}>{ui('tracking.orderTrackingTitle')}</h1>
        <p css={styles.description}>
          {uiJSX('tracking.orderTrackingDescription', {
            login: <button onClick={handleLoginClick}>Login</button>,
          })}
        </p>
      </GridItem>
      <GridItem>
        <OrderTrackingForm />
      </GridItem>
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
    </Grid>
  );
}

export default TrackingPage;
