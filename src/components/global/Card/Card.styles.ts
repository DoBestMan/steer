import {
  COLORS,
  GAP_COLUMNS,
  GRID_MARGIN,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  Z_INDEX,
} from '~/lib/constants';

const ICON_SIZE = {
  STANDARD: 50,
  XL: 70,
};
const styles: StylesMap = {
  cardContent: {
    paddingRight: GRID_MARGIN.S,
    [MQ.M]: {
      paddingRight: GRID_MARGIN.M,
    },
    [MQ.L]: {
      marginLeft: `-${GAP_COLUMNS.L}px`,
      paddingRight: GRID_MARGIN.L,
    },
  },
  decorator: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    div: {
      // overlap brand images
      ':nth-of-type(1)': {
        left: 0,
        zIndex: Z_INDEX.TOP,
      },
      ':nth-of-type(2)': {
        left: -SPACING.SIZE_25,
        zIndex: Z_INDEX.FRONT,
      },
      ':nth-of-type(3)': {
        left: -SPACING.SIZE_50,
        zIndex: Z_INDEX.ZERO,
      },
      height: ICON_SIZE.STANDARD,
      position: 'relative',
      width: ICON_SIZE.STANDARD,
    },
    height: ICON_SIZE.STANDARD,
    marginBottom: SPACING.SIZE_40,
    position: 'relative',
    svg: {
      height: '100%',
    },
    width: '100%',
    zIndex: Z_INDEX.ZERO,
    [MQ.L]: {
      justifyContent: 'center',
      marginBottom: 0,
      p: {
        marginTop: -5, // line height causes misalignemnt to right column content
      },
    },
    [MQ.XL]: {
      // exception for jumbo headline, should be 60px on XL for card decorator
      fontSize: '6.0rem',
      height: ICON_SIZE.XL,
      letterSpacing: '-0.04em',
      lineHeight: 60 / 60, // '60px',
      paddingLeft: SPACING.SIZE_40,
    },
  },
  description: {
    color: COLORS.DARK.GRAY_40,
    marginBottom: SPACING.SIZE_40,
  },
  eyebrow: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
  },
  eyebrowIcon: {
    paddingLeft: 8,
  },
  root: {
    backgroundColor: COLORS.DARK.GRAY_95,
    borderRadius: RADIUS.RADIUS_15,
    padding: SPACING.SIZE_40,
    [MQ.L]: {
      padding: `${SPACING.SIZE_40}px 0`,
    },
    [MQ.XL]: {
      padding: `${SPACING.SIZE_60}px 0`,
    },
  },
  title: {
    color: COLORS.GLOBAL.WHITE,
    marginBottom: SPACING.SIZE_10,
  },
};

export default styles;
