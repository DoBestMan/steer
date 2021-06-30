import React, { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Loading from '~/components/global/Loading/Loading';
import { OrderProduct } from '~/data/models/OrderProduct';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { getLegacyCheckoutURL } from '~/lib/utils/legacy-routes';
import { ui } from '~/lib/utils/ui-dictionary';

import OrderDetails from '../OrderDetails/OrderDetails';
import styles from './OrderItem.styles';

interface RequestType {
  type: string;
}
type ReturnRequestProps = ReturnRequestInput & RequestType;
type ReturnReasonDataProps = OrderProduct & OrderTrackingInput;

interface Props {
  getReturnReasons: ({
    productId,
    image,
    name,
    quantity,
    zip,
    orderId,
    brand,
  }: ReturnReasonDataProps) => void;
  isLoadingReturnReasons: boolean;
  isSendingReturnOrCancelReq: boolean;
  orderId: number;
  returnOrCancelReqSent: boolean;
  sendReturnRequest: ({
    orderId,
    zip,
    productId,
    body,
  }: ReturnRequestProps) => void;
  zip: string;
}
type OrderItemProps = OrderProduct & Props;

function OrderItem({
  brand,
  price,
  extendedPrice,
  image,
  name,
  quantity,
  productId,
  canCustomerReorder,
  zip,
  orderId,
  canCustomerCancelReturn,
  canCustomerReturn,
  isLoadingReturnReasons,
  getReturnReasons,
  sendReturnRequest,
  isSendingReturnOrCancelReq,
  returnOrCancelReqSent,
}: OrderItemProps) {
  const [activeItemID, setActiveItemID] = useState<number>(0);
  const handleReorderBtnClick = (event: React.MouseEvent) => {
    event.preventDefault();
    const checkoutEndpoint = getLegacyCheckoutURL({
      front: productId.toString(),
      quantity: { front: quantity },
    });
    window.location.href = checkoutEndpoint;
  };
  const handleReturnBtnClick = (event: React.MouseEvent) => {
    setActiveItemID(productId);
    event.preventDefault();
    const productData = {
      brand,
      canCustomerCancelReturn,
      canCustomerReorder,
      canCustomerReturn,
      extendedPrice,
      image,
      name,
      orderId: String(orderId),
      price,
      productId,
      quantity,
      zip,
    };
    getReturnReasons({
      ...productData,
    });
  };

  const handleCancelBtnClick = (event: React.MouseEvent) => {
    setActiveItemID(productId);
    event.preventDefault();
    const body = {
      reasonId: null,
      comment: '',
      quantity,
      attachedImages: [],
    };
    sendReturnRequest({
      body,
      orderId: String(orderId),
      productId: String(productId),
      type: 'cancel',
      zip: String(zip),
    } as ReturnRequestProps);
  };

  return (
    <>
      <OrderDetails
        brand={brand}
        image={image}
        name={name}
        quantity={quantity}
        price={price}
      />

      <div css={styles.buttonContainer}>
        {canCustomerReorder && (
          <Button
            css={styles.reorderButton}
            style={BUTTON_STYLE.OUTLINED}
            theme={THEME.LIGHT}
            onClick={handleReorderBtnClick}
          >
            {ui('tracking.reorderOption')}
          </Button>
        )}

        {canCustomerReturn && (
          <Button
            css={styles.reorderButton}
            style={BUTTON_STYLE.OUTLINED}
            theme={THEME.LIGHT}
            onClick={handleReturnBtnClick}
          >
            {ui('tracking.returnOption')}
          </Button>
        )}
        {canCustomerReturn &&
          isLoadingReturnReasons &&
          activeItemID === productId && (
            <div css={styles.submitLoader}>
              <Loading />
            </div>
          )}

        {canCustomerCancelReturn && (
          <Button
            css={styles.reorderButton}
            style={BUTTON_STYLE.OUTLINED}
            theme={THEME.LIGHT}
            onClick={handleCancelBtnClick}
          >
            {ui('tracking.cancelOption')}
          </Button>
        )}

        {canCustomerCancelReturn &&
        (isSendingReturnOrCancelReq || returnOrCancelReqSent) &&
        activeItemID === productId ? (
          <div css={styles.submitLoader}>
            <Loading />
          </div>
        ) : null}
      </div>
    </>
  );
}
export default OrderItem;
