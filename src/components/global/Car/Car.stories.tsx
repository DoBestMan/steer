import { boolean, select } from '@storybook/addon-knobs';
import { Fragment } from 'react';

import { typography } from '~/styles/typography.styles';

import Car from './Car';
import { Cars, CarSizes } from './Car.types';

export default {
  component: Car,
  title: 'Cars',
};

export function CarWithKnobs() {
  const car = select('Car', Object.keys(Cars), Object.keys(Cars)[0]);
  const size = select('Size', Object.keys(CarSizes), CarSizes['none']);
  const animateWheel = boolean('animateWheel', false);

  return (
    <Fragment>
      <Car animateWheel={animateWheel} carId={car} size={size as CarSizes} />
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
            <Car carId={car} size={CarSizes.small} />
          </li>
        );
      })}
    </ul>
  );
}
