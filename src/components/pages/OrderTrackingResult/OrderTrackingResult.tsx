import React, { useState } from 'react';

import Button from '~/components/global/Button/Button';
import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Markdown from '~/components/global/Markdown/Markdown';
import Meta from '~/components/global/Meta/Meta';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import Toast from '~/components/global/Toast/Toast';
import { Order } from '~/data/models/Order';
import { OrderProduct } from '~/data/models/OrderProduct';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES, LINK_TYPES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import OrderAppointment from './OrderAppointment/OrderAppointment';
import OrderHeader from './OrderHeader/OrderHeader';
import OrderItem from './OrderItem/OrderItem';
import OrderStep from './OrderStep/OrderStep';
import styles from './OrderTrackingResult.styles';
import {
  checkOrderStatus,
  getAppointmentAddressArray,
  getOrderRecieptURL,
  getReturnDescription,
  getReturnInfoLinks,
  getShippingAddressArray,
  OrderStatus,
} from './OrderTrackingResult.utils';

interface RequestType {
  type: string;
}

type ReturnReasonDataProps = OrderProduct & OrderTrackingInput;
type ReturnRequestProps = ReturnRequestInput & RequestType;

interface Props {
  customerServiceNumber: { display: string; value: string };
  emailSent: boolean;
  getReturnReasons: ({
    canCustomerReorder,
    canCustomerReturn,
    canCustomerCancelReturn,
    productId,
    image,
    name,
    quantity,
    zip,
    orderId,
  }: ReturnReasonDataProps) => void;
  isCustomerServiceEnabled: boolean;
  isLoadingReturnReasons: boolean;
  isSendingEmail: boolean;
  isSendingReturnOrCancelReq: boolean;
  pdfDownloaded: boolean;
  returnOrCancelReqError: boolean;
  returnOrCancelReqSent: boolean;
  sendEmailReciept: ({ orderId, zip }: OrderTrackingInput) => void;
  sendReturnRequest: ({
    orderId,
    zip,
    productId,
    body,
  }: ReturnRequestProps) => void;
  setPDFdownloaded: (value: boolean) => void;
  showBackButton: boolean;
}

type OrderTrackingResultProps = Order & Props & OrderTrackingInput;

function OrderTrackingResult({
  customerServiceNumber,
  deliveryExpectedLabel,
  id,
  isCustomerServiceEnabled,
  orderProducts,
  shippingAddress,
  status,
  orderInstallerAppointment,
  orderShippingStageList,
  maskedEmail,
  orderId,
  zip,
  returnOrCancelReqError,
  isLoadingReturnReasons,
  getReturnReasons,
  sendReturnRequest,
  isSendingReturnOrCancelReq,
  returnOrCancelReqSent,
  returnInitializedReasonId,
  setPDFdownloaded,
  pdfDownloaded,
  showBackButton,
}: OrderTrackingResultProps) {
  const [toastMessageStatus, showToastMessage] = useState<boolean>(true);

  const shippingAddressArray = getShippingAddressArray(shippingAddress);

  const isOrderInReturnState = checkOrderStatus(status);

  const appointmentDisplayArray =
    orderInstallerAppointment &&
    getAppointmentAddressArray(orderInstallerAppointment);

  const note = orderInstallerAppointment?.note;

  const displayedSteps = orderShippingStageList
    .sort((a, b) => b.sort - a.sort)
    .slice();

  const { bk } = useBreakpoints();

  const isLorXLScreen =
    [BREAKPOINT_SIZES.L].includes(bk) || [BREAKPOINT_SIZES.XL].includes(bk);

  function renderOrderDetails() {
    const recieptURL = getOrderRecieptURL({ orderId, zip });
    return (
      <GridItem
        css={[!isLorXLScreen && styles.orderInfoWrapper]}
        gridColumnL="8/13"
        gridColumnXL="8/12"
      >
        <h5 css={styles.orderHeader}>{ui('tracking.orderSummary')}</h5>
        <h5 css={styles.orderSubHeader}>
          {ui('tracking.yourTires').toLocaleUpperCase()}
        </h5>

        <ul>
          {orderProducts.map((item, i) => (
            <li css={[styles.orderItem, styles.seperator]} key={i}>
              <OrderItem
                {...item}
                orderId={id}
                zip={String(zip)}
                isLoadingReturnReasons={isLoadingReturnReasons}
                getReturnReasons={getReturnReasons}
                sendReturnRequest={sendReturnRequest}
                isSendingReturnOrCancelReq={isSendingReturnOrCancelReq}
                returnOrCancelReqSent={returnOrCancelReqSent}
              />
            </li>
          ))}
        </ul>
        <OrderAppointment
          note={note}
          shippingAddressArray={shippingAddressArray}
          appointmentDisplayArray={appointmentDisplayArray}
          showShippingAddress
        />
        {returnOrCancelReqError && (
          <div css={styles.errorContainer}>
            <Toast
              isOpen={toastMessageStatus}
              onDismiss={() => showToastMessage(false)}
            >
              <Markdown>{ui('contactPage.message.error')}</Markdown>
            </Toast>
          </div>
        )}

        <div css={styles.pdfWrapper}>
          <div css={styles.pdfButtonWrapper}>
            <Button
              as={LINK_TYPES.A}
              isExternal
              href={recieptURL}
              css={styles.button}
              theme={THEME.LIGHT}
              onClick={() => setPDFdownloaded(!pdfDownloaded)}
            >
              {ui('tracking.pdfDownload')}
            </Button>
          </div>
          <div css={styles.pdfText}>{ui('tracking.pdfDescription')}</div>
        </div>
        <div css={styles.additionalInfoWrapper}>
          <span css={styles.additionalInfo}>
            {ui('tracking.returnInfoTitle')}
          </span>
          <span css={[styles.additionalInfo]}>{getReturnInfoLinks()}</span>
        </div>
      </GridItem>
    );
  }
  function renderOrderSteps() {
    return (
      <GridItem
        css={[
          !isLorXLScreen
            ? styles.orderTimelineWrapper
            : styles.orderTimelinePosition,
        ]}
        gridColumnL="3/8"
        gridColumnXL="3/8"
      >
        {isLorXLScreen && <div css={styles.orderTimelineSeperator} />}
        {displayedSteps.map((item, i) => (
          <OrderStep
            {...item}
            numberOfSteps={orderShippingStageList.length}
            stepIndex={i}
            key={i}
          />
        ))}
      </GridItem>
    );
  }
  return (
    <>
      <Meta robots="noindex,nofollow" hasCanonical={false} />
      <Grid>
        <GridItem
          css={[
            styles.orderStatusWrapper,
            !isOrderInReturnState && styles.returnContainer,
          ]}
        >
          <OrderHeader
            customerServiceNumber={customerServiceNumber}
            deliveryExpectedLabel={deliveryExpectedLabel}
            id={id}
            isCustomerServiceEnabled={isCustomerServiceEnabled}
            orderStatus={status}
            showBackButton={showBackButton}
          />
          {status === OrderStatus.RETURN_REQUESTED &&
            getReturnDescription(
              status,
              returnInitializedReasonId,
              maskedEmail ? maskedEmail : '',
            )}
        </GridItem>
        {status === OrderStatus.RETURN_INITIATED && (
          <GridItem gridColumnM="2/8" gridColumnL="3/12" gridColumnXL="4/12">
            {getReturnDescription(
              status,
              returnInitializedReasonId,
              maskedEmail ? maskedEmail : '',
            )}
          </GridItem>
        )}
        {renderOrderSteps()}
        {renderOrderDetails()}
        <PageIllustration carId={CARS[CARS_KEYS.COMMERCIAL]} />
      </Grid>
    </>
  );
}
export default OrderTrackingResult;
