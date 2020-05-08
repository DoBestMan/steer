import { data } from './Support.data';

export interface Props {
  isCustomerServiceEnabled?: boolean;
}

function SupportHeading({ isCustomerServiceEnabled, ...rest }: Props) {
  const supportContent = isCustomerServiceEnabled
    ? data.isBusinessHours
    : data.isNotBusinessHours;

  return <p {...rest}>{supportContent.heading}</p>;
}

export default SupportHeading;
