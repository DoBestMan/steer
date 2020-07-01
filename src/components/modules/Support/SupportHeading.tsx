import { ui } from '~/lib/utils/ui-dictionary';

export interface Props {
  isCustomerServiceEnabled?: boolean;
  isInFooter?: boolean;
}

function SupportHeading({
  isCustomerServiceEnabled,
  isInFooter = false,
  ...rest
}: Props) {
  const heading = isCustomerServiceEnabled
    ? ui('support.enabled')
    : ui('support.disabled');

  const Container = isInFooter ? 'h2' : 'p';

  return <Container {...rest}>{heading}</Container>;
}

export default SupportHeading;
