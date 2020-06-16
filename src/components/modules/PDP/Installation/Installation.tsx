import { CARS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import Link from '~/components/global/Link/Link';
import { SCENERIES } from '~/components/global/Scenery/Scenery.constants';
import { useInViewport } from '~/hooks/useInViewport';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './Installation.styles';
import InstallationAnimation from './InstallationIllustration';

export interface Props {
  carID: string;
  sceneryID: string;
}

function Installation({
  carID = CARS.AUDI_A6,
  sceneryID = SCENERIES.URBAN,
}: Props) {
  const { isInViewport, targetRef } = useInViewport({
    shouldUnsubscribeInViewport: true,
  });

  return (
    <div ref={targetRef}>
      <Grid>
        <GridItem
          as="h2"
          gridColumnL="3/8"
          gridColumnXL="3/7"
          gridRowL="1"
          css={styles.headline}
        >
          {ui('pdp.installation.headline')}
        </GridItem>
        <GridItem
          as="h3"
          gridColumnL="3/8"
          gridColumnXL="3/7"
          gridRowL="2/5"
          css={styles.title}
        >
          {ui('pdp.installation.title')}
        </GridItem>
        <GridItem css={styles.illustrationContainer} fullbleed>
          <InstallationAnimation
            aria-label={ui('pdp.installation.illustrationAltText')}
            carID={carID}
            sceneryID={sceneryID}
            animateIn={isInViewport}
            css={styles.illustration}
          />
        </GridItem>
        <GridItem
          as="h4"
          gridColumnM="2/6"
          gridColumnL="8/12"
          gridColumnXL="8/11"
          gridRowL="3"
          css={styles.subtitle}
        >
          {ui('pdp.installation.subtitle')}{' '}
          <Icon name={ICONS.KEYS} css={styles.subtitleIcon} />
        </GridItem>
        <GridItem
          as="p"
          gridColumnM="2/6"
          gridColumnL="8/12"
          gridColumnXL="8/11"
          gridRowL="4"
          css={styles.description}
        >
          {ui('pdp.installation.description')}{' '}
          <Link href="#" theme={THEME.LIGHT} css={styles.descriptionLink}>
            {ui('pdp.installation.learnMore')}
          </Link>
        </GridItem>
      </Grid>
    </div>
  );
}

export default Installation;
