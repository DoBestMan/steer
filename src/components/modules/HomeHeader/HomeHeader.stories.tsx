import { object, text } from '@storybook/addon-knobs';

import HomeHeader from './HomeHeader';

export default {
  component: HomeHeader,
  parameters: {
    knobs: {
      escapeHTML: false,
    },
  },
  title: 'HomeHeader',
};

const defaultEyebrow = {
  countdownEnd: null,
  text: 'Black Friday',
};

const countdownEyebrow = {
  countdownEnd: '09:05:23',
  text: 'Black Friday',
};

export function HeaderWithKnobs() {
  const headerData = {
    body: text(
      'Description',
      'Access over 55 million tires,<br />10,000 installation centers, <br />300 brands. <br />All in one place.',
    ),
    eyebrow: object('Promo object', defaultEyebrow),
    sceneryType: text('Landscape ID', 'forrest'),
    title: text('Title', 'Replacing <br /> tires is now <br />simple**.**'),
    vehicleType: text('Vehicle ID', 'car'),
  };

  return <HomeHeader {...headerData} />;
}

export function DefaultHeader() {
  const headerData = {
    body: text(
      'Description',
      'Access over 55 million tires,<br />10,000 installation centers, <br />300 brands. <br />All in one place.',
    ),
    eyebrow: null,
    sceneryType: text('Landscape ID', 'forrest'),
    title: text('Title', 'Replacing <br /> tires is now <br />simple**.**'),
    vehicleType: text('Vehicle ID', 'car'),
  };

  return <HomeHeader {...headerData} />;
}

export function PromoHeaderDefault() {
  const headerData = {
    body: text(
      'Description',
      'Access over 55 million tires,<br />10,000 installation centers, <br />300 brands. <br />All in one place.',
    ),
    eyebrow: object('Promo object', defaultEyebrow),
    sceneryType: text('Landscape ID', 'forrest'),
    title: text('Title', 'Replacing <br /> tires is now <br />simple**.**'),
    vehicleType: text('Vehicle ID', 'car'),
  };

  return <HomeHeader {...headerData} />;
}

export function PromoHeaderCountdown() {
  const headerData = {
    body: text(
      'Description',
      'Access over 55 million tires,<br />10,000 installation centers, <br />300 brands. <br />All in one place.',
    ),
    eyebrow: object('Promo object', countdownEyebrow),
    sceneryType: text('Landscape ID', 'forrest'),
    title: text('Title', 'Replacing <br /> tires is now <br />simple**.**'),
    vehicleType: text('Vehicle ID', 'car'),
  };

  return <HomeHeader {...headerData} />;
}
