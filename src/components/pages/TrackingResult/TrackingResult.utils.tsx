import format from 'date-fns/format';

import BaseLink from '~/components/global/Link/BaseLink';
import Link from '~/components/global/Link/Link';
import { SiteLink } from '~/data/models/SiteLink';
import { THEME } from '~/lib/constants';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import styles from './TrackingResult.styles';

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
  const createdAtDate = format(new Date(createdAt), 'EEEE MMMM d');

  return [
    {
      descriptionComponent: <span>{createdAtDate}</span>,
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
        <span>{format(new Date(deliveredAt), 'EEEE, MMMM d yyyy')}</span>
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
      return deliveredAt && format(new Date(deliveredAt), 'MMMM d');
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
      <BaseLink href={CUSTOMER_SERVICE_LINK} isExternal>
        {ui('tracking.cancelledSendEmail')}
      </BaseLink>
    );
  }

  return uiJSX('tracking.cancelledContactServiceEnabled', {
    phone: (
      <BaseLink href={`tel:${customerServiceNumber.value}`}>
        {customerServiceNumber.display}
      </BaseLink>
    ),
    email: (
      <BaseLink href={CUSTOMER_SERVICE_LINK} isExternal>
        send an email
      </BaseLink>
    ),
  });
}

export function getAdditionalInfoLinks() {
  return uiJSX('tracking.additionalInfoLinks', {
    shipping: (
      <BaseLink key="shipping-link" href="/">
        Shipping Policy
      </BaseLink>
    ),
    faq: (
      <BaseLink key="faq-link" href="/">
        FAQ
      </BaseLink>
    ),
  });
}
