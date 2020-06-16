import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconCTA from '~/components/global/Link/IconCTA';
import { LINK_THEME, THEME } from '~/lib/constants';

import { data } from './Support.data';

export interface Props {
  isCustomerServiceEnabled?: boolean;
  theme?: THEME.DARK | THEME.LIGHT | LINK_THEME;
}

function EmailSupport({
  isCustomerServiceEnabled,
  theme = THEME.LIGHT,
}: Props) {
  const supportContent = isCustomerServiceEnabled
    ? data.isBusinessHours
    : data.isNotBusinessHours;

  return (
    <IconCTA
      theme={theme}
      icon={ICONS.MAIL}
      href={supportContent.support.action}
    >
      {supportContent.support.text}
    </IconCTA>
  );
}

export default EmailSupport;
