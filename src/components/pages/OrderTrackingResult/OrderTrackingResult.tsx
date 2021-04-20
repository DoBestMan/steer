import { useState } from 'react';

import Button from '~/components/global/Button/Button';
import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Loading from '~/components/global/Loading/Loading';
import Markdown from '~/components/global/Markdown/Markdown';
import Meta from '~/components/global/Meta/Meta';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import Toast from '~/components/global/Toast/Toast';
import { Order } from '~/data/models/Order';
import { OrderProduct } from '~/data/models/OrderProduct';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BREAKPOINT_SIZES, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import OrderHeader from './OrderHeader/OrderHeader';
import OrderItem from './OrderItem/OrderItem';
import OrderStep from './OrderStep/OrderStep';
import styles from './OrderTrackingResult.styles';
import {
  checkOrderStatus,
  getAppointmentAddressArray,
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
    id,
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
  returnOrCancelReqError: boolean;
  returnOrCancelReqSent: boolean;
  sendEmailReciept: ({ orderId, zip }: OrderTrackingInput) => void;
  sendReturnRequest: ({
    orderId,
    zip,
    productId,
    body,
  }: ReturnRequestProps) => void;
}

type OrderTrackingResultProps = Order & Props & OrderTrackingInput;

function OrderTrackingResult({
  customerServiceNumber,
  deliveryExpectedLabel,
  id,
  isCustomerServiceEnabled,
  orderProductList,
  shippingAddress,
  status,
  orderInstallerAppointment,
  orderShippingStageList,
  maskedEmail,
  sendEmailReciept,
  isSendingEmail,
  emailSent,
  orderId,
  zip,
  returnOrCancelReqError,
  isLoadingReturnReasons,
  getReturnReasons,
  sendReturnRequest,
  isSendingReturnOrCancelReq,
  returnOrCancelReqSent,
  returnInitializedReasonId,
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

  const shippingHeader =
    appointmentDisplayArray && appointmentDisplayArray.length > 0
      ? ui('tracking.appointmentDetails')
      : ui('tracking.shippingAddress');

  const displayAddress =
    appointmentDisplayArray && appointmentDisplayArray.length > 0
      ? appointmentDisplayArray
      : shippingAddressArray;

  const emailButtonTitle = emailSent
    ? ui('tracking.emailRecieptSent')
    : ui('tracking.emailRecieptNotSent');

  function renderOrderDetails() {
    return (
      <GridItem
        css={styles.orderInfoWrapper}
        gridColumnM="2/5"
        gridColumnL="3/8"
        gridColumnXL="4/8"
      >
        <h5 css={styles.sectionHeader}>{shippingHeader}</h5>
        <ul css={note ? styles.appointmentAddress : styles.shippingAddress}>
          {displayAddress.map((item, i) => (
            <li css={styles.addressTextContainer} key={i}>
              {item && <div css={styles.addressText}>{item}</div>}
            </li>
          ))}
        </ul>
        {note && <div css={styles.appointmentNote}>{note}</div>}
        <h5 css={styles.sectionHeader}>{ui('tracking.orderSummary')}</h5>
        <ul css={styles.orderItemsList}>
          {orderProductList.map((item, i) => (
            <li css={styles.orderItem} key={i}>
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

        {maskedEmail && (
          <div css={styles.emailWrapper}>
            <div css={styles.emailButtonWrapper}>
              <Button
                css={styles.button}
                theme={THEME.LIGHT}
                isDisabled={emailSent}
                onClick={() =>
                  sendEmailReciept({ orderId, zip } as OrderTrackingInput)
                }
              >
                {emailButtonTitle}
              </Button>
              {isSendingEmail ? (
                <div css={styles.emailLoader}>
                  <Loading />
                </div>
              ) : null}
            </div>
            <div css={styles.emailText}>
              {ui('tracking.emailDescription', {
                maskedEmail,
              })}
            </div>
          </div>
        )}
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
        css={styles.orderTimelineWrapper}
        gridColumnM="5/8"
        gridColumnL="8/13"
        gridColumnXL="8/12"
      >
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
          />
          {status === OrderStatus.RETURN_REQUESTED &&
            getReturnDescription(
              status,
              returnInitializedReasonId,
              maskedEmail ? maskedEmail : '',
            )}
        </GridItem>
        {status === OrderStatus.RETURN_INITIATED && (
          <GridItem gridColumnM="2/5" gridColumnL="3/8" gridColumnXL="4/14">
            {getReturnDescription(
              status,
              returnInitializedReasonId,
              maskedEmail ? maskedEmail : '',
            )}
          </GridItem>
        )}

        {[BREAKPOINT_SIZES.S].includes(bk)
          ? renderOrderSteps()
          : renderOrderDetails()}
        {[BREAKPOINT_SIZES.S].includes(bk)
          ? renderOrderDetails()
          : renderOrderSteps()}
        <PageIllustration carId={CARS[CARS_KEYS.COMMERCIAL]} />
      </Grid>
    </>
  );
}
export default OrderTrackingResult;
