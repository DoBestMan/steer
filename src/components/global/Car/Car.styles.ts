import { css, keyframes } from '@emotion/core';

import { MQ } from '~/lib/constants';

import { DEFAULT_SCALE_VECTOR } from './Car.constants';

export const rotateWheel = keyframes({
  '0%': {
    transform: 'rotateZ(0deg)',
  },
  '100%': {
    transform: 'rotateZ(360deg)',
  },
});

export const styles = {
  animateWheel: css({
    svg: {
      '.back-wheel, .front-wheel': {
        animation: `${rotateWheel} 2000ms linear infinite`,
      },
    },
  }),
  container: css({
    '.SVGInline': {
      display: 'block',
      fontSize: 0,
      height: '100%',
    },

    display: 'inline-block',

    svg: {
      // set just in case
      '.solid-body-background': {
        '*': {
          fillOpacity: 0,
          opacity: 0,
        },

        fillOpacity: 1,
        opacity: 1,
      },

      backfaceVisibility: 'hidden',
      height: 'auto',
      transform: `scale3d(${DEFAULT_SCALE_VECTOR.S}, ${DEFAULT_SCALE_VECTOR.S}, ${DEFAULT_SCALE_VECTOR.S})`,
    },
  }),
  scaleAcrossBreakpoints: css({
    transformOrigin: '100% 100%',

    [MQ.M]: {
      transform: `scale3d(${DEFAULT_SCALE_VECTOR.M}, ${DEFAULT_SCALE_VECTOR.M}, ${DEFAULT_SCALE_VECTOR.M})`,
    },

    [MQ.L]: {
      transform: `scale3d(${DEFAULT_SCALE_VECTOR.L}, ${DEFAULT_SCALE_VECTOR.L}, ${DEFAULT_SCALE_VECTOR.L})`,
    },
  }),
  solid: css({
    svg: {
      '.solid-body-background *': {
        fillOpacity: 1,
        opacity: 1,
      },
    },
  }),
};
