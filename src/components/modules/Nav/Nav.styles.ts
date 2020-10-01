import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import {
  COLORS,
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
  S: 80,
  M: 90,
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

export const navigationBreadcrumbPaddingTop: CSSStyles = {
  paddingTop: NAV_HEIGHT.S - 10,
  [MQ.M]: {
    paddingTop: NAV_HEIGHT.M,
  },
  [MQ.L]: {
    paddingTop: NAV_HEIGHT.L + 65,
  },
  [MQ.XL]: {
    paddingTop: NAV_HEIGHT.XL + 65,
  },
};

const CONSTANTS = {
  LOGO_SIZE: 160,
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
    marginRight: -SPACING.SIZE_10,
    marginLeft: SPACING.SIZE_10,
    [MQ.L]: {
      marginLeft: SPACING.SIZE_10,
    },
    [MQ.XL]: {
      marginLeft: SPACING.SIZE_20,
    },
  },
  container: {
    height: NAV_CONTENT_HEIGHT,
  },
  hamburger: {
    button: {
      padding: SPACING.SIZE_10,
    },
    color: COLORS.GLOBAL.BLACK,
    display: 'inline-flex',
    marginLeft: SPACING.SIZE_10,
    [MQ.L]: {
      display: 'none',
    },
  },
  lastItem: {
    [MQ.L]: {
      // Should be the account logo
      button: {
        margin: `0 -${SPACING.SIZE_10}px`,
      },
    },
  },
  listItem: {
    ':last-of-type': {
      marginLeft: SPACING.SIZE_20,
    },
    alignItems: 'center',
    display: 'none',
    marginLeft: SPACING.SIZE_20,
    [MQ.M]: {
      ':last-of-type': {
        marginLeft: SPACING.SIZE_30,
      },
    },
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
    width: `calc(100% + ${SPACING.SIZE_10}px)`, // offset padding on hamburger menu icon
  },
  root: {
    position: 'absolute',
    transition: `all 400ms ${EASING.CUBIC_EASE_OUT}`,
    width: '100%',
    zIndex: Z_INDEX.NAV,

    [MQ.S]: {
      paddingTop: SPACING.SIZE_30,
    },
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_30,
      paddingTop: SPACING.SIZE_40,
    },
    [MQ.L]: {
      paddingTop: SPACING.SIZE_60,
    },
  },
  searchButton: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: SPACING.SIZE_30,

    [MQ.L]: {
      display: 'unset',
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
