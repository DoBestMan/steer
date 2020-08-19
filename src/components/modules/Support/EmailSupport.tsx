import { ICONS } from '~/components/global/Icon/Icon.constants';
import IconCTA from '~/components/global/Link/IconCTA';
import { LINK_THEME, THEME } from '~/lib/constants';

import { supportData } from './Support.data';

export interface Props {
  isCustomerServiceEnabled?: boolean;
  theme?: THEME.DARK | THEME.LIGHT | LINK_THEME;
}

function EmailSupport({
  isCustomerServiceEnabled,
  theme = LINK_THEME.LIGHT_HIGHLIGHTED,
  ...rest
}: Props) {
  const supportContent = isCustomerServiceEnabled
    ? supportData.isBusinessHours
    : supportData.isNotBusinessHours;

  return (
    <IconCTA
      theme={theme}
      icon={ICONS.MAIL}
      href={supportContent.support.action}
      {...rest}
    >
      {supportContent.support.text}
    </IconCTA>
  );
}

export default EmailSupport;
