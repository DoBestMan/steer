import { CSSObject } from '@emotion/core';

import { COLORS, TIME } from '~/lib/constants';

const styles: CSSObject = {
  image: {
    display: 'block',
    objectFit: 'inherit',
    objectPosition: 'inherit',
    opacity: 0,
    transition: `opacity ${TIME.MS350}ms ease-in-out`,
  },

  isLoaded: {
    opacity: 1,
  },

  placeholder: {
    backgroundColor: COLORS.LIGHT.GRAY_10,
  },

  responsive: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  root: {
    backgroundColor: 'transparent',
    display: 'block',
    objectFit: 'contain',
    transition: `backgroundColor ${TIME.MS100}ms ease-in-out`,
  },
};

export default styles;
