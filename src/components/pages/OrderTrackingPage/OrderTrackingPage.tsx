import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import { THEME } from '~/lib/constants';
import { getLegacyAccountURL } from '~/lib/utils/legacy-routes';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import OrderTrackingForm from './OrderTrackingForm/OrderTrackingForm';
import styles from './OrderTrackingPage.styles';

function OrderTrackingPage() {
  return (
    <Grid css={styles.container}>
      <GridItem css={styles.header}>
        <h1 css={styles.title}>{ui('tracking.orderTrackingTitle')}</h1>
        <p css={styles.description}>
          {uiJSX('tracking.orderTrackingDescription', {
            login: (
              <Link
                href={getLegacyAccountURL()}
                key="login"
                theme={THEME.LIGHT}
                isExternal
              >
                Login
              </Link>
            ),
          })}
        </p>
      </GridItem>
      <GridItem>
        <OrderTrackingForm />
      </GridItem>
      <PageIllustration carId={CARS[CARS_KEYS.COMMERCIAL]} />
    </Grid>
  );
}

export default OrderTrackingPage;
