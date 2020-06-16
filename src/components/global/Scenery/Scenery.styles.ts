import { keyframes } from '@emotion/core';

import { StylesMap } from '~/lib/constants';

import { SCENERIES, SCENERIES_WIDTH } from './Scenery.constants';

export const backgroundImageRural = keyframes({
  '0%': {
    backgroundPosition: '0 0',
  },
  '100%': {
    backgroundPosition: `-${SCENERIES_WIDTH.RURAL}px 0`,
  },
});

export const backgroundImageSuburban = keyframes({
  '0%': {
    backgroundPosition: '0 0',
  },
  '100%': {
    backgroundPosition: `-${SCENERIES_WIDTH.SUBURBAN}px 0`,
  },
});

export const backgroundImageUrban = keyframes({
  '0%': {
    backgroundPosition: '0 0',
  },
  '100%': {
    backgroundPosition: `-${SCENERIES_WIDTH.URBAN}px 0`,
  },
});

export const styles: StylesMap = {
  container: {
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
