import { CSSObject } from '@emotion/core';

import { WHEEL_WIDTH } from '~/components/global/Car/Car.constants';
import { NAV_HEIGHT } from '~/components/modules/Nav/Nav.styles';
import {
  COLORS,
  EASING,
  MQ,
  SAFARI_ONLY,
  SPACING,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

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
  S: '60%',
  M: '65%',
  L: '66.6666666%',
};

export const TOP_CONTAINER_MIN_HEIGHT = {
  S: 385,
  M: 517,
  L: 538,
};

export const SPACING_FROM_TOP = {
  S: 77,
  M: 115,
  L: 141,
};

export const styles: CSSObject = {
  carousel: {
    '&:after': {
      background: COLORS.LIGHT.GRAY_20,
      borderRadius: '20px 20px 0px 0px',
      content: '""',
      display: 'block',
      height: `calc(100% - ${SPACING_FROM_TOP.S}px)`,
      left: '50%',
      opacity: 0.3,
      position: 'absolute',
      top: SPACING_FROM_TOP.S,
      transform: 'translateX(-50%)',
      width: 300,

      [MQ.M]: {
        height: `calc(100% - ${SPACING_FROM_TOP.M}px)`,
        top: SPACING_FROM_TOP.M,
        width: 478,
      },
      [MQ.L]: {
        height: `calc(100% - ${SPACING_FROM_TOP.L}px)`,
        top: SPACING_FROM_TOP.L,
        transform: 'translateX(-50% - 10px)',
      },
    },
    '&:hover': {
      '.swiper-slide-active': {
        zIndex: Z_INDEX.TOP,
      },
    },

    // Ensure carousel spans the width of the container
    '.swiper-container': {
      width: '100%',
    },

    // remove any pointer events because each slide takes 100% viewport width.
    '.swiper-slide': {
      height: '100%',
      pointerEvents: 'none',

      '> *': {
        pointerEvents: 'all',
        transition: `opacity ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
      },
    },

    // above current or next so we can click on it
    '.swiper-slide-prev': {
      zIndex: Z_INDEX.FRONT,
    },

    display: 'flex',
    flex: 1,
    position: 'relative',
  },
  description: {
    display: 'block',
    marginTop: SPACING.SIZE_10,
    opacity: 0,
    transition: `opacity ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  descriptionShow: {
    opacity: 1,
    transition: `opacity ${TIME.MS350}ms ${EASING.CUBIC_EASE_OUT} ${TIME.MS300}ms`,
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
    position: 'relative',
    textAlign: 'left',
    width: '100%',
    zIndex: Z_INDEX.FRONT,

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
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',

    [SAFARI_ONLY]: {
      minHeight: '-webkit-fill-available',
    },
  },

  title: {
    display: 'block',
    opacity: 0,
    pointerEvents: 'none',
    transition: `opacity ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
  },

  titleBottom: [
    typography.primaryHeadline,
    {
      display: 'inline',
      fontSize: '15px',
      [MQ.M]: {
        fontSize: '22px',
      },
      [MQ.L]: {
        fontSize: '22px',
      },
    },
  ],

  // Take whatever space's left
  titleContainer: {
    color: COLORS.GLOBAL.BLACK,
    display: 'block',
    height: `calc(${TOP_CONTENT_HEIGHT.S} - ${
      WHEEL_WIDTH.S + ASSET_MARGIN_TOP.S + NAV_HEIGHT.S
    }px)`,
    marginTop: NAV_HEIGHT.S,
    opacity: 0,
    pointerEvents: 'none',
    position: 'absolute',
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
    zIndex: Z_INDEX.TOP,

    [MQ.M]: {
      height: `calc(${TOP_CONTENT_HEIGHT.M} - ${
        WHEEL_WIDTH.M + ASSET_MARGIN_TOP.M + NAV_HEIGHT.M
      }px)`,
      marginTop: NAV_HEIGHT.M,
    },

    [MQ.L]: {
      height: `calc(${TOP_CONTENT_HEIGHT.L} - ${
        WHEEL_WIDTH.L + ASSET_MARGIN_TOP.L + NAV_HEIGHT.L
      }px)`,
      marginTop: NAV_HEIGHT.L,
    },
  },

  titleContainerInner: {
    color: COLORS.GLOBAL.BLACK,
    display: 'block',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    textAlign: 'center',
    top: SPACING_FROM_TOP.S + 15,
    transform: 'translate3d(0, 0, 0)',
    width: '100%',
    [MQ.M]: {
      top: SPACING_FROM_TOP.M + 57,
    },
    [MQ.L]: {
      left: '50%',
      top: SPACING_FROM_TOP.L + 40,
      transform: 'translate3d(-50%, 0, 0)',
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

  titleLine1: [
    typography.primaryHeadline,
    {
      display: 'block',
      fontSize: '15px',
      [MQ.M]: {
        fontSize: '22px',
      },
      [MQ.L]: {
        fontSize: '22px',
      },
    },
  ],

  titlesContainer: {
    height: `calc(100% - ${EXPLORE_BUTTON_HEIGHT.S}px)`,
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },

  titleShow: {
    opacity: 1,
    pointerEvents: 'all',
    transition: `opacity ${TIME.MS350}ms ${EASING.CUBIC_EASE_OUT} ${TIME.MS300}ms`,
  },
};
