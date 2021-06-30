import { boolean, number, text } from '@storybook/addon-knobs';
import { useState } from 'react';

import { OrderProduct } from '~/data/models/OrderProduct';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';
import { SiteImage } from '~/data/models/SiteImage';
import { ICON_IMAGE_TYPE } from '~/lib/backend/icon-image.types';

import {
  cancelReturnRequestMock,
  getReturnReasonsMock,
  orderBrandMock,
} from '../OrderTrackingResult.mock';
import OrderItem from './OrderItem';

interface RequestType {
  type: string;
}
type ReturnRequestProps = ReturnRequestInput & RequestType;
type ReturnReasonDataProps = OrderProduct & OrderTrackingInput;

export default {
  component: OrderItem,
  title: 'Tracking/OrderItem',
};

const itemImage = {
  altText: 'Tire sidewall',
  height: 800,
  src:
    'https://images.simpletire.com/image/upload/v1591705545/line-images/1349/1349-sidetread_f24ld3.png',
  type: ICON_IMAGE_TYPE.IMAGE,
  width: 543,
} as SiteImage;

const styles = {
  wrapper: {
    margin: '30px auto',
    maxWidth: 400,
  },
};

export function OrderItemWithKnobs() {
  const [sendRequestParams, setStateForSendRequest] = useState<
    ReturnRequestProps
  >(cancelReturnRequestMock);
  const [getReasonsParams, setStateForReturnReasons] = useState<
    ReturnReasonDataProps
  >(getReturnReasonsMock);
  const name = text(
    'Item name',
    'Bridgestone Dueler A/T Revo 2 - P215/75R16 - 001311',
  );
  const quantity = number('Quantity', 2);
  const id = number('ID', 1234);
  const price = number('Price', 123);
  const canCustomerReorder = boolean('Can customer reorder', true);
  const canCustomerCancel = boolean('Can customer cancel', true);
  const canCustomerReturn = boolean('Can customer return', true);
  const isSendingReturnOrCancelReq = boolean(
    'is sending cancel request',
    false,
  );
  const isLoadingReturnReasons = boolean('is loading return reasons', false);

  const zipCode = '12345';

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

  return (
    <div css={styles.wrapper}>
      <OrderItem
        canCustomerReorder={canCustomerReorder}
        canCustomerCancelReturn={canCustomerCancel}
        canCustomerReturn={canCustomerReturn}
        productId={id}
        image={itemImage}
        name={name}
        orderId={id}
        quantity={quantity}
        zip={zipCode}
        isSendingReturnOrCancelReq={isSendingReturnOrCancelReq}
        returnOrCancelReqSent={isSendingReturnOrCancelReq}
        isLoadingReturnReasons={isLoadingReturnReasons}
        getReturnReasons={getReturnReasons}
        sendReturnRequest={sendReturnRequest}
        brand={orderBrandMock}
        price={price}
        extendedPrice={price}
      />
    </div>
  );
}
