import { useRouter } from 'next/router';
import React from 'react';

import Icon from '~/components/global/Icon/Icon';
import { ICONS } from '~/components/global/Icon/Icon.constants';
import { ROUTE_MAP, ROUTES } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';

import {
  getCancelledContactCopy,
  OrderStatus,
} from '../OrderTrackingResult.utils';
import styles from './OrderHeader.styles';

interface Props {
  customerServiceNumber: { display: string; value: string };
  deliveryExpectedLabel?: string | null;
  id: number;
  isCustomerServiceEnabled: boolean;
  orderStatus: OrderStatus;
  showBackButton: boolean;
}

function OrderHeader({
  customerServiceNumber,
  deliveryExpectedLabel,
  id,
  isCustomerServiceEnabled,
  orderStatus,
  showBackButton,
}: Props) {
  const router = useRouter();
  const isExpectingDelivery =
    orderStatus !== OrderStatus.CANCELLED &&
    orderStatus !== OrderStatus.DELIVERED;

  const redirectToMyOrders = () => {
    router.push({ pathname: ROUTE_MAP[ROUTES.MY_ORDERS] });
  };

  return (
    <>
      {showBackButton && (
        <button css={[styles.returnHomeContainer]} onClick={redirectToMyOrders}>
          <Icon name={ICONS.CHEVRON_LEFT} css={styles.backIcon} />
          <h1 css={styles.subTitleText}>{ui('account.returnToAccountHome')}</h1>
        </button>
      )}
      <div>
        <h3 css={styles.orderNumber}>
          {ui('tracking.orderNumber', { number: id })}
        </h3>
        <h1
          css={[
            styles.orderStatusLabel,
            isExpectingDelivery && styles.expectingDelivery,
          ]}
        >
          {deliveryExpectedLabel && <span>{deliveryExpectedLabel}</span>}
        </h1>
        {orderStatus === OrderStatus.CANCELLED && (
          <span css={styles.canceledOrderHelp}>
            <span>{ui('tracking.cancelledHelp')}</span>
            <span>
              {getCancelledContactCopy({
                customerServiceNumber,
                isCustomerServiceEnabled,
              })}
            </span>
          </span>
        )}
      </div>
    </>
  );
}

export default OrderHeader;
