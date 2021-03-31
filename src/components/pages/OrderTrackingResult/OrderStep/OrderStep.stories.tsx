import { orderShippingStageListMock } from '../OrderTrackingResult.mock';
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

export function OrderSteps() {
  const displayedSteps = orderShippingStageListMock
    .sort((a, b) => b.sort - a.sort)
    .slice();
  return (
    <div css={styles.wrapper}>
      {displayedSteps.map((item, i) => (
        <OrderStep
          {...item}
          numberOfSteps={orderShippingStageListMock.length}
          stepIndex={i}
          key={i}
        />
      ))}
    </div>
  );
}
