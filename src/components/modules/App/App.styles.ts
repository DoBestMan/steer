import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import { COLORS, EASING, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';

import { PAGE_TRANSITION_DURATION } from './App.constants';

export const animations = {
  /* eslint-disable sort-keys */
  [`component_${ENTERING}`]: {
    opacity: 0,
  },
  [`component_${ENTERED}`]: {
    opacity: 1,
  },
  [`component_${EXITING}`]: {
    opacity: 1,
  },
  [`component_${EXITED}`]: {
    opacity: 0,
  },
  /* eslint-enable sort-keys */
};

export const styles: StylesMap = {
  component: {
    transition: `all ${PAGE_TRANSITION_DURATION}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  globalToast: {
    bottom: 0,
    marginBottom: SPACING.SIZE_60,
    position: 'fixed',
    right: 0,
    zIndex: Z_INDEX.OVERLAY,
  },
  root: {
    backgroundColor: 'transparent',
    transition: `backgroundColor ${PAGE_TRANSITION_DURATION}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  rootWithOffWhiteBg: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
  },
};
