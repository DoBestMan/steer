import { keyframes } from '@emotion/core';

import { StylesMap } from '~/lib/constants';

import { SCENERIES, SCENERIES_WIDTH } from './Scenery.constants';

export const backgroundImageRural = keyframes({
  '0%': {
    backgroundPositionX: '0',
  },
  '100%': {
    backgroundPositionX: `-${SCENERIES_WIDTH.RURAL}px`,
  },
});

export const backgroundImageSuburban = keyframes({
  '0%': {
    backgroundPositionX: '0',
  },
  '100%': {
    backgroundPositionX: `-${SCENERIES_WIDTH.SUBURBAN}px`,
  },
});

export const backgroundImageUrban = keyframes({
  '0%': {
    backgroundPositionX: '0',
  },
  '100%': {
    backgroundPositionX: `-${SCENERIES_WIDTH.URBAN}px`,
  },
});

export const styles: StylesMap = {
  container: {
    backgroundPositionY: 0,
    backgroundRepeat: 'repeat-x',
    height: '130px',
    pointerEvents: 'none',
  },
  [`containerAnimated_${SCENERIES.RURAL}`]: {
    animation: `${backgroundImageRural} 50s linear infinite`,
  },
  [`containerAnimated_${SCENERIES.SUBURBAN}`]: {
    animation: `${backgroundImageSuburban} 50s linear infinite`,
  },
  [`containerAnimated_${SCENERIES.URBAN}`]: {
    animation: `${backgroundImageUrban} 50s linear infinite`,
  },
};
