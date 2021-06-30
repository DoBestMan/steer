import { useRouter } from 'next/router';

import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Link from '~/components/global/Link/Link';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import { THEME } from '~/lib/constants';
import { getSSOLoginURL } from '~/lib/utils/sso';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import OrderTrackingForm from './OrderTrackingForm/OrderTrackingForm';
import styles from './OrderTrackingPage.styles';

function OrderTrackingPage() {
  const router = useRouter();
  const isComingForReturn = router.query.return && router.query.return;
  const title =
    isComingForReturn === '1'
      ? ui('tracking.orderReturnTitle')
      : ui('tracking.orderTrackingTitle');

  return (
    <Grid css={styles.container}>
      <GridItem css={styles.header}>
        <h1 css={styles.title}>{title}</h1>
        <p css={styles.description}>
          {uiJSX('tracking.orderTrackingDescription', {
            login: (
              <Link
                href={getSSOLoginURL()}
                key="login"
                theme={THEME.LIGHT}
                isExternal={false}
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
