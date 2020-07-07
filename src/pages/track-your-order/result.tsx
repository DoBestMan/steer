import OrderTrackingResultContainer from '~/components/pages/OrderTrackingResult/OrderTrackingResult.container';
import { OrderTrackingContextProvider } from '~/components/pages/OrderTrackingResult/OrderTrackingResult.context';

function OrderTrackingResult() {
  return (
    <OrderTrackingContextProvider>
      <OrderTrackingResultContainer />
    </OrderTrackingContextProvider>
  );
}

export default OrderTrackingResult;
