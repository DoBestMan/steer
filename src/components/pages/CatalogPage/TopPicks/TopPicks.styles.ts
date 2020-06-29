import { CSSObject } from '@emotion/core';

import { COLORS, EASING, MQ, TIME } from '~/lib/constants';

export const EXPLORE_BUTTON_HEIGHT = {
  S: 60,
  XL: 66,
};

export const styles: CSSObject = {
  exploreButton: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderTop: `1px solid ${COLORS.ORANGE.TINT_30}`,
    boxSizing: 'border-box',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    justifyContent: 'space-between',
    padding: 20,
    textAlign: 'left',
    width: '100%',
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

    // so the explore more button doesn't jump and sticks to the bottom
    minHeight: `calc(100vh - ${EXPLORE_BUTTON_HEIGHT.S}px)`,

    [MQ.XL]: {
      minHeight: `calc(100vh - ${EXPLORE_BUTTON_HEIGHT.XL}px)`,
    },
  },
};
