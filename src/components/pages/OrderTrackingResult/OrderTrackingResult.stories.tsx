import { boolean, number, select, text } from '@storybook/addon-knobs';
import { useState } from 'react';

import { OrderProduct } from '~/data/models/OrderProduct';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';

import OrderTrackingResult from './OrderTrackingResult';
import {
  cancelReturnRequestMock,
  getReturnReasonsMock,
  orderAddressMock,
  orderAppointmentMock,
  orderItemsMock,
  orderShippingStageListMock,
} from './OrderTrackingResult.mock';
import { OrderStatus } from './OrderTrackingResult.utils';

interface RequestType {
  type: string;
}
type ReturnRequestProps = ReturnRequestInput & RequestType;
type ReturnReasonDataProps = OrderProduct & OrderTrackingInput;

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
  const [sendRequestParams, setStateForSendRequest] = useState<
    ReturnRequestProps
  >(cancelReturnRequestMock);
  const [getReasonsParams, setStateForReturnReasons] = useState<
    ReturnReasonDataProps
  >(getReturnReasonsMock);
  const orderID = text('OrderId', '3170272');
  const status = select('Order status', OrderStatus, OrderStatus.DELIVERED);
  const deliveryExpected = text('Delivery Expected Label', 'June 6 - June 12');
  const maskedEmail = text('Mail', 'a****b@gmail.com');
  const isBusinessHours = boolean('Is Business Hours', true);
  const isSendingEmail = boolean('Is Sending Email', false);
  const isEmailSent = boolean('Is Email Sent', false);
  const zipCode = '12345';
  const isSendingReturnOrCancelReq = boolean(
    'Is Sending Return or Cancel Request',
    false,
  );
  const returnOrCancelReqSent = boolean(
    'Is Return or Cancel Request Sent',
    false,
  );
  const returnOrCancelReqError = boolean(
    'Has Return or Cancel Request failed',
    false,
  );
  const isLoadingReturnReasons = boolean('Is loading Return Reasons', false);

  const sendEmailReciept = ({ orderId, zip }: OrderTrackingInput) => {
    setOrderIdZip({ ...orderDetails, orderId, zip });
  };

  const sendReturnRequest = (data: ReturnRequestProps) => {
    setStateForSendRequest({
      ...sendRequestParams,
      ...data,
    });
  };

  const getReturnReasons = (data: ReturnReasonDataProps) => {
    setStateForReturnReasons({
      ...getReasonsParams,
      ...data,
    });
  };
  const returnInitializedReasonId = number('Return Reason Id', 1);

  return (
    <OrderTrackingResult
      returnInitializedReasonId={returnInitializedReasonId}
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
      isSendingReturnOrCancelReq={isSendingReturnOrCancelReq}
      returnOrCancelReqSent={returnOrCancelReqSent}
      returnOrCancelReqError={returnOrCancelReqError}
      isLoadingReturnReasons={isLoadingReturnReasons}
      getReturnReasons={getReturnReasons}
      sendReturnRequest={sendReturnRequest}
    />
  );
}
