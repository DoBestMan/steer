import { boolean } from '@storybook/addon-knobs';

import Footer from './Footer';

export default {
  component: Footer,
  title: 'Footer/Footer',
};

const customerServiceNumber = {
  display: '(888) 410 0604',
  value: '18884100604',
};

export function FooterWithKnobs() {
  return (
    <Footer
      customerServiceNumber={customerServiceNumber}
      isCustomerServiceEnabled={boolean('Is Business Hours', true)}
    />
  );
}

export function FooterIsBusinessHours() {
  return (
    <Footer
      customerServiceNumber={customerServiceNumber}
      isCustomerServiceEnabled
    />
  );
}

export function FooterIsNotBusinessHours() {
  return <Footer customerServiceNumber={customerServiceNumber} />;
}
