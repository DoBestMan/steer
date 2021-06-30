import { boolean, number, select, text } from '@storybook/addon-knobs';

import { OrderStatus } from '../OrderTrackingResult.utils';
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
  const orderId = number('Order ID', 3170272);
  const status = select('Order status', OrderStatus, OrderStatus.DELIVERED);
  const deliveryExpected = text('Delivery Expected Label', 'June 6 - June 12');
  const isBusinessHours = boolean('Is Business Hours', true);

  return (
    <OrderHeader
      customerServiceNumber={customerServiceNumber}
      deliveryExpectedLabel={deliveryExpected}
      id={orderId}
      isCustomerServiceEnabled={isBusinessHours}
      orderStatus={status}
      showBackButton={false}
    />
  );
}
