import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconCTA from '~/components/global/Link/IconCTA';
import { LINK_THEME, THEME } from '~/lib/constants';

import { data } from './Support.data';

export interface Props {
  isCustomerServiceEnabled?: boolean;
  theme?: THEME.DARK | THEME.LIGHT | LINK_THEME.DARK_HIGHLIGHTED;
}

function PhoneSupport({
  isCustomerServiceEnabled,
  theme = THEME.LIGHT,
  ...rest
}: Props) {
  const supportContent = isCustomerServiceEnabled
    ? data.isBusinessHours
    : data.isNotBusinessHours;

  return (
    <IconCTA
      theme={theme}
      icon={ICONS.PHONE}
      href={supportContent.sales.action}
      {...rest}
    >
      {supportContent.sales.text}
    </IconCTA>
  );
}

export default PhoneSupport;
