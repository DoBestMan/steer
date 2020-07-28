import Link from '~/components/global/Link/Link';
import { SiteLink } from '~/data/models/SiteLink';
import { THEME } from '~/lib/constants';
import { formatOrNull } from '~/lib/utils/date';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import styles from './OrderTrackingResult.styles';

export enum OrderStatus {
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
  PREPARED = 'prepared',
  RECEIVED = 'received',
  SHIPPED = 'shipped',
}

interface OrderStatusDateParms {
  deliveredAt?: Date | null;
  deliveryExpectedLabel?: string | null;
  orderStatus: OrderStatus;
}

export const orderStatusHierarchy = {
  [OrderStatus.CANCELLED]: 0,
  [OrderStatus.DELIVERED]: 3,
  [OrderStatus.PREPARED]: 1,
  [OrderStatus.RECEIVED]: 0,
  [OrderStatus.SHIPPED]: 2,
};

const CUSTOMER_SERVICE_LINK = 'https://simpletire.com/customer-support';

export function getOrderSteps({
  createdAt,
  deliveredAt,
  trackingLabel,
  trackingLink,
}: {
  createdAt: Date;
  deliveredAt: Date | null | undefined;
  trackingLabel: string | null;
  trackingLink: SiteLink | null;
}) {
  return [
    {
      descriptionComponent: <span>{formatOrNull(createdAt)}</span>,
      hierarchyNum: 0,
      label: ui('tracking.stepProcessed'),
    },
    {
      descriptionComponent: (
        <span>{ui('tracking.pendingStepDescription')}</span>
      ),
      hierarchyNum: 1,
      label: ui('tracking.stepPending'),
    },
    {
      descriptionComponent: (
        <span>
          <span>{ui('tracking.tiresShipped')}</span>
          <span css={styles.inTransitStep}>
            {ui('tracking.trackingNumber')}
          </span>
          <Link
            href={trackingLink?.href || '/'}
            isExternal={trackingLink?.isExternal}
            theme={THEME.LIGHT}
          >
            {trackingLabel}
          </Link>
        </span>
      ),
      hierarchyNum: 2,
      label: ui('tracking.stepInTransit'),
    },
    {
      descriptionComponent: deliveredAt ? (
        <span>{formatOrNull(deliveredAt, 'EEEE, MMMM d yyyy')}</span>
      ) : null,
      hierarchyNum: 3,
      label: ui('tracking.stepDelivered'),
    },
  ];
}

export function getOrderStatusLabel(orderStatus: OrderStatus) {
  switch (orderStatus) {
    case OrderStatus.CANCELLED:
      return ui('tracking.statusCancelled');
    case OrderStatus.DELIVERED:
      return ui('tracking.statusDelivered');
    default:
      return ui('tracking.statusExpected');
  }
}

export function getOrderStatusDate({
  deliveryExpectedLabel,
  deliveredAt,
  orderStatus,
}: OrderStatusDateParms) {
  switch (orderStatus) {
    case OrderStatus.CANCELLED:
      return null;
    case OrderStatus.DELIVERED:
      return deliveredAt && formatOrNull(deliveredAt, 'MMMM d');
    default:
      return deliveryExpectedLabel;
  }
}

export function getCancelledContactCopy({
  customerServiceNumber,
  isCustomerServiceEnabled,
}: {
  customerServiceNumber: { display: string; value: string };
  isCustomerServiceEnabled: boolean;
}) {
  if (!isCustomerServiceEnabled) {
    return (
      <Link theme={THEME.LIGHT} href={CUSTOMER_SERVICE_LINK} isExternal>
        {ui('tracking.cancelledSendEmail')}
      </Link>
    );
  }

  return uiJSX('tracking.cancelledContactServiceEnabled', {
    phone: (
      <Link theme={THEME.LIGHT} href={`tel:${customerServiceNumber.value}`}>
        {customerServiceNumber.display}
      </Link>
    ),
    email: (
      <Link theme={THEME.LIGHT} href={CUSTOMER_SERVICE_LINK} isExternal>
        send an email
      </Link>
    ),
  });
}

export function getAdditionalInfoLinks() {
  return uiJSX('tracking.additionalInfoLinks', {
    shipping: (
      <Link theme={THEME.LIGHT} key="shipping-link" href="/">
        Shipping Policy
      </Link>
    ),
    faq: (
      <Link theme={THEME.LIGHT} key="faq-link" href="/">
        FAQ
      </Link>
    ),
  });
}
