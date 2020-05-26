import { css } from '@emotion/core';
import { select } from '@storybook/addon-knobs';

import Weather from './Weather';
import { Weathers } from './Weather.types';

const styles = {
  container: css({
    height: '100%',
    position: 'absolute',
    width: '100%',
  }),
};

export default {
  component: Weather,
  title: 'Weather',
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