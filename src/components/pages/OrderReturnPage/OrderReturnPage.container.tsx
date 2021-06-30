import { useRouter } from 'next/router';
import { useEffect } from 'react';

import OrderLoading from '~/components/pages/OrderTrackingResult/OrderLoading/OrderLoading';
import { useOrderTrackingContext } from '~/components/pages/OrderTrackingResult/OrderTrackingResult.context';
import { useSiteGlobalsContext } from '~/context/SiteGlobals.context';
import { OrderProduct } from '~/data/models/OrderProduct';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { hex2a } from '~/lib/utils/string';

import OrderReturnPage from './OrderReturnPage';

type OrderItemProps = OrderProduct & OrderTrackingInput;

function OrderReturnPageContainer() {
  const {
    customerServiceEnabled,
    customerServiceNumber,
  } = useSiteGlobalsContext();

  const router = useRouter();

  let orderId = router.query.orderId ?? router.query.track_order;
  let zip = router.query.zip ?? router.query.track_shipping_zip;
  let id = router.query.id ?? router.query.track_order;

  if (orderId && zip && zip.length > 5) {
    orderId = hex2a(orderId.toString());
    zip = hex2a(zip.toString());
    id = hex2a(orderId.toString());
  }

  const {
    getOrderTracking,
    hasError,
    isLoadingOrder,
    order,
    isLoadingReturnReasons,
    returnTireData,
    returnReasons,
    errorInReturnReasons,
    getReturnReasons,
    sendReturnRequest,
    isSendingReturnOrCancelReq,
    returnOrCancelReqError,
    returnOrCancelReqSent,
  } = useOrderTrackingContext();

  useEffect(() => {
    if (returnOrCancelReqSent) {
      window.scrollTo(0, 0);
      setTimeout(() => {
        router.push({
          pathname: ROUTE_MAP[ROUTES.ORDER_TRACKING_RESULT],
          query: { orderId, zip },
        });
      }, 500);
    }
  }, [isSendingReturnOrCancelReq, orderId, returnOrCancelReqSent, router, zip]);

  useEffect(() => {
    if (!returnTireData && !isLoadingReturnReasons && order) {
      // checking if the product ID exist in the URL
      const { orderProducts } = order;
      const orderInQuery = orderProducts.filter(
        (item: OrderProduct) => item.productId.toString() === id,
      );
      if (orderInQuery && orderInQuery.length > 0) {
        // checking if the user can return/cancel return
        const selectedProduct = orderInQuery[0];
        const { canCustomerCancelReturn, canCustomerReturn } = selectedProduct;
        if (canCustomerCancelReturn || canCustomerReturn) {
          getReturnReasons({
            ...selectedProduct,
            orderId: String(order.id),
            zip: String(zip),
          } as OrderItemProps);
        } else {
          // if cannot return/cancel return redirect back to order tracking result
          router.push({
            pathname: ROUTE_MAP[ROUTES.ORDER_TRACKING_RESULT],
            query: { orderId, zip },
          });
        }
      } else if (orderId && zip) {
        router.push({
          pathname: ROUTE_MAP[ROUTES.ORDER_TRACKING_RESULT],
          query: { orderId, zip },
        });
      } else {
        router.push(ROUTE_MAP[ROUTES.ORDER_TRACKING]);
      }
    }
  }, [
    isLoadingReturnReasons,
    returnTireData,
    getReturnReasons,
    order,
    orderId,
    zip,
    id,
    router,
  ]);

  useEffect(() => {
    errorInReturnReasons && router.push(ROUTE_MAP[ROUTES.ORDER_TRACKING]);
  }, [errorInReturnReasons, router]);

  useEffect(() => {
    if (!order && !isLoadingOrder && !hasError) {
      getOrderTracking({ orderId, zip } as OrderTrackingInput);
    }
  }, [order, isLoadingOrder, hasError, orderId, zip, getOrderTracking]);

  useEffect(() => {
    hasError && router.push(ROUTE_MAP[ROUTES.ORDER_TRACKING]);
  }, [hasError, router]);

  if (isLoadingOrder || !order || isLoadingReturnReasons || !returnTireData) {
    return <OrderLoading />;
  }

  return (
    returnTireData && (
      <OrderReturnPage
        {...returnTireData}
        orderId={order.id}
        orderStatus={order.status}
        returnReasons={returnReasons}
        zip={zip}
        isSendingReturnOrCancelReq={isSendingReturnOrCancelReq}
        returnOrCancelReqError={returnOrCancelReqError}
        sendReturnRequest={sendReturnRequest}
        isCustomerServiceEnabled={customerServiceEnabled}
        customerServiceNumber={customerServiceNumber}
      />
    )
  );
}

export default OrderReturnPageContainer;
