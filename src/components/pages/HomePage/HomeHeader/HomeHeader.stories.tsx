import { text } from '@storybook/addon-knobs';

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

export function HeaderWithKnobs() {
  const headerData = {
    body: text(
      'Description',
      'Access over 55 million tires,<br />10,000 installation centers, <br />300 brands. <br />All in one place.',
    ),
    eyebrow: text('Promo', 'Black Friday'),
    eyebrowCountdownEnd: null,
    sceneryType: text('Landscape ID', 'mountain'),
    title: text('Title', 'Replacing <br /> tires is now <br />simple**.**'),
    vehicleType: text('Vehicle ID', 'hatch'),
    weatherType: null,
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
    eyebrowCountdownEnd: null,
    sceneryType: text('Landscape ID', 'mountain'),
    title: text('Title', 'Replacing <br /> tires is now <br />simple**.**'),
    vehicleType: text('Vehicle ID', 'hatch'),
    weatherType: null,
  };

  return <HomeHeader {...headerData} />;
}

export function PromoHeaderDefault() {
  const headerData = {
    body: text(
      'Description',
      'Access over 55 million tires,<br />10,000 installation centers, <br />300 brands. <br />All in one place.',
    ),
    eyebrow: text('Promo', 'Black Friday'),
    eyebrowCountdownEnd: null,
    sceneryType: text('Landscape ID', 'mountain'),
    title: text('Title', 'Replacing <br /> tires is now <br />simple**.**'),
    vehicleType: text('Vehicle ID', 'hatch'),
    weatherType: null,
  };

  return <HomeHeader {...headerData} />;
}
