import { css, keyframes } from '@emotion/core';

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
      '.solid-body-background *': {
        fillOpacity: 0,
      },

      height: 'auto',
      width: '100%',
    },
  }),
  solid: css({
    svg: {
      '.solid-body-background *': {
        fillOpacity: 1,
      },
    },
  }),
};
