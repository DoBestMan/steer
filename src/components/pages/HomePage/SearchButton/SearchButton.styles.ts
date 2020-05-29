import { CSSObject } from '@emotion/core';

import { COLORS, MQ, TIME } from '~/lib/constants';

export const CONSTANTS = {
  CONTENT_PEEKING_AMOUNT: {
    S: 50,
    M: 30,
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
    height: CONSTANTS.ICON_SIZE_L,
    textAlign: 'left',

    // the letter "i" gets cut off from the overflow: hidden
    [MQ.L]: {
      '> span': {
        height: 38,
      },
    },
  },
};

export default styles;
