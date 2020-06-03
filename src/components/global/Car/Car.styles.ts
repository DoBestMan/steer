import { css, keyframes } from '@emotion/core';

import { MQ } from '~/lib/constants';

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
      transform: 'scale3d(1.0, 1.0, 1.0)',
      width: '100%',
    },
  }),
  scaleAcrossBreakpoints: css({
    transformOrigin: '100% 100%',

    [MQ.M]: {
      transform: 'scale3d(1.5, 1.5, 1.5)',
    },

    [MQ.L]: {
      transform: 'scale3d(1.7, 1.7, 1.7)',
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
