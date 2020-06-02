import { select, text } from '@storybook/addon-knobs';

import { Cars } from '~/components/global/Car/Car.enums';
import { Sceneries } from '~/components/global/Scenery/Scenery.types';
import { Weathers } from '~/components/global/Weather/Weather.types';

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
  const weathersList = Object.keys(Weathers);
  weathersList.push('None');

  const headerData = {
    body: text(
      'Description',
      'Access over 55 million tires,<br />10,000 installation centers,<br />300 brands.<br />All in one place.',
    ),
    eyebrow: text('Promo', 'Black Friday'),
    sceneryType: select(
      'Scenery ID',
      Object.keys(Sceneries),
      Sceneries['scenery--rural'],
    ),
    title: text('Title', 'Replacing<br />tires is now<br />simple**.**'),
    vehicleTypes: Object.keys(Cars),
    weatherType: select(
      'Weather ID',
      weathersList,
      Weathers['weather--raining'],
    ),
  };

  return <HomeHeader {...headerData} />;
}

export function DefaultHeader() {
  const weathersList = Object.keys(Weathers);
  weathersList.push('None');

  const headerData = {
    body: text(
      'Description',
      'Access over 55 million tires,<br />10,000 installation centers,<br />300 brands.<br />All in one place.',
    ),
    eyebrow: null,
    sceneryType: select(
      'Scenery ID',
      Object.keys(Sceneries),
      Sceneries['scenery--rural'],
    ),
    title: text('Title', 'Replacing<br /> tires is now<br />simple**.**'),
    vehicleTypes: Object.keys(Cars),
    weatherType: select(
      'Weather ID',
      weathersList,
      Weathers['weather--raining'],
    ),
  };

  return <HomeHeader {...headerData} />;
}

export function PromoHeaderDefault() {
  const weathersList = Object.keys(Weathers);
  weathersList.push('None');

  const headerData = {
    body: text(
      'Description',
      'Access over 55 million tires,<br />10,000 installation centers,<br />300 brands.<br />All in one place.',
    ),
    eyebrow: text('Promo', 'Black Friday'),
    sceneryType: select(
      'Scenery ID',
      Object.keys(Sceneries),
      Sceneries['scenery--rural'],
    ),
    title: text('Title', 'Replacing<br /> tires is now<br />simple**.**'),
    vehicleTypes: Object.keys(Cars),
    weatherType: select(
      'Weather ID',
      weathersList,
      Weathers['weather--raining'],
    ),
  };

  return <HomeHeader {...headerData} />;
}
