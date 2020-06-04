import { boolean, select } from '@storybook/addon-knobs';

import Scenery from './Scenery';
import { Sceneries } from './Scenery.types';

export default {
  component: Scenery,
  title: 'Global/Scenery',
};

export function WeatherWithKnobs() {
  const sceneryID = select(
    'Scenery',
    Object.keys(Sceneries),
    Object.keys(Sceneries)[0],
  ) as Sceneries;

  const animate = boolean('Animate', false);

  return (
    <div>
      <Scenery sceneryID={sceneryID} animate={animate} />
    </div>
  );
}
