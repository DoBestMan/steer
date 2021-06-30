import React, { useState } from 'react';

import Button from '~/components/global/Button/Button';
import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { Icon as IconType } from '~/components/global/Icon/Icon.types';
import Link from '~/components/global/Link/Link';
import Loading from '~/components/global/Loading/Loading';
import Markdown from '~/components/global/Markdown/MarkdownDynamic';
import Toast from '~/components/global/Toast/Toast';
import ToastOnScreen from '~/components/global/Toast/ToastWithoutModal';
import { useAccountContext } from '~/components/modules/Account/Account.context';
import {
  createOrderHeaderDetails,
  createShippingLabel,
  createTMORedirectURL,
  getStatusParams,
  minWidthForMultipleDisplay,
} from '~/components/pages/MyOrdersPage/MyOrdersPage.utils';
import OrderAppointment from '~/components/pages/OrderTrackingResult/OrderAppointment/OrderAppointment';
import OrderDetails from '~/components/pages/OrderTrackingResult/OrderDetails/OrderDetails';
import { getAppointmentAddressArray } from '~/components/pages/OrderTrackingResult/OrderTrackingResult.utils';
import { OrderProduct } from '~/data/models/OrderProduct';
import { userOrders } from '~/data/models/UserOrderList';
import { useBreakpoints } from '~/hooks/useBreakpoints';
import { BUTTON_STYLE, THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import styles from './MyOrderItem.styles';

function orderDetailsComponent(
  title: string | null,
  description: string | null,
  index: number,
) {
  return (
    title &&
    description && (
      <div key={index} css={styles.orderDetailsContainer}>
        <h1 css={[styles.orderDetailsText, styles.orderDetailsKey]}>
          {title}:
        </h1>
        <h1 css={styles.orderDetailsText}>{description}</h1>
      </div>
    )
  );
}

function tireDetailsComponent(item: OrderProduct) {
  const { brand, quantity, image, name, price } = item;

  return (
    <>
      <div css={styles.seperator} />
      <div css={[styles.tireDetailContainer]}>
        <OrderDetails
          brand={brand}
          quantity={quantity}
          image={image}
          name={name}
          price={price}
        />
      </div>
    </>
  );
}

export default function MyOrderItem({
  orderId,
  status,
  shippingZip,
  created,
  total,
  shippingCarriers,
  orderProducts,
  orderAppointment,
  canUserCancelOrder,
}: userOrders) {
  const [activeOrderID, setActiveOrderID] = useState<string>('');
  const {
    isLoading,
    deleteMyOrder,
    toggleToastStatus,
    toastStatus,
    toastMessage,
  } = useAccountContext();
  const { isMobile, windowWidth } = useBreakpoints();
  const shouldDisplayAtBottom =
    isMobile || windowWidth < minWidthForMultipleDisplay;
  const toggleToast = () => {
    setActiveOrderID('');
    toggleToastStatus(false);
  };
  function renderToast() {
    return !shouldDisplayAtBottom ? (
      <Toast
        isOpen={toastStatus}
        onDismiss={toggleToast}
        customContainerStyles={styles.toastContainer}
      >
        <Markdown>{toastMessage}</Markdown>
      </Toast>
    ) : (
      <div css={[styles.orderStatusAlign, styles.toastContainer]}>
        <ToastOnScreen isOpen={toastStatus} onDismiss={toggleToast}>
          <h1 css={styles.toastMessage}>{toastMessage}</h1>
        </ToastOnScreen>
      </div>
    );
  }

  const handleDeleteOrder = async () => {
    setActiveOrderID(orderId);
    await deleteMyOrder(orderId);
  };

  function orderStatusComponent(
    color: boolean,
    icon: IconType,
    status: string,
  ) {
    return (
      <div
        css={[
          styles.orderStatusContainer,
          color && styles.orderStatusNewOrder,
          !shouldDisplayAtBottom && styles.orderStatusTopRight,
        ]}
      >
        <div css={styles.orderStatusAlign}>
          <h1 css={styles.orderStatusText}>{status}</h1>
          <Icon
            name={icon}
            css={[
              styles.orderStatusIcon,
              !color && styles.orderStatusDeliveryIcon,
            ]}
          />
        </div>
      </div>
    );
  }

  function renderOrderHeader() {
    const redirectURL = createTMORedirectURL(orderId, shippingZip);
    const title = ui('tracking.orderNumber', { number: orderId });
    const orderDetails = createOrderHeaderDetails(created, total);
    const [shippingLabel, shippingDesc] = createShippingLabel(shippingCarriers);
    const { color, icon } = getStatusParams(status);

    return (
      <>
        <div css={styles.sectionContainer}>
          <div css={styles.orderStatusWrapper}>
            <div
              css={styles.descriptionContainer}
              data-component={'my_order_detail_component_>'}
            >
              <Link
                css={styles.title}
                href={redirectURL}
                key="orderHeader"
                theme={THEME.LIGHT}
                isExternal={false}
              >
                {title}:
              </Link>
              <Icon name={ICONS.CHEVRON_RIGHT} css={styles.rightIcon} />
            </div>
            {!shouldDisplayAtBottom &&
              orderStatusComponent(color, icon, status)}
          </div>
          {shouldDisplayAtBottom && orderStatusComponent(color, icon, status)}
          {orderDetails?.map((item, index) => {
            const { title, description } = item;
            return orderDetailsComponent(title, description, index);
          })}
          {orderDetailsComponent(shippingLabel, shippingDesc, 2)}
        </div>
      </>
    );
  }

  const renderTireDetails = () => {
    if (!orderProducts || orderProducts.length === 0) {
      return null;
    }
    return orderProducts.map((item, index) => (
      <div key={index}>{tireDetailsComponent(item)}</div>
    ));
  };

  function renderAddressInfo() {
    const appointmentDisplayArray =
      orderAppointment && getAppointmentAddressArray(orderAppointment);
    const note = orderAppointment?.note;

    return (
      <div css={styles.tireInstallation}>
        <div css={styles.seperator} />
        <div css={styles.appointmentContainer}>
          <OrderAppointment
            note={note}
            shippingAddressArray={null}
            showShippingAddress={false}
            appointmentDisplayArray={appointmentDisplayArray}
            showInstallIcon
          />
        </div>
      </div>
    );
  }

  function renderCancelButton() {
    return (
      <>
        <div css={[styles.sectionContainer, styles.cancelContainer]}>
          <Button
            css={styles.cancelButton}
            style={BUTTON_STYLE.OUTLINED}
            theme={THEME.LIGHT}
            onClick={handleDeleteOrder}
          >
            {ui('account.cancelOrder')}
          </Button>
          {activeOrderID === orderId && isLoading && (
            <div css={styles.loaderContainer}>
              <Loading />
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <>
      <div css={styles.shadowContainer}>
        {renderOrderHeader()}
        {renderTireDetails()}
        {orderAppointment && renderAddressInfo()}
        {canUserCancelOrder && renderCancelButton()}
      </div>
      {activeOrderID === orderId && renderToast()}
    </>
  );
}
