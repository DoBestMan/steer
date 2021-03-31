import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Meta from '~/components/global/Meta/Meta';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import { Order } from '~/data/models/Order';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import OrderHeader from './OrderHeader/OrderHeader';
import OrderItem from './OrderItem/OrderItem';
import OrderStep from './OrderStep/OrderStep';
import styles from './OrderTrackingResult.styles';
import {
  getAppointmentAddressArray,
  getReturnInfoLinks,
  getShippingAddressArray,
} from './OrderTrackingResult.utils';

interface Props {
  customerServiceNumber: { display: string; value: string };
  isCustomerServiceEnabled: boolean;
}
type OrderTrackingResultProps = Order & Props;
function OrderTrackingResult({
  customerServiceNumber,
  deliveryExpectedLabel,
  id,
  isCustomerServiceEnabled,
  orderProductList,
  shippingAddress,
  status,
  orderInstallerAppointment,
  orderShippingStageList,
}: OrderTrackingResultProps) {
  const shippingAddressArray = getShippingAddressArray(shippingAddress);

  const appointmentDisplayArray =
    orderInstallerAppointment &&
    getAppointmentAddressArray(orderInstallerAppointment);

  const note = orderInstallerAppointment?.note;

  const displayedSteps = orderShippingStageList
    .sort((a, b) => b.sort - a.sort)
    .slice();

  const { bk } = useBreakpoints();

  const shippingHeader =
    appointmentDisplayArray && appointmentDisplayArray.length > 0
      ? ui('tracking.appointmentDetails')
      : ui('tracking.shippingAddress');

  const displayAddress =
    appointmentDisplayArray && appointmentDisplayArray.length > 0
      ? appointmentDisplayArray
      : shippingAddressArray;

  function renderOrderDetails() {
    return (
      <GridItem
        css={styles.orderInfoWrapper}
        gridColumnM="2/5"
        gridColumnL="3/8"
        gridColumnXL="4/8"
      >
        <h5 css={styles.sectionHeader}>{shippingHeader}</h5>
        <ul css={note ? styles.appointmentAddress : styles.shippingAddress}>
          {displayAddress.map((item, i) => (
            <li css={styles.addressTextContainer} key={i}>
              {item && <div css={styles.addressText}>{item}</div>}
            </li>
          ))}
        </ul>
        {note && <div css={styles.appointmentNote}>{note}</div>}
        <h5 css={styles.sectionHeader}>{ui('tracking.orderSummary')}</h5>
        <ul css={styles.orderItemsList}>
          {orderProductList.map((item, i) => (
            <li css={styles.orderItem} key={i}>
              <OrderItem {...item} />
            </li>
          ))}
        </ul>
        <div css={styles.additionalInfoWrapper}>
          <span css={styles.additionalInfo}>
            {ui('tracking.returnInfoTitle')}
          </span>
          <span css={[styles.additionalInfo]}>{getReturnInfoLinks()}</span>
        </div>
      </GridItem>
    );
  }
  function renderOrderSteps() {
    return (
      <GridItem
        css={styles.orderTimelineWrapper}
        gridColumnM="5/8"
        gridColumnL="8/13"
        gridColumnXL="8/12"
      >
        {displayedSteps.map((item, i) => (
          <OrderStep
            {...item}
            numberOfSteps={orderShippingStageList.length}
            stepIndex={i}
            key={i}
          />
        ))}
      </GridItem>
    );
  }
  return (
    <>
      <Meta robots="noindex,nofollow" hasCanonical={false} />
      <Grid>
        <GridItem css={styles.orderStatusWrapper}>
          <OrderHeader
            customerServiceNumber={customerServiceNumber}
            deliveryExpectedLabel={deliveryExpectedLabel}
            id={id}
            isCustomerServiceEnabled={isCustomerServiceEnabled}
            orderStatus={status}
          />
        </GridItem>
        {[BREAKPOINT_SIZES.S].includes(bk)
          ? renderOrderSteps()
          : renderOrderDetails()}
        {[BREAKPOINT_SIZES.S].includes(bk)
          ? renderOrderDetails()
          : renderOrderSteps()}
        <PageIllustration carId={CARS[CARS_KEYS.COMMERCIAL]} />
      </Grid>
    </>
  );
}
export default OrderTrackingResult;
