import {
  COLORS,
  GRID_MARGIN,
  MQ,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';

export const CONSTANTS = {
  CONTENT_PEEKING_AMOUNT: {
    S: 130,
    M: 30,
  },
  ICON_SIZE: { M: 29, L: 34 },
  PADDING: {
    S: `${45 / 2}px 0`,
    M: '30px 0',
    XL: `${65 / 2}px 0`,
  },
  SEARCH_LABEL_HEIGHT: {
    S: 35,
    L: 40,
  },
};

const styles: StylesMap = {
  button: {
    alignItems: 'center',
    boxSizing: 'border-box',
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
    [MQ.XL]: {
      padding: CONSTANTS.PADDING.XL,
    },
  },
  buttonContainer: {
    '&::after': {
      backgroundColor: COLORS.ORANGE.TINT_30,
      content: '""',
      display: 'block',
      height: 1,
      margin: `0 ${GRID_MARGIN.S}px`,

      [MQ.M]: {
        margin: `0 ${GRID_MARGIN.M}px`,
      },
      [MQ.L]: {
        margin: `0 ${GRID_MARGIN.L}px`,
      },
      [MQ.XL]: {
        margin: `0 ${GRID_MARGIN.XL}px`,
      },
    },
  },
  icon: {
    height: '100%',
    justifyContent: 'flex-end',

    [MQ.L]: {
      alignItems: 'unset',
      marginTop: SPACING.SIZE_05,
      justifyContent: 'center',
    },

    svg: {
      display: 'block',
      fill: COLORS.GLOBAL.WHITE,

      [MQ.M]: {
        height: CONSTANTS.ICON_SIZE.M,
        width: CONSTANTS.ICON_SIZE.M,
      },
      [MQ.L]: {
        height: CONSTANTS.ICON_SIZE.L,
        width: CONSTANTS.ICON_SIZE.L,
      },
    },
  },
  iconColumn: {
    gridRow: 1,
  },
  label: {
    textAlign: 'left',
  },
  searchLabel: {
    // the letter "i" gets cut off from the overflow: hidden
    height: CONSTANTS.SEARCH_LABEL_HEIGHT.S,
    [MQ.L]: {
      height: CONSTANTS.SEARCH_LABEL_HEIGHT.L,
    },
  },
};

export default styles;
