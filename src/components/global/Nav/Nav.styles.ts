import { css } from '@emotion/core';

import { SPACING } from '~/lib/constants/spacing';
import { MQ } from '~/lib/constants/breakpoints';

const CONSTANTS = {
  LOGO_SIZE: 130,
  LOGO_SIZE_SMALL: 108,
};

const styles = {
  hamburger: {
    display: 'inline-flex',
    [MQ.L]: {
      display: 'none',
    },
  },

  links: css({
    display: 'flex',
    justifyContent: 'flex-end',
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

  root: css({
    padding: `${SPACING.SIZE_30}px 0`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_50}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_60}px 0`,
    },
  }),
};

export default styles;
