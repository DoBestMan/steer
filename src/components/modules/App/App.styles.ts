import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import {
  COLORS,
  EASING,
  MQ,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

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
  globalNotifications: {
    backgroundColor: COLORS.GLOBAL.BLACK,
  },
  globalToast: {
    bottom: 0,
    marginBottom: SPACING.SIZE_60,
    position: 'fixed',
    right: 0,
    zIndex: Z_INDEX.GLOBAL_TOAST,
  },
  root: {
    backgroundColor: 'transparent',
    transition: `backgroundColor ${PAGE_TRANSITION_DURATION}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  rootWithOffWhiteBg: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
  },
  skipToContent: [
    typography.bodyCopyTight,
    {
      alignItems: 'center',
      backgroundColor: COLORS.GLOBAL.BLACK,
      color: COLORS.GLOBAL.WHITE,
      display: 'flex',
      height: 50,
      justifyContent: 'center',
      left: 0,
      position: 'fixed',
      top: 0,
      transform: 'translate3d(0, -50px, 0)',
      transition: `transform ${TIME.MS150} ${EASING.CUBIC_EASE_IN_OUT}`,
      width: '100%',
      zIndex: Z_INDEX.SKIP_LINK,

      [MQ.M]: {
        '&:focus': {
          transform: 'translate3d(0, 0, 0)',
        },
      },
    },
  ],
};
