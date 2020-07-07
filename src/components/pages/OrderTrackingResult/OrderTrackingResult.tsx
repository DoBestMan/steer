import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import OrderTrackingPageIllustration from '~/components/pages/OrderTrackingPage/OrderTrackingPageIllustration';
import { Order } from '~/data/models/Order';
import { ui } from '~/lib/utils/ui-dictionary';

import OrderHeader from './OrderHeader/OrderHeader';
import OrderItem from './OrderItem/OrderItem';
import OrderStep from './OrderStep/OrderStep';
import styles from './OrderTrackingResult.styles';
import {
  getAdditionalInfoLinks,
  getOrderSteps,
  orderStatusHierarchy,
} from './OrderTrackingResult.utils';

interface Props {
  customerServiceNumber: { display: string; value: string };
  isCustomerServiceEnabled: boolean;
}

type OrderTrackingResultProps = Order & Props;

function OrderTrackingResult({
  createdAt,
  customerServiceNumber,
  deliveredAt,
  deliveryExpectedLabel,
  id,
  isCustomerServiceEnabled,
  orderProductList,
  shippingAddress: { cityName, line1, line2, stateAbbr, zip },
  status,
  trackingLabel,
  trackingLink,
}: OrderTrackingResultProps) {
  const address = `${line1} ${line2} ${cityName} ${stateAbbr} ${zip}`;

  const orderStatusHierarchyValue = orderStatusHierarchy[status];
  const orderSteps = getOrderSteps({
    createdAt,
    deliveredAt,
    trackingLink,
    trackingLabel,
  });
  const displayedSteps = orderSteps
    .filter((step) => orderStatusHierarchyValue >= step.hierarchyNum)
    .reverse();

  return (
    <Grid>
      <GridItem css={styles.orderStatusWrapper}>
        <OrderHeader
          customerServiceNumber={customerServiceNumber}
          deliveryExpectedLabel={deliveryExpectedLabel}
          deliveredAt={deliveredAt}
          id={id}
          isCustomerServiceEnabled={isCustomerServiceEnabled}
          orderStatus={status}
        />
      </GridItem>
      <GridItem
        css={styles.orderInfoWrapper}
        gridColumnM="2/5"
        gridColumnL="3/8"
        gridColumnXL="4/8"
      >
        <h5 css={styles.sectionHeader}>{ui('tracking.shippingAddress')}</h5>
        <div css={styles.address}>{address}</div>
        <h5 css={styles.sectionHeader}>{ui('tracking.orderSummary')}</h5>
        <ul css={styles.orderItemsList}>
          {orderProductList.map((item, i) => (
            <li css={styles.orderItem} key={i}>
              <OrderItem {...item} />
            </li>
          ))}
        </ul>
      </GridItem>
      <GridItem
        css={styles.orderTimelineWrapper}
        gridColumnM="5/8"
        gridColumnL="8/13"
        gridColumnXL="8/12"
      >
        {displayedSteps.map(
          ({ descriptionComponent, hierarchyNum, label }, i) => (
            <OrderStep
              isCurrentStep={
                hierarchyNum > 0 && hierarchyNum === orderStatusHierarchyValue
              }
              isLastStep={i === displayedSteps.length - 1}
              isOnlyStep={hierarchyNum === 0 && orderStatusHierarchyValue === 0}
              label={label}
              descriptionComponent={descriptionComponent}
              key={i}
            />
          ),
        )}
        <div css={styles.additionalInfoWrapper}>
          <span css={styles.additionalInfo}>
            {ui('tracking.additionalInfoTitle')}
          </span>
          <span css={styles.additionalInfo}>{getAdditionalInfoLinks()}</span>
        </div>
      </GridItem>

      <OrderTrackingPageIllustration />
    </Grid>
  );
}

export default OrderTrackingResult;
