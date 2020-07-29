import { ui } from '~/lib/utils/ui-dictionary';

import {
  getCancelledContactCopy,
  getOrderStatusDate,
  getOrderStatusLabel,
  OrderStatus,
} from '../OrderTrackingResult.utils';
import styles from './OrderHeader.styles';

interface Props {
  customerServiceNumber: { display: string; value: string };
  deliveredAt?: Date | null;
  deliveryExpectedLabel?: string | null;
  id: string;
  isCustomerServiceEnabled: boolean;
  orderStatus: OrderStatus;
}

function OrderHeader({
  customerServiceNumber,
  deliveredAt,
  deliveryExpectedLabel,
  id,
  isCustomerServiceEnabled,
  orderStatus,
}: Props) {
  const orderStatusLabel = getOrderStatusLabel(
    orderStatus,
    deliveryExpectedLabel,
  );
  const orderStatusDate = getOrderStatusDate({
    orderStatus,
    deliveredAt,
    deliveryExpectedLabel,
  });
  const isExpectingDelivery =
    orderStatus !== OrderStatus.CANCELLED &&
    orderStatus !== OrderStatus.DELIVERED;

  return (
    <>
      <h3 css={styles.orderNumber}>
        {ui('tracking.orderNumber', { number: id })}
      </h3>
      <h1
        css={[
          styles.orderStatusLabel,
          isExpectingDelivery && styles.expectingDelivery,
        ]}
      >
        {orderStatusLabel && <span>{orderStatusLabel} </span>}
        {orderStatusDate && <span>{orderStatusDate}</span>}
      </h1>
      {orderStatus === OrderStatus.CANCELLED && (
        <span css={styles.canceledOrderHelp}>
          <span>{ui('tracking.cancelledHelp')}</span>
          <span>
            {getCancelledContactCopy({
              customerServiceNumber,
              isCustomerServiceEnabled,
            })}
          </span>
        </span>
      )}
    </>
  );
}

export default OrderHeader;
