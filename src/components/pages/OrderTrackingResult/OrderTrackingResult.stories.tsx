import { boolean, date, number, select, text } from '@storybook/addon-knobs';

import OrderTrackingResult from './OrderTrackingResult';
import {
  ORDER_ADDRESS,
  ORDER_ITEMS,
  ORDER_TRACKING_LINK,
} from './OrderTrackingResult.mocks';
import { OrderStatus } from './OrderTrackingResult.utils';

export default {
  component: OrderTrackingResult,
  title: 'OrderTracking/OrderTrackingResult',
};

const customerServiceNumber = {
  display: '(888) 410 0604',
  value: '18884100604',
};

export function OrderTrackingResultWithKnobs() {
  const orderId = text('Order ID', '3170272');
  const status = select('Order status', OrderStatus, OrderStatus.DELIVERED);
  const deliveryExpected = text('Delivery Expected Label', 'June 6 - June 12');

  const defaultDate = new Date('June 10 2020');
  const createdAt = date('Created at', defaultDate);
  const deliveredAt = date('Delivered at', defaultDate);
  const shippedAt = date('Shipped at', defaultDate);

  const numProducts = number('Num. products to show (1 - 3)', 2);
  const isBusinessHours = boolean('Is Business Hours', true);

  return (
    <OrderTrackingResult
      createdAt={new Date(createdAt)}
      customerServiceNumber={customerServiceNumber}
      deliveredAt={new Date(deliveredAt)}
      deliveryExpectedLabel={deliveryExpected}
      id={orderId}
      isCustomerServiceEnabled={isBusinessHours}
      orderProductList={ORDER_ITEMS.slice(0, numProducts)}
      shippedAt={new Date(shippedAt)}
      shippingAddress={ORDER_ADDRESS}
      status={status}
      trackingLabel="111111111111"
      trackingLink={ORDER_TRACKING_LINK}
    />
  );
}
