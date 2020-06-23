import { CSSObject } from '@emotion/core';

import { COLORS, EASING, TIME } from '~/lib/constants';

export const styles: CSSObject = {
  exploreButton: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderTop: `1px solid ${COLORS.ORANGE.TINT_30}`,
    bottom: 0,
    boxSizing: 'border-box',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    justifyContent: 'space-between',
    left: 0,
    padding: 20,
    position: 'fixed',
    textAlign: 'left',
    width: '100%',
  },
  isStatic: {
    position: 'static',
  },
  pick: {
    position: 'relative',
  },

  root: {
    '&:hover': {
      '.swiper-slide-active': {
        zIndex: 2,
      },
    },

    // remove any pointer events because each slide takes 100% viewport width.
    '.swiper-slide': {
      pointerEvents: 'none',

      '> *': {
        pointerEvents: 'all',
        transition: `opacity ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
      },
    },
    // above current or next so we can click on it
    '.swiper-slide-prev': {
      zIndex: 1,
    },
    '.swiper-wrapper': {
      boxSizing: 'border-box',
    },

    // so the explore more button doesn't jump
    minHeight: '100vh',
  },
};
