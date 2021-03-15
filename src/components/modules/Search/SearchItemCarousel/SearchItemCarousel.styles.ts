import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CAR_SIZE = {
  S: 67,
  M: 83,
};

const styles: StylesMap = {
  car: {
    svg: {
      width: CAR_SIZE.S,
      [MQ.M]: {
        width: CAR_SIZE.M,
      },
    },
  },
  carouselItem: {
    pointerEvents: 'auto',
    ':first-of-type': {
      marginLeft: SPACING.SIZE_20,
      [MQ.M]: {
        marginLeft: SPACING.SIZE_40,
      },
      [MQ.L]: {
        marginLeft: SPACING.SIZE_180,
      },
    },
    ':last-of-type': {
      marginRight: SPACING.SIZE_20,
      [MQ.M]: {
        marginRight: SPACING.SIZE_40,
      },
      [MQ.L]: {
        marginRight: SPACING.SIZE_180,
      },
    },
  },
  ctaList: {
    '.search-item': {
      transitionProperty: 'transform',
    },
    '.search-items-carousel': {
      display: 'flex',
    },
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
  },
  ctaMenuIcon: {
    '&:hover': {
      backgroundColor: COLORS.ORANGE.SHADE_30,
    },

    '.SVGInline-svg': {
      '.body-car': {
        '*': {
          stroke: COLORS.LIGHT.OFF_WHITE_40,
        },
      },
      ['.front-wheel, .back-wheel']: {
        '*': {
          stroke: COLORS.GLOBAL.WHITE,
          fill: COLORS.GLOBAL.WHITE,
        },
      },
    },
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT.GRAY_20,
    borderRadius: '100%',
    boxSizing: 'border-box',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    height: '90px',
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_20,
    overflow: 'hidden',
    position: 'relative',
    svg: {
      path: {
        fillOpacity: 1,
      },
    },
    width: '90px',
    [MQ.M]: {
      height: '120px',
      width: '120px',
    },
  },
  ctaMenuItem: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexFlow: 'column',
    marginRight: SPACING.SIZE_15,
    [MQ.M]: {
      marginRight: SPACING.SIZE_20,
    },
  },
  ctaMenuLabel: [
    typography.eyebrow,
    {
      color: COLORS.GLOBAL.WHITE,
      textTransform: 'uppercase',
    },
  ],
  nextButton: {
    display: 'none',
    right: SPACING.SIZE_100,
    top: 13,
    [MQ.XL]: {
      display: 'flex',
      top: 13,
    },
  },
  prevButton: {
    display: 'none',
    left: SPACING.SIZE_100,
    top: 13,
    [MQ.XL]: {
      display: 'flex',
      top: 13,
    },
  },
  root: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    padding: `${SPACING.SIZE_20}px 0px`,
  },
  title: [
    typography.eyebrow,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_20,
      textTransform: 'uppercase',
    },
  ],
};

export default styles;
