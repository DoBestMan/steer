import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconCTA from '~/components/global/Link/IconCTA';
import { LINK_THEME, THEME } from '~/lib/constants';

import { data } from './Support.data';

export interface Props {
  customerServiceNumber: { display: string; value: string };
  isCustomerServiceEnabled?: boolean;
  theme?: THEME.DARK | THEME.LIGHT | LINK_THEME.DARK_HIGHLIGHTED;
}

function PhoneSupport({
  customerServiceNumber: { value, display },
  isCustomerServiceEnabled,
  theme = THEME.LIGHT,
  ...rest
}: Props) {
  const supportContent = isCustomerServiceEnabled
    ? data.isBusinessHours
    : data.isNotBusinessHours;

  const copy = isCustomerServiceEnabled
    ? `${supportContent.sales.text} ${display}`
    : supportContent.sales.text;
  const action = isCustomerServiceEnabled
    ? `tel:${value}`
    : supportContent.sales.action;

  return (
    <IconCTA
      theme={theme}
      icon={ICONS.PHONE}
      href={action}
      useBaseLink={!isCustomerServiceEnabled}
      {...rest}
    >
      {copy}
    </IconCTA>
  );
}

export default PhoneSupport;
