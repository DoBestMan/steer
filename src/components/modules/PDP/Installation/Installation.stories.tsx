import { action } from '@storybook/addon-actions';
import { select } from '@storybook/addon-knobs';

import { CARS, CARS_KEYS } from '~/components/global/Car/CarDetails.constants';
import {
  SCENERIES,
  SCENERIES_KEYS,
} from '~/components/global/Scenery/Scenery.constants';

import Installation from './Installation';

export default {
  component: Installation,
  title: 'PDP/Installation',
};

export function InstallationWithKnobs() {
  const carKeys = Object.keys(CARS_KEYS);
  const carSelect = select('Car', carKeys, CARS_KEYS.HONDA_CIVIC);
  const vehicleType = CARS[carSelect as CARS_KEYS];

  const sceneryKeys = Object.keys(SCENERIES_KEYS);
  const scenerySelect = select('Scenery', sceneryKeys, SCENERIES_KEYS.URBAN);
  const sceneryType = SCENERIES[scenerySelect as SCENERIES_KEYS];

  return (
    <Installation
      vehicleType={vehicleType}
      sceneryType={sceneryType}
      openStaticModal={action('openStaticModal')}
    />
  );
}
