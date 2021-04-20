import OrderReturnPageContainer from '~/components/pages/OrderReturnPage/OrderReturnPage.container';
import { OrderTrackingContextProvider } from '~/components/pages/OrderTrackingResult/OrderTrackingResult.context';

function OrderReturn() {
  return (
    <OrderTrackingContextProvider>
      <OrderReturnPageContainer />
    </OrderTrackingContextProvider>
  );
}

export default OrderReturn;
