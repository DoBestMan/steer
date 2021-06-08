import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
  UNMOUNTED,
} from 'react-transition-group/Transition';

import { COLORS, StylesMap, Z_INDEX } from '~/lib/constants';

const styles: StylesMap = {
  root: {
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT.GRAY_70,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    WebkitTapHighlightColor: 'transparent',
    zIndex: Z_INDEX.MODAL - 2,
  },
};

export const visibility = {
  /* eslint-disable sort-keys */
  [ENTERING]: {
    pointerEvents: 'auto',
    visibility: 'visible',
  },
  [ENTERED]: {
    pointerEvents: 'auto',
    visibility: 'visible',
  },
  [EXITING]: {
    pointerEvents: 'auto',
    visibility: 'visible',
  },
  [EXITED]: {
    pointerEvents: 'none',
    visibility: 'hidden',
  },
  [UNMOUNTED]: {},
};

export default styles;
