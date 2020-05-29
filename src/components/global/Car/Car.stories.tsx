import { boolean, select } from '@storybook/addon-knobs';
import { Fragment } from 'react';

import { typography } from '~/styles/typography.styles';

import Car from './Car';
import { Cars } from './Car.enums';

export default {
  component: Car,
  title: 'Cars',
};

export function CarWithKnobs() {
  const car = select('Car', Object.keys(Cars), Object.keys(Cars)[0]);
  const animateWheel = boolean('animateWheel', false);

  return (
    <Fragment>
      <Car animateWheel={animateWheel} carId={car} />
    </Fragment>
  );
}

export function AllCars() {
  return (
    <ul>
      {Object.keys(Cars).map((car) => {
        return (
          <li key={car}>
            <p css={typography.primaryHeadline}>{car}</p>
            <Car carId={car} />
          </li>
        );
      })}
    </ul>
  );
}
