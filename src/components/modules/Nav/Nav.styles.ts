import { css } from '@emotion/core';
import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import { EASING, MQ, SPACING, Z_INDEX } from '~/lib/constants';

export const NAV_CONTENT_HEIGHT = 20;

export const NAV_HEIGHT = {
  /* eslint-disable sort-keys */
  S: 120,
  M: 110,
  L: 110,
  XL: 110,
  /* eslint-enable sort-keys */
};

export const navigationPaddingTop = css({
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
});

const CONSTANTS = {
  LOGO_SIZE: 130,
  LOGO_SIZE_SMALL: 108,
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

export const styles = {
  container: css({
    height: NAV_CONTENT_HEIGHT,
  }),
  hamburger: {
    display: 'inline-flex',
    marginLeft: SPACING.SIZE_10,
    [MQ.L]: {
      display: 'none',
    },
  },
  lastItem: css({
    [MQ.L]: {
      // Should be the account logo
      // Change it to button if it becomes a button
      a: {
        minWidth: 'auto',
      },
    },
  }),
  listItem: css({
    ':last-of-type': {
      marginLeft: SPACING.SIZE_30,
    },
    alignItems: 'center',
    display: 'none',
    marginLeft: SPACING.SIZE_40,
    [MQ.L]: {
      display: 'inline-flex',
    },
  }),
  listItemNotHomepage: css({
    [MQ.L]: {
      marginLeft: SPACING.SIZE_20,
    },
  }),
  logo: css({
    width: CONSTANTS.LOGO_SIZE_SMALL,
    [MQ.M]: {
      width: CONSTANTS.LOGO_SIZE,
    },
  }),
  nav: css({
    alignContent: 'center',
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  root: css({
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
  }),
  searchButton: css({
    [MQ.L]: {
      marginRight: 'auto',
      width: 200,
    },

    [MQ.XL]: {
      maxWidth: 420,
      width: '35%',
    },
  }),
};
