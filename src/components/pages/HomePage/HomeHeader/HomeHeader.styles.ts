import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import { NAV_HEIGHT } from '~/components/modules/Nav/Nav.styles';
import {
  COLORS,
  EASING,
  GRID_MARGIN,
  MQ,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const CAR_ROTATION_DURATION = 400;
export const SCENERY_OR_WEATHER_DURATION = 400;
const VEHICLE_CONTAINER_DURATION = 2300;

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

export const styles: StylesMap = {
  container: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    flex: 1,
    paddingBottom: 20,
    paddingTop: NAV_HEIGHT.S + SPACING.SIZE_05,
    position: 'relative',

    [MQ.M]: {
      paddingBottom: 25,
      paddingTop: NAV_HEIGHT.M + 40,
    },

    [MQ.L]: {
      paddingBottom: 60,
      paddingTop: NAV_HEIGHT.L + 40,
    },

    [MQ.XL]: {
      paddingTop: NAV_HEIGHT.XL + 40,
    },
  },
  copyContainer: {
    color: COLORS.GLOBAL.BLACK,
    position: 'relative',
    zIndex: 1,
  },
  description: {
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
    transitionDelay: `${TIME.MS100}ms`,

    [MQ.XL]: typography.largeCopy,
  },

  eyebrow: {
    alignItems: 'baseline',
    display: 'inline-flex',
    marginBottom: SPACING.SIZE_10,
    transition: `all ${TIME.MS400}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  scenery: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    transition: `opacity ${SCENERY_OR_WEATHER_DURATION}ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
  },
  sceneryContainer: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    transition: `opacity ${TIME.MS500}ms ${EASING.CUBIC_EASE_OUT}`,
    transitionDelay: `${TIME.MS200}ms`,
    width: '100%',
  },
  title: {
    marginBottom: SPACING.SIZE_10,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_20,
    },

    strong: {
      color: COLORS.GLOBAL.ORANGE,
    },

    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
    transitionDelay: `${TIME.MS50}ms`,
  },
  vehicle: {
    bottom: 0,
    position: 'absolute',
    right: 0,
    transition: `all ${CAR_ROTATION_DURATION}ms ${EASING.CUBIC_EASE_OUT}`,
    willTransform: 'opacity',
  },
  vehicleContainer: {
    bottom: 0,
    fontSize: 0,
    position: 'absolute',
    right: GRID_MARGIN.S,
    transition: `all ${VEHICLE_CONTAINER_DURATION}ms ${EASING.CUBIC_EASE_OUT}`,
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
  },
  vehicleContainerWithoutAnimation: {
    transition: 'none',
  },
  weather: {
    left: 0,
    position: 'absolute',
    top: 0,
    transition: `opacity ${TIME.MS400}ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
  },
};
