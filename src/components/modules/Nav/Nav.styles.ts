import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import {
  CSSStyles,
  EASING,
  MQ,
  SPACING,
  StylesMap,
  Z_INDEX,
} from '~/lib/constants';

export const NAV_CONTENT_HEIGHT = 20;

export const NAV_HEIGHT = {
  /* eslint-disable sort-keys */
  S: 120,
  M: 110,
  L: 110,
  XL: 110,
  /* eslint-enable sort-keys */
};

export const navigationPaddingTop: CSSStyles = {
  paddingTop: NAV_HEIGHT.S,

  [MQ.M]: {
    paddingTop: NAV_HEIGHT.M,
  },

  [MQ.L]: {
    paddingTop: NAV_HEIGHT.L,
  },

  [MQ.XL]: {
    paddingTop: NAV_HEIGHT.XL,
  },
};

const CONSTANTS = {
  LOGO_SIZE: 123,
  LOGO_SIZE_SMALL: 105,
};

export const animations = {
  /* eslint-disable sort-keys */
  [`root_${ENTERING}`]: {
    opacity: 0,
    transform: 'translate3d(0, -100%, 0)',
  },
  [`root_${ENTERED}`]: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  [`root_${EXITING}`]: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  [`root_${EXITED}`]: {
    opacity: 0,
    transform: 'translate3d(0, -100%, 0)',
  },
  /* eslint-enable sort-keys */
};

export const styles: StylesMap = {
  cart: {
    order: -1,
    [MQ.L]: {
      marginLeft: SPACING.SIZE_20,
      order: 0,
    },
    [MQ.XL]: {
      marginLeft: SPACING.SIZE_30,
    },
  },
  container: {
    height: NAV_CONTENT_HEIGHT,
  },
  hamburger: {
    display: 'inline-flex',
    marginLeft: SPACING.SIZE_10,
    [MQ.L]: {
      display: 'none',
    },
  },
  lastItem: {
    [MQ.L]: {
      // Should be the account logo
      // Change it to button if it becomes a button
      a: {
        minWidth: 'auto',
      },
    },
  },
  listItem: {
    ':last-of-type': {
      marginLeft: SPACING.SIZE_30,
    },
    alignItems: 'center',
    display: 'none',
    marginLeft: SPACING.SIZE_20,
    [MQ.L]: {
      display: 'inline-flex',
    },
    [MQ.XL]: {
      marginLeft: SPACING.SIZE_30,
    },
  },
  logo: {
    width: CONSTANTS.LOGO_SIZE_SMALL,
    [MQ.M]: {
      width: CONSTANTS.LOGO_SIZE,
    },
  },
  nav: {
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  root: {
    position: 'absolute',
    transition: `all 400ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
    zIndex: Z_INDEX.TOP,

    [MQ.S]: {
      paddingTop: SPACING.SIZE_30,
    },
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_30,
      paddingTop: SPACING.SIZE_60,
    },
  },
  searchButton: {
    marginLeft: SPACING.SIZE_30,

    [MQ.L]: {
      marginLeft: 0,
      marginRight: 'auto',
      width: 200,
    },
    [MQ.XL]: {
      maxWidth: 420,
      width: '35%',
    },
  },
};
