import { select } from '@storybook/addon-knobs';

import { StylesMap } from '~/lib/constants';

import Weather from './Weather';
import { Weathers } from './Weather.types';

const styles: StylesMap = {
  container: {
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
};

export default {
  component: Weather,
  title: 'Global/Weather',
};

export function WeatherWithKnobs() {
  const weatherID = select(
    'Weather',
    Object.keys(Weathers),
    Object.keys(Weathers)[0],
  ) as Weathers;

  return (
    <div css={styles.container}>
      <Weather weatherID={weatherID} />
    </div>
  );
}
