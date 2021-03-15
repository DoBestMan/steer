import {
  COLORS,
  GAP_COLUMNS,
  GRID_MARGIN,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  THEME,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import {
  fadeInUp,
  fadeInUp20px,
  fadeOutDown,
  fadeOutDown20px,
} from '~/styles/animations.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  [THEME.DARK]: {
    backgroundColor: COLORS.DARK.GRAY_95,
    color: COLORS.GLOBAL.WHITE,
    svg: {
      color: COLORS.GLOBAL.ORANGE,
    },
  },
  // Dark orange
  [THEME.ORANGE]: {
    backgroundColor: COLORS.ORANGE.SHADE_15_SOLID,
    color: COLORS.GLOBAL.WHITE,
    svg: {
      color: COLORS.GLOBAL.WHITE,
    },
  },
  // Light orange
  [THEME.LIGHT]: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
    svg: {
      color: COLORS.GLOBAL.WHITE,
    },
  },
  bannerIcon: {
    svg: {
      color: COLORS.GLOBAL.ORANGE,
    },
  },
  decorator: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    // image
    // icon
    span: {
      color: COLORS.GLOBAL.WHITE,
      height: 40,
      marginRight: SPACING.SIZE_15,
      svg: {
        height: '100%',
        width: '100%',
      },
      width: 40,
    },
    zIndex: Z_INDEX.ZERO,
    [MQ.L]: {
      justifyContent: 'center',
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

  description: [
    typography.smallCopyTight,
    {
      color: COLORS.GLOBAL.WHITE,
      display: 'inline-block',
      marginTop: SPACING.SIZE_05,
      width: '75%',
      [MQ.S]: { width: '82%' },
      [MQ.M]: { width: '75%' },
    },
  ],
  descriptionLink: {
    textDecoration: 'none',
    span: {
      borderBottom: 'none',
    },
  },
  icon: [
    {
      alignSelf: 'flex-start',
      color: COLORS.GLOBAL.WHITE,
      position: 'absolute',
      right: SPACING.SIZE_10,
      top: SPACING.SIZE_20,
      [MQ.L]: {
        ':hover': {
          color: COLORS.GLOBAL.WHITE,
        },
      },
    },
  ],

  isDismissed: {
    pointerEvents: 'none',
    visibility: 'hidden',
    [MQ.S]: {
      animation: `${fadeOutDown} ${TIME.MS350}ms ease-out`,
      transition: `visibility ${TIME.MS350}ms ease-out`,
    },
    [MQ.L]: {
      animation: `${fadeOutDown20px} ${TIME.MS200}ms ease-in`,
      transition: `visibility ${TIME.MS200}ms ease-out`,
    },
  },

  item: {
    ':first-of-type': {
      marginLeft: GRID_MARGIN.S,
      [MQ.M]: { marginLeft: GRID_MARGIN.M },
      [MQ.L]: { marginLeft: GRID_MARGIN.L },
      [MQ.XL]: { marginLeft: GRID_MARGIN.XL },
    },

    ':last-of-type': {
      marginRight: GRID_MARGIN.S,
      [MQ.M]: { marginRight: GRID_MARGIN.M },
      [MQ.L]: { marginRight: GRID_MARGIN.L },
      [MQ.XL]: { marginRight: GRID_MARGIN.XL },
    },
    height: 'auto',
    width: 'auto',
  },

  root: [
    typography.primarySubhead,
    {
      alignItems: 'center',
      animation: `${fadeInUp} ${TIME.MS350}ms ease-in`,
      borderRadius: RADIUS.RADIUS_8,
      display: 'inline-flex',
      justifyContent: 'center',
      marginBottom: SPACING.SIZE_05,
      marginRight: SPACING.SIZE_20,
      marginTop: SPACING.SIZE_05,
      minHeight: 'auto',
      padding: SPACING.SIZE_10,
      position: 'relative',
      textAlign: 'left',
      width: '280px',
      [MQ.M]: {
        padding: SPACING.SIZE_10,
        width: '330px',
      },
      [MQ.L]: [
        typography.primarySubhead,
        {
          alignItems: 'center',
          animation: `${fadeInUp20px} ${TIME.MS200}ms ease-in`,
          padding: SPACING.SIZE_10,
        },
      ],
    },
  ],
  title: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
      display: 'inline-block',
    },
  ],
  wrapper: {
    '.notification-carousel': {
      display: 'flex',
    },
  },
};

export default styles;
