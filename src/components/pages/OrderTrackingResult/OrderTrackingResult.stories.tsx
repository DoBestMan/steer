import { boolean, select, text } from '@storybook/addon-knobs';
import { useState } from 'react';

import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';

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

const initialState = {
  orderId: '12345',
  zip: '12345',
};

export function OrderTrackingResultWithKnobs() {
  const [orderDetails, setOrderIdZip] = useState<OrderTrackingInput>(
    initialState,
  );
  const orderID = text('OrderId', '3170272');
  const status = select('Order status', OrderStatus, OrderStatus.DELIVERED);
  const deliveryExpected = text('Delivery Expected Label', 'June 6 - June 12');
  const maskedEmail = text('Mail', 'a****b@gmail.com');
  const isBusinessHours = boolean('Is Business Hours', true);
  const isSendingEmail = boolean('Is Sending Email', false);
  const isEmailSent = boolean('Is Email Sent', false);
  const zipCode = '12345';
  const sendEmailReciept = ({ orderId, zip }: OrderTrackingInput) => {
    setOrderIdZip({ ...orderDetails, orderId, zip });
  };
  return (
    <OrderTrackingResult
      customerServiceNumber={customerServiceNumber}
      deliveryExpectedLabel={deliveryExpected}
      id={Number(orderID)}
      isCustomerServiceEnabled={isBusinessHours}
      orderProductList={orderItemsMock}
      shippingAddress={orderAddressMock}
      status={status}
      is_split
      maskedEmail={maskedEmail}
      orderInstallerAppointment={orderAppointmentMock}
      orderShippingStageList={orderShippingStageListMock}
      sendEmailReciept={sendEmailReciept}
      isSendingEmail={isSendingEmail}
      emailSent={isEmailSent}
      orderId={orderID}
      zip={zipCode}
    />
  );
}
