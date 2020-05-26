import { css, keyframes } from '@emotion/core';

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

export const styles = {
  container: css({
    backgroundRepeat: 'repeat-x',
    height: '130px',
    pointerEvents: 'none',
  }),
  [`containerAnimated_${SCENERIES.RURAL}`]: css({
    animation: `${backgroundImageRural} 17s linear infinite`,
  }),
  [`containerAnimated_${SCENERIES.SUBURBAN}`]: css({
    animation: `${backgroundImageSuburban} 17s linear infinite`,
  }),
  [`containerAnimated_${SCENERIES.URBAN}`]: css({
    animation: `${backgroundImageUrban} 17s linear infinite`,
  }),
};