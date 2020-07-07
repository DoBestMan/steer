import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import OrderTrackingForm from './OrderTrackingForm/OrderTrackingForm';
import styles from './OrderTrackingPage.styles';
import OrderTrackingPageIllustration from './OrderTrackingPageIllustration';

function OrderTrackingPage() {
  const handleLoginClick = () => {
    // TODO open subnav to account modal
  };

  return (
    <Grid css={styles.root}>
      <GridItem css={styles.header}>
        <h1 css={styles.title}>{ui('tracking.orderTrackingTitle')}</h1>
        <p css={styles.description}>
          {uiJSX('tracking.orderTrackingDescription', {
            login: (
              <button key="login" onClick={handleLoginClick}>
                Login
              </button>
            ),
          })}
        </p>
      </GridItem>
      <GridItem>
        <OrderTrackingForm />
      </GridItem>
      <OrderTrackingPageIllustration />
    </Grid>
  );
}

export default OrderTrackingPage;
