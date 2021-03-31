import { boolean, number, select, text } from '@storybook/addon-knobs';

import OrderTrackingResult from './OrderTrackingResult';
import {
  orderAddressMock,
  orderAppointmentMock,
  orderItemsMock,
  orderShippingStageListMock,
} from './OrderTrackingResult.mock';
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
  const orderId = number('OrderId', 3170272);
  const status = select('Order status', OrderStatus, OrderStatus.DELIVERED);
  const deliveryExpected = text('Delivery Expected Label', 'June 6 - June 12');
  const maskedEmail = text('Mail', 'a****b@gmail.com');
  const isBusinessHours = boolean('Is Business Hours', true);

  return (
    <OrderTrackingResult
      customerServiceNumber={customerServiceNumber}
      deliveryExpectedLabel={deliveryExpected}
      id={orderId}
      isCustomerServiceEnabled={isBusinessHours}
      orderProductList={orderItemsMock}
      shippingAddress={orderAddressMock}
      status={status}
      is_split
      maskedEmail={maskedEmail}
      orderInstallerAppointment={orderAppointmentMock}
      orderShippingStageList={orderShippingStageListMock}
    />
  );
}
