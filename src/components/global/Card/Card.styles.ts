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
import { typography } from '~/styles/typography.styles';

const ICON_SIZE = {
  STANDARD: 50,
  XL: 70,
};
const styles: StylesMap = {
  cardContent: {
    [MQ.L]: {
      paddingRight: SPACING.SIZE_30,
    },
  },
  decorator: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    // image
    div: {
      // overlap brand images
      ':nth-of-type(1)': {
        left: 0,
        zIndex: Z_INDEX.TOP,
      },
      ':nth-of-type(2)': {
        marginLeft: -SPACING.SIZE_15,
        zIndex: Z_INDEX.FRONT,
      },
      ':nth-of-type(3)': {
        marginLeft: -SPACING.SIZE_15,
        zIndex: Z_INDEX.ZERO,
      },
      height: ICON_SIZE.STANDARD,
      // brand images should always be 50x50
      img: {
        height: ICON_SIZE.STANDARD,
        width: ICON_SIZE.STANDARD,
      },
      width: ICON_SIZE.STANDARD,
    },
    marginBottom: SPACING.SIZE_40,
    // icon
    span: {
      color: COLORS.GLOBAL.WHITE,
      height: ICON_SIZE.STANDARD,
      width: ICON_SIZE.STANDARD,
      svg: {
        height: '100%',
        width: '100%',
      },
    },
    zIndex: Z_INDEX.ZERO,
    [MQ.L]: {
      justifyContent: 'center',
      marginBottom: 0,
      p: {
        marginTop: -5, // line height causes misalignemnt to right column content
      },
      width: `calc(100% + ${GRID_MARGIN.L})`,
    },
    [MQ.XL]: {
      // exception for jumbo headline, should be 60px on XL for card decorator
      fontSize: '6.0rem',
      letterSpacing: '-0.04em',
      lineHeight: 60 / 60, // '60px',
      span: {
        height: ICON_SIZE.XL,
        width: ICON_SIZE.XL,
      },
      width: `calc(100% + ${GRID_MARGIN.XL})`,
    },
  },
  decoratorContainer: {
    [MQ.L]: {
      width: `calc(100% + ${GAP_COLUMNS.L}px)`,
    },
    [MQ.XL]: {
      width: `calc(100% + ${GAP_COLUMNS.XL}px)`,
    },
  },
  description: {
    color: COLORS.DARK.GRAY_40,
    marginBottom: SPACING.SIZE_40,
  },
  eyebrow: [
    typography.primaryHeadline,
    {
      [MQ.M]: typography.secondaryHeadline,
      color: COLORS.GLOBAL.ORANGE,
      display: 'flex',
    },
  ],
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
  title: [
    typography.primaryHeadline,
    {
      [MQ.M]: typography.secondaryHeadline,
      color: COLORS.GLOBAL.WHITE,
      marginBottom: SPACING.SIZE_10,
    },
  ],
};

export default styles;
