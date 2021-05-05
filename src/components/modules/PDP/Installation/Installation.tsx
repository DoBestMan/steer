import { CARS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { SCENERIES } from '~/components/global/Scenery/Scenery.constants';
import { ModalContextProps } from '~/context/Modal.context';
import { useInViewport } from '~/hooks/useInViewport';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Installation.styles';
import InstallationAnimation from './InstallationIllustration';
import InstallationWhatsIncluded from './InstallationWhatsIncluded';

export interface InstallationProps {
  sceneryType?: string;
  vehicleType?: string;
}

function Installation({
  vehicleType = CARS.AUDI_A6,
  sceneryType = SCENERIES.URBAN,
  openStaticModal,
}: InstallationProps & Pick<ModalContextProps, 'openStaticModal'>) {
  const { isInViewport, targetRef } = useInViewport({
    shouldUnsubscribeInViewport: true,
  });

  return (
    <div ref={targetRef}>
      <Grid>
        <GridItem
          as="h2"
          gridColumnM="start/5"
          gridColumnL="3/8"
          gridRowL="1"
          css={styles.headline}
        >
          {ui('pdp.installation.headline')}
        </GridItem>
        <GridItem
          as="h2"
          gridColumn="start/5"
          gridColumnL="3/7"
          gridRowL="2/4"
          css={styles.title}
        >
          {ui('pdp.installation.title')}
        </GridItem>
        <GridItem
          gridColumnM="5/end"
          gridColumnL="8/end"
          gridRow="8"
          gridRowM="1/6"
        >
          <InstallationWhatsIncluded openStaticModal={openStaticModal} />
        </GridItem>
        <GridItem css={styles.illustrationContainer} fullbleed>
          <InstallationAnimation
            aria-label={ui('pdp.installation.illustrationAltText')}
            vehicleType={vehicleType}
            sceneryType={sceneryType}
            animateIn={isInViewport}
            css={styles.illustration}
          />
        </GridItem>
        <GridItem
          as="h4"
          gridColumnM="start/6"
          gridColumnL="3/8"
          gridRowL="4"
          css={styles.subtitle}
        >
          {ui('pdp.installation.subtitle')}{' '}
        </GridItem>
        <GridItem
          as="p"
          gridColumnM="start/6"
          gridColumnL="3/8"
          gridRowL="5"
          css={styles.description}
        >
          {ui('pdp.installation.description')}
        </GridItem>
      </Grid>
    </div>
  );
}

export default Installation;
