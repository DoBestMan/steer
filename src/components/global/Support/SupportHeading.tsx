import { ui } from '~/lib/utils/ui-dictionary';

export interface Props {
  isCustomerServiceEnabled?: boolean;
}

function SupportHeading({ isCustomerServiceEnabled, ...rest }: Props) {
  const heading = isCustomerServiceEnabled
    ? ui('support.enabled')
    : ui('support.disabled');

  return <p {...rest}>{heading}</p>;
}

export default SupportHeading;
