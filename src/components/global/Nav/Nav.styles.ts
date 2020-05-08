import { css } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';

const CONSTANTS = {
  LOGO_SIZE: 130,
  LOGO_SIZE_SMALL: 108,
};

const styles = {
  hamburger: {
    display: 'inline-flex',
    marginLeft: SPACING.SIZE_20,
    [MQ.L]: {
      display: 'none',
    },
  },
  hide: css({
    display: 'none',
  }),
  links: css({
    alignContent: 'center',
    display: 'flex',
  }),
  listItem: css({
    alignItems: 'center',
    display: 'none',
    marginLeft: SPACING.SIZE_30,
    [MQ.L]: {
      display: 'inline-flex',
    },
  }),
  logo: css({
    width: CONSTANTS.LOGO_SIZE_SMALL,
    [MQ.M]: {
      width: CONSTANTS.LOGO_SIZE,
    },
  }),
  nav: css({
    display: 'flex',
    justifyContent: 'flex-end',
  }),
  root: css({
    background: COLORS.LIGHT.OFF_WHITE,
    height: '100%',
    padding: `${SPACING.SIZE_30}px 0`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_50}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_60}px 0`,
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
