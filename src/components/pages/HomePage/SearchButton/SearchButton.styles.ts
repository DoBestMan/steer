import { CSSObject } from '@emotion/core';

import { COLORS, MQ, TIME } from '~/lib/constants';

export const CONSTANTS = {
  CONTENT_PEEKING_AMOUNT: {
    /* eslint-disable sort-keys */
    S: 50,
    M: 30,
    /* eslint-enable sort-keys */
  },
  ICON_SIZE_L: 34,
  PADDING: {
    S: '25px 0',
    M: '50px 0',
  },
};

const styles: CSSObject = {
  bottomBorder: {
    backgroundColor: COLORS.DARK.GRAY_40,
    height: 1,
  },
  button: {
    alignItems: 'center',
    boxSizing: 'border-box',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    justifyContent: 'space-between',
    padding: CONSTANTS.PADDING.S,
    position: 'relative',
    width: '100%',

    [MQ.M]: {
      '&:hover': {
        backgroundColor: COLORS.DARK.GRAY_90,
      },

      padding: CONSTANTS.PADDING.M,
      transition: `background-color ${TIME.MS100}ms ease`,
    },
  },

  container: {
    minHeight: `calc(33.333vh - ${CONSTANTS.CONTENT_PEEKING_AMOUNT.S}px)`,
    paddingBottom: 40,

    [MQ.M]: {
      minHeight: `calc(33.333vh - ${CONSTANTS.CONTENT_PEEKING_AMOUNT.M}px)`,
      paddingBottom: 60,
    },
  },
  icon: {
    height: '100%',
    justifyContent: 'flex-end',

    [MQ.L]: {
      justifyContent: 'center',
    },

    svg: {
      display: 'block',
      fill: COLORS.GLOBAL.WHITE,

      [MQ.M]: {
        height: CONSTANTS.ICON_SIZE_L,
        width: CONSTANTS.ICON_SIZE_L,
      },
    },
  },
  iconColumn: {
    gridRow: 1,
  },
  label: {
    textAlign: 'left',
  },
};

export default styles;
