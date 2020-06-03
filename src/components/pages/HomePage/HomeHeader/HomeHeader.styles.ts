import { css } from '@emotion/core';
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import {
  COLORS,
  EASING,
  GRID_MARGIN,
  MQ,
  RADIUS,
  SPACING,
} from '~/lib/constants';

export const CAR_ROTATION_DURATION = 400;
export const SCENERY_OR_WEATHER_DURATION = 400;

export const animations = {
  /* eslint-disable sort-keys */
  [`copyElement_${ENTERING}`]: {
    opacity: 0,
    transform: 'translate3d(0, 20px, 0)',
  },
  [`copyElement_${ENTERED}`]: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  [`copyElement_${EXITING}`]: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  [`copyElement_${EXITED}`]: {
    opacity: 0,
    transform: 'translate3d(0, 20px, 0)',
  },
  [`scenery_${ENTERING}`]: {
    opacity: 0,
  },
  [`scenery_${ENTERED}`]: {
    opacity: 1,
  },
  [`scenery_${EXITING}`]: {
    opacity: 0,
  },
  [`scenery_${EXITED}`]: {
    opacity: 0,
  },
  [`sceneryContainer_${ENTERING}`]: {
    opacity: 1,
  },
  [`sceneryContainer_${ENTERED}`]: {
    opacity: 1,
  },
  [`sceneryContainer_${EXITING}`]: {
    opacity: 1,
  },
  [`sceneryContainer_${EXITED}`]: {
    opacity: 0,
  },
  [`vehicle_${ENTERING}`]: {
    opacity: 0,
  },
  [`vehicle_${ENTERED}`]: {
    opacity: 1,
  },
  [`vehicle_${EXITING}`]: {
    opacity: 0,
  },
  [`vehicle_${EXITED}`]: {
    opacity: 0,
  },
  [`vehicleContainer_${ENTERING}`]: {
    transform: 'translate3d(0, 0, 0)',
  },
  [`vehicleContainer_${ENTERED}`]: {
    transform: 'translate3d(0, 0, 0)',
  },
  [`vehicleContainer_${EXITING}`]: {
    transform: 'translate3d(0, 0, 0)',
  },
  [`vehicleContainer_${EXITED}`]: {
    transform: 'translate3d(-100vw, 0, 0)',
  },
  [`weather_${ENTERING}`]: {
    opacity: 0,
  },
  [`weather_${ENTERED}`]: {
    opacity: 1,
  },
  [`weather_${EXITING}`]: {
    opacity: 1,
  },
  [`weather_${EXITED}`]: {
    opacity: 0,
  },
  /* eslint-enable sort-keys */
};

export const styles = {
  container: css({
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    flex: 1,
    paddingBottom: 20,
    paddingTop: 30,
    position: 'relative',

    [MQ.M]: {
      paddingBottom: 25,
      paddingTop: 40,
    },
    [MQ.L]: {
      paddingBottom: 60,
    },
  }),
  copyContainer: css({
    position: 'relative',
    zIndex: 1,
  }),
  description: css({
    color: COLORS.LIGHT.GRAY_70,
    transition: `all 300ms ${EASING.CUBIC_EASE_OUT}`,
    transitionDelay: '100ms',
  }),
  eyebrow: css({
    alignItems: 'baseline',
    background: COLORS.GLOBAL.BLACK,
    borderRadius: RADIUS.RADIUS_5,
    color: COLORS.GLOBAL.WHITE,
    display: 'inline-flex',
    marginBottom: SPACING.SIZE_10,
    padding: `${SPACING.SIZE_01}px 6px`,
    transition: `all 400ms ${EASING.CUBIC_EASE_OUT}`,
  }),
  scenery: css({
    bottom: 0,
    left: 0,
    position: 'absolute',
    transition: `opacity ${SCENERY_OR_WEATHER_DURATION}ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
  }),
  sceneryContainer: css({
    bottom: 0,
    left: 0,
    position: 'absolute',
    transition: `opacity 500ms ${EASING.CUBIC_EASE_OUT}`,
    transitionDelay: '200ms',
    width: '100%',
  }),
  title: css({
    marginBottom: SPACING.SIZE_10,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_20,
    },

    strong: {
      color: COLORS.GLOBAL.ORANGE,
    },

    transition: `all 300ms ${EASING.CUBIC_EASE_OUT}`,
    transitionDelay: '50ms',
  }),
  vehicle: css({
    bottom: 0,
    position: 'absolute',
    right: 0,
    transition: `all ${CAR_ROTATION_DURATION}ms ${EASING.CUBIC_EASE_OUT}`,
    willTransform: 'opacity',
  }),
  vehicleContainer: css({
    bottom: 0,
    fontSize: 0,
    position: 'absolute',
    right: GRID_MARGIN.S,
    transition: `all 2300ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
    willTransform: 'translate',

    [MQ.M]: {
      right: GRID_MARGIN.M,
    },
    [MQ.L]: {
      right: GRID_MARGIN.L,
    },
    [MQ.XL]: {
      right: GRID_MARGIN.XL,
    },
  }),
  vehicleContainerWithoutAnimation: css({
    transition: 'none',
  }),
  weather: css({
    left: 0,
    position: 'absolute',
    top: 0,
    transition: `opacity 400ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
  }),
};
