import { date, select } from '@storybook/addon-knobs';

import { orderTrackingLinkMock } from '../OrderTrackingResult.mock';
import {
  getOrderSteps,
  OrderStatus,
  orderStatusHierarchy,
} from '../OrderTrackingResult.utils';
import OrderStep from './OrderStep';

export default {
  component: OrderStep,
  title: 'Tracking/OrderStep',
};

const styles = {
  wrapper: {
    margin: '30px auto',
    maxWidth: 400,
  },
};

export function OrderStepsWithKnobs() {
  const status = select('Order status', OrderStatus, OrderStatus.DELIVERED);

  const defaultDate = new Date('June 10 2020');
  const createdAt = date('Created at', defaultDate);
  const deliveredAt = date('Delivered at', defaultDate);

  const orderStatusHierarchyValue = orderStatusHierarchy[status];
  const orderSteps = getOrderSteps({
    createdAt: new Date(createdAt),
    deliveredAt: new Date(deliveredAt),
    trackingLabel: '111111111111',
    trackingLink: orderTrackingLinkMock,
  });
  const displayedSteps = orderSteps
    .filter((step) => orderStatusHierarchyValue >= step.hierarchyNum)
    .reverse();

  return (
    <div css={styles.wrapper}>
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
    </div>
  );
}
