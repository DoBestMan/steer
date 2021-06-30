import Link from '~/components/global/Link/Link';
import { OrderAppointment } from '~/data/models/OrderAppointment';
import { OrderTrackingInput } from '~/data/models/OrderTrackingInput';
import { UserAddress } from '~/data/models/UserAddress';
import { LINK_THEME, ROUTE_MAP, ROUTES } from '~/lib/constants';
import { isClient } from '~/lib/helpers/browser';
import { formatWithYear } from '~/lib/utils/date';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

import styles from './OrderTrackingResult.styles';

export enum OrderStatus {
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
  PREPARED = 'prepared',
  RECEIVED = 'received',
  RETURN_INITIATED = 'return-initialized',
  RETURN_REQUESTED = 'return-requested',
  SHIPPED = 'shipped',
}

export function getShippingAddressArray(shippingAddress: UserAddress) {
  const { cityName, line1, line2, stateAbbr, zip } = shippingAddress;
  const address = `${cityName ? cityName + ',' : ''} 
  ${stateAbbr ? stateAbbr : ''} ${zip ? zip : ''}`;
  return [line1, line2, address];
}

export function getAppointmentAddressArray(
  orderInstallerAppointment: OrderAppointment,
) {
  const {
    installerAddress: { company, city, addressLine1, addressLine2, state, zip },
    date,
    timeSlot,
  } = orderInstallerAppointment;

  const appointmentAddress = `${city ? city + ',' : ''} 
    ${state ? state : ''} ${zip ? zip : ''}`;

  const resultArray = [
    company,
    addressLine1,
    addressLine2,
    appointmentAddress,
    formatWithYear(date),
    timeSlot,
  ];

  return resultArray;
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
      <Link
        theme={LINK_THEME.LIGHT_HIGHLIGHTED}
        href={ROUTE_MAP[ROUTES.CUSTOMER_SUPPORT]}
        isExternal
      >
        {ui('tracking.cancelledSendEmail')}
      </Link>
    );
  }

  return uiJSX('tracking.cancelledContactServiceEnabled', {
    phone: (
      <Link
        theme={LINK_THEME.LIGHT_HIGHLIGHTED}
        href={`tel:${customerServiceNumber.value}`}
      >
        {customerServiceNumber.display}
      </Link>
    ),
    email: (
      <Link
        theme={LINK_THEME.LIGHT_HIGHLIGHTED}
        href={ROUTE_MAP[ROUTES.CUSTOMER_SUPPORT]}
        isExternal
      >
        send an email
      </Link>
    ),
  });
}

export function getReturnInfoLinks() {
  return uiJSX('tracking.returnInfoLinks', {
    returns: (
      <Link
        theme={LINK_THEME.LIGHT_HIGHLIGHTED}
        key="returns-link"
        href={ROUTE_MAP[ROUTES.RETURNS]}
      >
        {ui('links.returns')}
      </Link>
    ),
  });
}

export function checkOrderStatus(status: OrderStatus) {
  return status === OrderStatus.RETURN_REQUESTED ||
    status === OrderStatus.RETURN_INITIATED
    ? true
    : false;
}

export function getReturnDescription(
  status: OrderStatus,
  returnInitializedReasonId: number | null,
  maskedEmail: string,
) {
  const detailsDisplayArray = [
    {
      title: ui('tracking.returnRequestTitle1'),
      description: ui('tracking.returnRequestDesc1'),
    },
    {
      title: ui('tracking.returnRequestTitle2'),
      description: ui('tracking.returnRequestDesc2'),
    },
  ];
  const descriptionWithSpecialText: string[] = [];

  if (returnInitializedReasonId === 7 || returnInitializedReasonId === 5) {
    const addedDescription = {
      title: ui('tracking.returnRequestRefund'),
      description: ui('tracking.returnRequestRefundDesc'),
    };
    detailsDisplayArray.push(addedDescription);
  } else if (
    returnInitializedReasonId === 3 ||
    returnInitializedReasonId === 15
  ) {
    const refundDescription = ui('tracking.returnRequestRefundDescAlt');
    const positionOfSpecialText = refundDescription.indexOf(
      ui('tracking.returnRequestDescSpecialText'),
    );

    if (positionOfSpecialText !== -1) {
      const firstLine = refundDescription.substring(0, positionOfSpecialText);
      const secondLine = ui('tracking.returnRequestDescSpecialText');
      const thirdLine = refundDescription.substring(
        firstLine.length + secondLine.length,
      );
      descriptionWithSpecialText.push(firstLine, secondLine, thirdLine);
    }

    const addedDescription = {
      title: ui('tracking.returnRequestRefund'),
      description: '',
    };
    detailsDisplayArray.push(addedDescription);
  }

  return status === OrderStatus.RETURN_REQUESTED ? (
    <div css={[styles.returnContainer, styles.returnRequestContainer]}>
      <h1 css={styles.returnInitiateStepDescription}>
        {ui('tracking.returnRequestedDescription')}
      </h1>
    </div>
  ) : (
    status === OrderStatus.RETURN_INITIATED && (
      <div css={styles.returnContainer}>
        <h1 css={styles.returnInitiateTitle}>
          {ui('tracking.returnInitiateTitle')}
        </h1>
        <h1 css={styles.returnInitiateEmailDescription}>
          {ui('tracking.returnInitiateEmailDesc', {
            maskedEmail,
          })}
        </h1>
        {detailsDisplayArray.map((item, index) => (
          <div key={index}>
            <h1 css={styles.returnInitiateStepTitle}>
              {index + 1}. {item.title}
            </h1>
            {item.description ? (
              <h1 css={styles.returnInitiateStepDescription}>
                {item.description}
              </h1>
            ) : (
              <span css={styles.returnInitiateStepDescription}>
                {descriptionWithSpecialText[0]}
                <span css={styles.specialLabel}>
                  {descriptionWithSpecialText[1]}
                </span>
                {descriptionWithSpecialText[2]}
              </span>
            )}
          </div>
        ))}
      </div>
    )
  );
}

export function getOrderRecieptURL({ orderId, zip }: OrderTrackingInput) {
  if (isClient()) {
    const hostName = window.location.host;
    const urlProtocol = hostName.includes('localhost') ? 'http' : 'https';
    return `${urlProtocol}://${hostName}/api/order-reciept?orderId=${orderId}&zip=${zip}`;
  }
  return '/';
}
