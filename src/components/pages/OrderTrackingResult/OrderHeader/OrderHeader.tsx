import React from 'react';

import { ui } from '~/lib/utils/ui-dictionary';

import {
  getCancelledContactCopy,
  OrderStatus,
} from '../OrderTrackingResult.utils';
import styles from './OrderHeader.styles';

interface Props {
  customerServiceNumber: { display: string; value: string };
  deliveryExpectedLabel?: string | null;
  id: number;
  isCustomerServiceEnabled: boolean;
  orderStatus: OrderStatus;
}

function OrderHeader({
  customerServiceNumber,
  deliveryExpectedLabel,
  id,
  isCustomerServiceEnabled,
  orderStatus,
}: Props) {
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
        {deliveryExpectedLabel && <span>{deliveryExpectedLabel}</span>}
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
