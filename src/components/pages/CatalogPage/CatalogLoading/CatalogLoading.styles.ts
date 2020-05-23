import { CSSObject } from '@emotion/core';
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import { COLORS, EASING, GRID_MARGIN, MQ, TIME } from '~/lib/constants';

const CONSTANTS = {
  BG_IN_DELAY: TIME.MS1200,
  BG_IN_DURATION: TIME.MS300,
  DURATION_IN: TIME.MS1200,
  EASING: EASING.CUBIC_EASE_IN_OUT,
  MESSAGE_HEIGHT: {
    /* eslint-disable sort-keys */
    S: '188px',
    M: '283px',
    L: '283px',
    /* eslint-enable sort-keys */
  },
  MESSAGE_IN_DELAY: TIME.MS1200,
  MESSAGE_IN_DURATION: TIME.MS300,
  MESSAGE_TOP_END: {
    /* eslint-disable sort-keys */
    S: 'max(60vh, 385px)',
    M: 'max(65vh, 517px)',
    L: 'max(66.6vh, 308px)',
    /* eslint-enable sort-keys */
  },
  MESSAGE_TOP_START: 0,
  VEHICLE_IN_DURATION: TIME.MS1200,
};

const styles: CSSObject = {
  backgroundRoot: {
    height: CONSTANTS.MESSAGE_TOP_END.S,
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    transition: `opacity ${CONSTANTS.BG_IN_DURATION}ms ease ${CONSTANTS.BG_IN_DELAY}ms`,
    width: '100%',

    [MQ.M]: {
      height: CONSTANTS.MESSAGE_TOP_END.M,
    },

    [MQ.L]: {
      height: CONSTANTS.MESSAGE_TOP_END.L,
    },
  },
  /* eslint-disable sort-keys */
  [`background_${ENTERING}`]: {
    opacity: 0,
  },
  [`background_${ENTERED}`]: {
    opacity: 1,
  },
  [`background_${EXITING}`]: {
    opacity: 1,
  },
  [`background_${EXITED}`]: {
    opacity: 1,
  },
  /* eslint-enable sort-keys */

  car: {
    svg: {
      '.solid-body-background *': {
        fill: '#FFF',
      },
    },
  },

  container: {
    // max of screen height or message position + height
    height: `max(100vh, calc(${CONSTANTS.MESSAGE_TOP_END.S} + ${CONSTANTS.MESSAGE_HEIGHT.S}))`,
    overflow: 'hidden',
    pointerEvents: 'none', // remove it so we can access the header
    position: 'relative',
    width: '100%',

    [MQ.M]: {
      height: `max(100vh, calc(${CONSTANTS.MESSAGE_TOP_END.M} + ${CONSTANTS.MESSAGE_HEIGHT.M}))`,
    },

    [MQ.L]: {
      height: `max(100vh, calc(${CONSTANTS.MESSAGE_TOP_END.L} + ${CONSTANTS.MESSAGE_HEIGHT.L}))`,
    },
  },

  contentRoot: {
    height: '100%',
    left: 0,
    pointerEvents: 'all', // put it back
    position: 'absolute',
    top: 0,
    transform: `translateY(${CONSTANTS.MESSAGE_TOP_START})`,
    transition: `transform ${CONSTANTS.DURATION_IN}ms ${CONSTANTS.EASING}`,
    width: '100%',
  },
  [`content_${ENTERING}`]: {
    transform: `translateY(${CONSTANTS.MESSAGE_TOP_START})`,
  },
  [`content_${ENTERED}`]: {
    transform: `translateY(${CONSTANTS.MESSAGE_TOP_END.S})`,

    [MQ.M]: {
      transform: `translateY(${CONSTANTS.MESSAGE_TOP_END.M})`,
    },

    [MQ.L]: {
      transform: `translateY(${CONSTANTS.MESSAGE_TOP_END.L})`,
    },
  },
  [`content_${EXITING}`]: {
    transform: `translateY(${CONSTANTS.MESSAGE_TOP_END.S})`,

    [MQ.M]: {
      transform: `translateY(${CONSTANTS.MESSAGE_TOP_END.M})`,
    },

    [MQ.L]: {
      transform: `translateY(${CONSTANTS.MESSAGE_TOP_END.L})`,
    },
  },
  [`content_${EXITED}`]: {
    transform: `translateY(${CONSTANTS.MESSAGE_TOP_END.S})`,

    [MQ.M]: {
      transform: `translateY(${CONSTANTS.MESSAGE_TOP_END.M})`,
    },

    [MQ.L]: {
      transform: `translateY(${CONSTANTS.MESSAGE_TOP_END.L})`,
    },
  },

  messageRoot: {
    '> *': {
      opacity: 0,
      transition: `opacity ${CONSTANTS.MESSAGE_IN_DURATION}ms ease ${CONSTANTS.MESSAGE_IN_DELAY}ms`,
    },
    backgroundColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
    // extends background color to fill the vertical height
    height: '100%',
  },
  /* eslint-disable sort-keys */
  [`message_${ENTERING}`]: {
    '> *': {
      opacity: 0,
    },
  },
  [`message_${ENTERED}`]: {
    '> *': {
      opacity: 1,
    },
  },
  [`message_${EXITING}`]: {
    '> *': {
      opacity: 1,
    },
  },
  [`message_${EXITED}`]: {
    '> *': {
      opacity: 1,
    },
  },
  /* eslint-enable sort-keys */

  scenery: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: '100%',
  },

  vehicleContainer: {
    bottom: '100%',
    fontSize: 0, // fix for weird bottom space
    opacity: 0,
    position: 'absolute',
    right: GRID_MARGIN.S,
    transition: `opacity ${CONSTANTS.VEHICLE_IN_DURATION}ms ${CONSTANTS.EASING}`,

    [MQ.L]: {
      right: GRID_MARGIN.L,
    },
  },
  /* eslint-disable sort-keys */
  [`vehicleContainer_${ENTERING}`]: {
    opacity: 0,
  },
  [`vehicleContainer_${ENTERED}`]: {
    opacity: 1,
  },
  [`vehicleContainer_${EXITING}`]: {
    opacity: 1,
  },
  [`vehicleContainer_${EXITED}`]: {
    opacity: 1,
  },
};

export default styles;
