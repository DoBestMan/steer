import { CSSObject } from '@emotion/core';

import { CONTENT_PADDING } from '~/components/pages/HomePage/HomePage.styles';
import { COLORS, MQ, TIME } from '~/lib/constants';

const CONSTANTS = {
  ICON_SIZE_L: 34,
  PADDING: {
    /* eslint-disable sort-keys */
    S: '25px 0',
    M: '50px 0',
    /* eslint-enable sort-keys */
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
    paddingBottom: 160 + CONTENT_PADDING.S,

    [MQ.M]: {
      paddingBottom: 240 + CONTENT_PADDING.M,
    },
    [MQ.L]: {
      paddingBottom: 190 + CONTENT_PADDING.M,
    },
    [MQ.L]: {
      paddingBottom: 190 + CONTENT_PADDING.XL,
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
