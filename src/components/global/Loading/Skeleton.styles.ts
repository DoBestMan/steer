import { keyframes } from '@emotion/core';

import { SPACING, StylesMap, THEME, TIME } from '~/lib/constants';

const CONSTANTS = {
  ANIMATION_STEP: TIME.MS2000,
  DARK_GRADIENT: 'linear-gradient(90deg, #797979 0%, #181818 59.51%)',
  LIGHT_GRADIENT: 'linear-gradient(90deg, #CECECE 0%, #FFFDFD 82.67%)',
};

export const animation = keyframes({
  '0%': {
    width: '10%',
  },
  '100%': {
    width: '100%',
  },
});

const styles: StylesMap = {
  container: {
    display: 'block',
    width: '100%',
    marginBottom: `${SPACING.SIZE_05}px`,
  },
  loading: {
    animationDuration: `${CONSTANTS.ANIMATION_STEP}ms`,
    animationIterationCount: 'infinite',
    animationName: animation,
    height: '100%',
    width: '100%',
  },
  [THEME.DARK]: {
    backgroundImage: CONSTANTS.DARK_GRADIENT,
  },
  [THEME.LIGHT]: {
    backgroundImage: CONSTANTS.LIGHT_GRADIENT,
  },
};

export default styles;
