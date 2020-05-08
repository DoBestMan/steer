import IconCTA from '~/components/global/Link/IconCTA';
import { LINK_THEME } from '~/lib/constants';

import { data } from './Support.data';

export interface Props {
  isCustomerServiceEnabled?: boolean;
}

function PhoneSupport({ isCustomerServiceEnabled }: Props) {
  const supportContent = isCustomerServiceEnabled
    ? data.isBusinessHours
    : data.isNotBusinessHours;

  return (
    <IconCTA
      theme={LINK_THEME.LIGHT}
      icon="phone"
      href={supportContent.sales.action}
    >
      {supportContent.sales.text}
    </IconCTA>
  );
}

export default PhoneSupport;
