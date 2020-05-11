import IconCTA from '~/components/global/Link/IconCTA';
import { LINK_THEME } from '~/lib/constants';

import { data } from './Support.data';

export interface Props {
  isCustomerServiceEnabled?: boolean;
}

function EmailSupport({ isCustomerServiceEnabled }: Props) {
  const supportContent = isCustomerServiceEnabled
    ? data.isBusinessHours
    : data.isNotBusinessHours;

  return (
    <IconCTA
      theme={LINK_THEME.LIGHT}
      icon="mail"
      href={supportContent.support.action}
    >
      {supportContent.support.text}
    </IconCTA>
  );
}

export default EmailSupport;
