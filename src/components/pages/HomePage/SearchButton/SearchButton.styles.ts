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
  ICON_SIZE_L: 34,
  PADDING: {
    S: '25px 0',
    M: '50px 0',
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
  buttonContainer: {
    '&::after': {
      backgroundColor: COLORS.DARK.GRAY_40,
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
  searchLabel: {
    // the letter "i" gets cut off from the overflow: hidden
    height: CONSTANTS.SEARCH_LABEL_HEIGHT.S,
    [MQ.L]: {
      height: CONSTANTS.SEARCH_LABEL_HEIGHT.L,
    },
  },
};

export default styles;
