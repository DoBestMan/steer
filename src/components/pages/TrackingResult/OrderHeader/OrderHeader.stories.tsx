import { boolean, date, select, text } from '@storybook/addon-knobs';

import { OrderStatus } from '../TrackingResult.utils';
import OrderHeader from './OrderHeader';

export default {
  component: OrderHeader,
  title: 'Tracking/OrderHeader',
};

const customerServiceNumber = {
  display: '(888) 410 0604',
  value: '18884100604',
};

export function OrderHeaderWithKnobs() {
  const orderId = text('Order ID', '3170272');
  const status = select('Order status', OrderStatus, OrderStatus.DELIVERED);
  const deliveryExpected = text('Delivery Expected Label', 'June 6 - June 12');

  const defaultDate = new Date('June 10 2020');
  const deliveredAt = date('Delivered at', defaultDate);
  const isBusinessHours = boolean('Is Business Hours', true);

  return (
    <OrderHeader
      customerServiceNumber={customerServiceNumber}
      deliveredAt={new Date(deliveredAt)}
      deliveryExpectedLabel={deliveryExpected}
      id={orderId}
      isCustomerServiceEnabled={isBusinessHours}
      orderStatus={status}
    />
  );
}
