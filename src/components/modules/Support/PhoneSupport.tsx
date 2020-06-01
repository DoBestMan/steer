import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconCTA from '~/components/global/Link/IconCTA';
import { LINK_THEME } from '~/lib/constants';

import { data } from './Support.data';

export interface Props {
  isCustomerServiceEnabled?: boolean;
  theme?: LINK_THEME;
}

function PhoneSupport({
  isCustomerServiceEnabled,
  theme = LINK_THEME.LIGHT,
}: Props) {
  const supportContent = isCustomerServiceEnabled
    ? data.isBusinessHours
    : data.isNotBusinessHours;

  return (
    <IconCTA
      theme={theme}
      icon={ICONS.PHONE}
      href={supportContent.sales.action}
    >
      {supportContent.sales.text}
    </IconCTA>
  );
}

export default PhoneSupport;
