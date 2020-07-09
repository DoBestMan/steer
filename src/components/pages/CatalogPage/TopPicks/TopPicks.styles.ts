import { CSSObject } from '@emotion/core';

import { WHEEL_WIDTH } from '~/components/global/Car/Car.constants';
import { NAV_HEIGHT } from '~/components/modules/Nav/Nav.styles';
import { COLORS, EASING, MQ, SPACING, TIME } from '~/lib/constants';

export const EXPLORE_BUTTON_HEIGHT = {
  S: 60,
  M: 80,
  L: 80,
  XL: 80,
};

export const ASSET_MARGIN_TOP = {
  S: 40,
  M: 50,
  L: 30,
};

export const TOP_CONTENT_HEIGHT = {
  S: '60vh',
  M: '65vh',
  L: '66.6666666vh',
};

const TOP_CONTAINER_MIN_HEIGHT = {
  S: 385,
  M: 517,
  L: 538,
};

export const styles: CSSObject = {
  description: {
    display: 'block',
    marginTop: SPACING.SIZE_10,
    opacity: 0,
    transform: 'translate3d(0, 10px, 0)',
  },
  descriptionShow: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
    transitionDelay: `${TIME.MS50}ms`,
  },
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

    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_20}px`,
    },

    [MQ.L]: {
      flexDirection: 'row-reverse',
      justifyContent: 'center',
    },

    [MQ.XL]: {
      padding: `27px ${SPACING.SIZE_20}px`,
    },
  },
  exploreButtonIcon: {
    [MQ.L]: {
      marginRight: SPACING.SIZE_15,
    },
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

    // Need some re-adjustements
    '.swiper-container': {
      marginLeft: SPACING.SIZE_05,
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

    [MQ.M]: {
      minHeight: `calc(100vh - ${EXPLORE_BUTTON_HEIGHT.M}px)`,
    },

    [MQ.L]: {
      minHeight: `calc(100vh - ${EXPLORE_BUTTON_HEIGHT.L}px)`,
    },

    [MQ.XL]: {
      minHeight: `calc(100vh - ${EXPLORE_BUTTON_HEIGHT.XL}px)`,
    },
  },

  title: {
    display: 'block',
    opacity: 0,
    pointerEvents: 'none',
    transform: `translate3d(0, ${SPACING.SIZE_15}px, 0)`,
  },

  titleBottom: {
    display: 'block',

    [MQ.L]: {
      display: 'inline',
    },
  },

  // Take whatever space's left
  titleContainer: {
    color: COLORS.GLOBAL.BLACK,
    display: 'block',
    flex: '1 1 auto',
    height: `calc(${TOP_CONTENT_HEIGHT.S} - ${
      WHEEL_WIDTH.S + ASSET_MARGIN_TOP.S + NAV_HEIGHT.S
    }px)`,
    marginTop: NAV_HEIGHT.S,
    minHeight:
      TOP_CONTAINER_MIN_HEIGHT.S -
      WHEEL_WIDTH.S -
      ASSET_MARGIN_TOP.S -
      NAV_HEIGHT.S,
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
    zIndex: 2,

    [MQ.M]: {
      height: `calc(${TOP_CONTENT_HEIGHT.M} - ${
        WHEEL_WIDTH.M + ASSET_MARGIN_TOP.M + NAV_HEIGHT.M
      }px)`,
      minHeight:
        TOP_CONTAINER_MIN_HEIGHT.M -
        WHEEL_WIDTH.M -
        ASSET_MARGIN_TOP.M -
        NAV_HEIGHT.M,
      marginTop: NAV_HEIGHT.M,
    },

    [MQ.L]: {
      height: `calc(${TOP_CONTENT_HEIGHT.L} - ${
        WHEEL_WIDTH.L + ASSET_MARGIN_TOP.L + NAV_HEIGHT.L
      }px)`,
      minHeight:
        TOP_CONTAINER_MIN_HEIGHT.L -
        WHEEL_WIDTH.L -
        ASSET_MARGIN_TOP.L -
        NAV_HEIGHT.L,
      marginTop: NAV_HEIGHT.L,
    },
  },

  titleContainerInner: {
    bottom: 0,
    display: 'block',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    textAlign: 'center',
    width: '100%',

    // more room, no need to fix to the bottom
    // also extending so the title takes the whole screen
    [MQ.M]: {
      bottom: 'auto',
      top: '50%',
      transform: 'translate3d(0, -50%, 0)',
    },

    [MQ.L]: {
      left: '50%',
      transform: 'translate3d(-50%, -50%, 0)',
      width: '100vw',
    },
  },
  titleContainerInnerShow: {
    pointerEvents: 'all',
  },

  titleContainerShow: {
    opacity: 1,
    pointerEvents: 'all',
  },

  titleShow: {
    opacity: 1,
    pointerEvents: 'all',
    transform: 'translate3d(0, 0, 0)',
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
  },
};
