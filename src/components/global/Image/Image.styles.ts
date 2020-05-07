import { css } from '@emotion/core';

import { COLORS, TIME } from '~/lib/constants';

const styles = {
  image: css({
    display: 'block',
    objectFit: 'inherit',
    objectPosition: 'inherit',
    opacity: 0,
    transition: `opacity ${TIME.MS350}ms ease-in-out`,
  }),

  isLoaded: css({
    opacity: 1,
  }),

  placeholder: css({
    backgroundColor: COLORS.LIGHT.GRAY_10,
  }),

  root: css({
    backgroundColor: 'transparent',
    display: 'block',
    objectFit: 'contain',
    transition: `backgroundColor ${TIME.MS100}ms ease-in-out`,
  }),
};

export default styles;
