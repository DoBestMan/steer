import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import { COLORS, EASING, StylesMap } from '~/lib/constants';

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
    transition: `all 800ms ${EASING.CUBIC_EASE_OUT}`,
  },
  root: {
    backgroundColor: 'transparent',
    transition: `all 400ms ${EASING.CUBIC_EASE_OUT}`,
  },
  rootWithOffWhiteBg: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
  },
};
