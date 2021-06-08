import { keyframes } from '@emotion/core';

import { EASING, SPACING, StylesMap, TIME } from '~/lib/constants';

export const NUMBER_OF_TIRES = {
  MIN: 2,
  MAX: 5,
};

export const PRODUCT_WIDTH = {
  SMALL: 110,
  BIG: 122,
};

export const COLORS = {
  fontBase: '#333333',
  bgColor: '#cccccc',
};

export const LABEL_INITIAL_HEIGHT = SPACING.SIZE_20;

export const removingProduct = keyframes({
  '0%': {
    opacity: 1,
    width: 152,
  },
  '100%': {
    opacity: 0,
    width: '0px',
  },
});

export const ANIMATION: StylesMap = {
  removing: {
    animation: `${removingProduct} ${TIME.MS600}ms ${EASING.LINEAR} forwards`,
  },
};
