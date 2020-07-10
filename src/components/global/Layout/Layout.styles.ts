import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import { EASING, StylesMap } from '~/lib/constants';

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

const styles: StylesMap = {
  SVGSpriteContainer: {
    display: 'none',
  },
  container: {
    transition: `all 800ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
  },
  mainContent: {
    height: '100%',
  },
};

export default styles;
