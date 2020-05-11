import { boolean } from '@storybook/addon-knobs';

import Footer from './Footer';

export default {
  component: Footer,
  title: 'Footer',
};

export function FooterWithKnobs() {
  return (
    <Footer isCustomerServiceEnabled={boolean('Is Business Hours', true)} />
  );
}

export function FooterIsBusinessHours() {
  return <Footer isCustomerServiceEnabled />;
}

export function FooterIsNotBusinessHours() {
  return <Footer />;
}
