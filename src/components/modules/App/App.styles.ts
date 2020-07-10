import { COLORS, EASING, StylesMap } from '~/lib/constants';

import { PAGE_TRANSITION_DURATION } from './App.constants';

export const styles: StylesMap = {
  root: {
    backgroundColor: 'transparent',
    transition: `all ${PAGE_TRANSITION_DURATION}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  rootWithOffWhiteBg: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
  },
};
