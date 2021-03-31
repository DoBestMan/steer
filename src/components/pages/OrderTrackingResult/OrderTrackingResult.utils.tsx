import Link from '~/components/global/Link/Link';
import { OrderAppointment } from '~/data/models/OrderAppointment';
import { UserAddress } from '~/data/models/UserAddress';
import { LINK_THEME, ROUTE_MAP, ROUTES } from '~/lib/constants';
import { formatOrNull } from '~/lib/utils/date';
import { ui } from '~/lib/utils/ui-dictionary';
import { uiJSX } from '~/lib/utils/ui-dictionary-jsx';

export enum OrderStatus {
  CANCELLED = 'cancelled',
  DELIVERED = 'delivered',
  PREPARED = 'prepared',
  RECEIVED = 'received',
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

  const appointmentDate = `${date ? formatOrNull(date) : ''} ${
    timeSlot ? ' | ' + timeSlot : ''
  }`;

  const resultArray = [
    company,
    addressLine1,
    addressLine2,
    appointmentAddress,
    appointmentDate,
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
