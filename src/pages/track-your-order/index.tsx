import OrderTrackingPage from '~/components/pages/OrderTrackingPage/OrderTrackingPage';
import { OrderTrackingContextProvider } from '~/components/pages/OrderTrackingResult/OrderTrackingResult.context';

function Tracking() {
  return (
    <OrderTrackingContextProvider>
      <OrderTrackingPage />
    </OrderTrackingContextProvider>
  );
}

export default Tracking;
