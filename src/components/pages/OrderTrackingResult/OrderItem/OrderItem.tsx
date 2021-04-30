import React, { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Image from '~/components/global/Image/Image';
import Loading from '~/components/global/Loading/Loading';
import { OrderProduct } from '~/data/models/OrderProduct';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { getLegacyCheckoutURL } from '~/lib/utils/legacy-routes';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './OrderItem.styles';

interface RequestType {
  type: string;
}
type ReturnRequestProps = ReturnRequestInput & RequestType;
type ReturnReasonDataProps = OrderProduct & OrderTrackingInput;

interface Props {
  getReturnReasons: ({
    id,
    image,
    name,
    quantity,
    zip,
    orderId,
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
  image,
  name,
  quantity,
  id,
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
      front: id.toString(),
      quantity: { front: quantity },
    });
    window.location.href = checkoutEndpoint;
  };
  const handleReturnBtnClick = (event: React.MouseEvent) => {
    setActiveItemID(id);
    event.preventDefault();
    const productData = {
      canCustomerCancelReturn,
      canCustomerReorder,
      canCustomerReturn,
      id,
      image,
      name,
      orderId: String(orderId),
      quantity,
      zip,
    };
    getReturnReasons({
      ...productData,
    });
  };

  const handleCancelBtnClick = (event: React.MouseEvent) => {
    setActiveItemID(id);
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
      productId: String(id),
      type: 'cancel',
      zip: String(zip),
    } as ReturnRequestProps);
  };

  const quantityLabel =
    quantity === 1
      ? 'tracking.tiresOrderedSingular'
      : 'tracking.tiresOrderedPlural';

  return (
    <div css={styles.wrapper}>
      <Image
        css={styles.image}
        customContainerStyles={styles.imageWrapper}
        responsive
        {...image}
      />
      <div css={styles.content}>
        <div css={styles.name}>{name}</div>
        <div css={styles.quantity}>{ui(quantityLabel, { quantity })}</div>
        <div css={styles.buttonsWrapper}>
          {canCustomerReorder && (
            <div css={styles.reorderButtonWrapper}>
              <Button
                css={styles.reorderButton}
                style={BUTTON_STYLE.OUTLINED}
                theme={THEME.LIGHT}
                onClick={handleReorderBtnClick}
              >
                {ui('tracking.reorderOption')}
              </Button>
            </div>
          )}
          {canCustomerReturn && (
            <div css={styles.reorderButtonWrapper}>
              <Button
                css={styles.reorderButton}
                style={BUTTON_STYLE.OUTLINED}
                theme={THEME.LIGHT}
                onClick={handleReturnBtnClick}
              >
                {ui('tracking.returnOption')}
              </Button>
              {isLoadingReturnReasons && activeItemID === id && (
                <div css={styles.submitLoader}>
                  <Loading />
                </div>
              )}
            </div>
          )}
        </div>
        {canCustomerCancelReturn && (
          <div css={styles.reorderButtonWrapper}>
            <Button
              css={styles.reorderButton}
              style={BUTTON_STYLE.OUTLINED}
              theme={THEME.LIGHT}
              onClick={handleCancelBtnClick}
            >
              {ui('tracking.cancelOption')}
            </Button>
            {(isSendingReturnOrCancelReq || returnOrCancelReqSent) &&
            activeItemID === id ? (
              <div css={styles.submitLoader}>
                <Loading />
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
export default OrderItem;
