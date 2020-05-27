import { css } from '@emotion/core';

import { MQ, SPACING } from '~/lib/constants';

export const NAV_CONTENT_HEIGHT = 20;
const CONSTANTS = {
  LOGO_SIZE: 130,
  LOGO_SIZE_SMALL: 108,
};

const styles = {
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

export default styles;
