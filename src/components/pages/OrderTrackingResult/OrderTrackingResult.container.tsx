import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';

import OrderLoading from './OrderLoading/OrderLoading';
import OrderTrackingResult from './OrderTrackingResult';
import { useOrderTrackingContext } from './OrderTrackingResult.context';

function OrderTrackingResultContainer() {
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();

  const router = useRouter();
  const { orderId, zip } = router.query;

  const {
    getOrderTracking,
    hasError,
    isLoadingOrder,
    order,
  } = useOrderTrackingContext();

  // Get the initial order information when the page loads
  useEffect(() => {
    if (!order && !isLoadingOrder && !hasError) {
      getOrderTracking({ orderId, zip } as OrderTrackingInput);
    }
  }, [order, isLoadingOrder, hasError, orderId, zip, getOrderTracking]);

  // If there's an error (no order), redirect to the order tracking form page.
  useEffect(() => {
    hasError && router.push(ROUTE_MAP[ROUTES.ORDER_TRACKING]);
  }, [hasError, router]);

  if (isLoadingOrder || !order) {
    return <OrderLoading />;
  }

  return (
    <OrderTrackingResult
      {...order}
      isCustomerServiceEnabled={customerServiceEnabled}
      customerServiceNumber={customerServiceNumber}
    />
  );
}

export default OrderTrackingResultContainer;
