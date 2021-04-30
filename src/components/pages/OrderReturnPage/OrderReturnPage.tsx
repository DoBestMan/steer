import React, { useState } from 'react';

import Button from '~/components/global/Button/Button';
import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import CopyCheckbox from '~/components/global/Checkbox/CopyCheckbox';
import Grid from '~/components/global/Grid/Grid';
import GridItem from '~/components/global/Grid/GridItem';
import Loading from '~/components/global/Loading/Loading';
import Markdown from '~/components/global/Markdown/Markdown';
import Meta from '~/components/global/Meta/Meta';
import PageIllustration from '~/components/global/PageIllustration/PageIllustration';
import RadioOptions from '~/components/global/Radio/RadioOptions';
import Toast from '~/components/global/Toast/Toast';
import styles from '~/components/pages/OrderReturnPage/OrderReturnPage.styles';
import OrderHeader from '~/components/pages/OrderTrackingResult/OrderHeader/OrderHeader';
import { OrderProduct } from '~/data/models/OrderProduct';
import { ReturnReason } from '~/data/models/ReturnReason';
import { ReturnRequestImageAttachment } from '~/data/models/ReturnRequestImageAttachment';
import { ReturnRequestInput } from '~/data/models/ReturnRequestInput';
import { SiteImage } from '~/data/models/SiteImage';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import { OrderStatus } from '../OrderTrackingResult/OrderTrackingResult.utils';
import OrderImageUpload from './OrderImageUpload/OrderImageUpload';
import ReturnOrderItem from './OrderReturnItem/OrderReturnItem';

interface RequestType {
  type: string;
}
type ReturnRequestProps = ReturnRequestInput & RequestType;

interface Props {
  customerServiceNumber: { display: string; value: string };
  isCustomerServiceEnabled: boolean;
  isSendingReturnOrCancelReq: boolean;
  orderId: number;
  orderStatus: OrderStatus;
  returnOrCancelReqError: boolean;
  returnReasons: Array<ReturnReason>;
  sendReturnRequest: ({
    orderId,
    zip,
    productId,
    body,
  }: ReturnRequestProps) => void;
  zip: string | string[];
}

type OrderReturnPageProps = OrderProduct & Props;
function OrderReturnPage({
  name,
  quantity,
  id,
  image,
  orderId,
  orderStatus,
  customerServiceNumber,
  isCustomerServiceEnabled,
  returnReasons,
  zip,
  sendReturnRequest,
  isSendingReturnOrCancelReq,
  returnOrCancelReqError,
}: OrderReturnPageProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [comments, setComment] = useState<string>('');
  const [images, storeImage] = useState<Array<SiteImage>>([]);
  const [attachedImages, storeAttachedImages] = useState<
    Array<ReturnRequestImageAttachment>
  >([]);
  const [quantityForReturn, setQuantity] = useState<number>(quantity);
  const [hasUserAcceptedAgreement, setUserAgreement] = useState<boolean>(false);
  const [toastMessageStatus, showToastMessage] = useState<boolean>(false);

  const selectedOption =
    activeIndex || activeIndex === 0 ? returnReasons[activeIndex] : null;
  const handleSubmit = () => {
    const body = {
      reasonId: selectedOption && selectedOption.id,
      comment: selectedOption && selectedOption.canAddComment ? comments : '',
      quantity: quantityForReturn,
      attachedImages:
        selectedOption && selectedOption.canUploadImage ? attachedImages : [],
    };
    sendReturnRequest({
      body,
      orderId: String(orderId),
      productId: String(id),
      type: 'return',
      zip: String(zip),
    });
  };
  function renderOrderDetails() {
    const productDetails = {
      canCustomerCancelReturn: false,
      canCustomerReorder: false,
      canCustomerReturn: false,
      id,
      image,
      name,
      quantity,
    };
    return (
      <GridItem
        css={styles.gridWrapper}
        gridColumnM="2/5"
        gridColumnL="3/8"
        gridColumnXL="4/8"
      >
        <ReturnOrderItem
          {...productDetails}
          quantityForReturn={quantityForReturn}
          setQuantity={setQuantity}
        />
      </GridItem>
    );
  }
  function renderReturnOptions() {
    return (
      <GridItem
        css={styles.gridWrapper}
        gridColumnM="2/5"
        gridColumnL="3/8"
        gridColumnXL="4/8"
      >
        <h5 css={styles.sectionHeader}>
          {ui('tracking.returnRequestOptionHeader')}
        </h5>
        <ul css={styles.returnOptionsContainer}>
          {returnReasons.map((item, i) => {
            const { reasonName, id } = item;
            const isSelected = i === activeIndex;
            const returnReason = 'ReturnReason' + id;
            return (
              <li css={styles.returnOptions} key={i}>
                <RadioOptions
                  name={returnReason}
                  onChange={() => setActiveIndex(i)}
                  value={reasonName}
                  label={reasonName}
                  activeValue={isSelected ? reasonName : undefined}
                  css={styles.radio}
                />
              </li>
            );
          })}
        </ul>
      </GridItem>
    );
  }
  function renderImagePicker() {
    const canUploadImage = selectedOption
      ? selectedOption.canUploadImage
      : null;
    const canAddComment = selectedOption ? selectedOption.canAddComment : null;
    return canUploadImage || canAddComment ? (
      <GridItem
        css={styles.gridWrapper}
        gridColumnM="2/8"
        gridColumnL="3/12"
        gridColumnXL="4/12"
      >
        <OrderImageUpload
          comments={comments}
          setComment={setComment}
          images={images}
          storeImage={storeImage}
          canUploadImage={canUploadImage}
          canAddComment={canAddComment}
          attachedImages={attachedImages}
          storeAttachedImages={storeAttachedImages}
        />
      </GridItem>
    ) : null;
  }
  function renderCheckBox() {
    const selectedDescription =
      selectedOption && selectedOption.terms ? selectedOption.terms : '';
    return (
      <GridItem
        css={styles.gridWrapper}
        gridColumnM="2/8"
        gridColumnL="3/12"
        gridColumnXL="4/12"
      >
        {selectedOption && (
          <div css={{ display: 'flex' }}>
            <CopyCheckbox
              label={''}
              defaultChecked={false}
              handleChange={setUserAgreement}
            />
            <span css={styles.copyLabel}>{selectedDescription}</span>
          </div>
        )}
        <div
          css={[
            styles.sendRequestButtonWrapper,
            selectedOption && styles.checkBox,
          ]}
        >
          <Button
            theme={THEME.LIGHT}
            isDisabled={!hasUserAcceptedAgreement}
            onClick={handleSubmit}
          >
            {ui('tracking.returnRequestSubmit')}
          </Button>
          {isSendingReturnOrCancelReq ? (
            <div css={styles.submitLoader}>
              <Loading />
            </div>
          ) : null}
        </div>
        {returnOrCancelReqError && (
          <Toast
            isOpen={toastMessageStatus}
            onDismiss={() => showToastMessage(false)}
          >
            <Markdown>{ui('contactPage.message.error')}</Markdown>
          </Toast>
        )}
      </GridItem>
    );
  }
  return (
    <>
      <Meta robots="noindex,nofollow" hasCanonical={false} />
      <Grid>
        <GridItem css={styles.orderStatusWrapper}>
          <OrderHeader
            customerServiceNumber={customerServiceNumber}
            deliveryExpectedLabel={ui('tracking.returnRequestTitle')}
            id={orderId}
            isCustomerServiceEnabled={isCustomerServiceEnabled}
            orderStatus={orderStatus}
          />
        </GridItem>
        {renderOrderDetails()}
        {renderReturnOptions()}
        {renderImagePicker()}
        {renderCheckBox()}
        <PageIllustration carId={CARS[CARS_KEYS.COMMERCIAL]} />
      </Grid>
    </>
  );
}
export default OrderReturnPage;
