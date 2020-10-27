import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CIRCLE_SIZES = {
  SMALL: 40,
  MEDIUM: 58,
  LARGE: 50,
  XLARGE: 58,
};

const TIRE_SIZES = {
  SMALL: 18,
  MEDIUM: 26,
};

const SVG_STYLE = {
  stroke: COLORS.GLOBAL.WHITE,
  fill: COLORS.GLOBAL.WHITE,
};

const styles: StylesMap = {
  car: {
    '& svg': {
      width: SPACING.SIZE_65,
    },
  },
  carWrapper: {
    display: 'flex',
    alignItems: 'center',
    transform: `translateX(-${SPACING.SIZE_20}px)`,
  },
  circle: {
    alignItmes: 'center',
    backgroundColor: COLORS.LIGHT.GRAY_10,
    borderRadius: '100%',
    boxSizing: 'border-box',
    clipPath: `circle(${CIRCLE_SIZES.SMALL / 2}px at center)`,
    color: COLORS.GLOBAL.BLACK,
    display: 'flex',
    fontWeight: 'normal',
    height: CIRCLE_SIZES.SMALL,
    justifyContent: 'center',
    marginRight: SPACING.SIZE_10,
    overflow: 'hidden',
    position: 'relative',
    width: CIRCLE_SIZES.SMALL,
    [MQ.M]: {
      clipPath: `circle(${CIRCLE_SIZES.MEDIUM / 2}px at center)`,
      height: CIRCLE_SIZES.MEDIUM,
      width: CIRCLE_SIZES.MEDIUM,
    },
    [MQ.L]: {
      clipPath: `circle(${CIRCLE_SIZES.LARGE / 2}px at center)`,
      height: CIRCLE_SIZES.LARGE,
      width: CIRCLE_SIZES.LARGE,
    },
    [MQ.XL]: {
      clipPath: `circle(${CIRCLE_SIZES.XLARGE / 2}px at center)`,
      height: CIRCLE_SIZES.XLARGE,
      width: CIRCLE_SIZES.XLARGE,
    },
  },
  icon: {
    display: 'flex',
    alignItems: 'center',
    '& svg': {
      height: TIRE_SIZES.SMALL,
    },
    [MQ.M]: {
      '& svg': {
        height: TIRE_SIZES.MEDIUM,
      },
    },
  },
  root: {
    '&:hover': {
      cursor: 'pointer',
      div: {
        backgroundColor: COLORS.GLOBAL.ORANGE,
        svg: {
          color: COLORS.GLOBAL.WHITE,
        },
        '.SVGInline-svg': {
          '.body-car': {
            path: {
              stroke: SVG_STYLE.stroke,
            },
            polyline: SVG_STYLE,
            line: SVG_STYLE,
          },
          ['.front-wheel, .back-wheel']: {
            path: SVG_STYLE,
            line: {
              stroke: SVG_STYLE.stroke,
            },
            circle: SVG_STYLE,
          },
        },
      },
    },
    alignItems: 'center',
    display: 'flex',

    '&:first-of-type': {
      marginRight: SPACING.SIZE_20,
      [MQ.M]: {
        marginRight: SPACING.SIZE_30,
      },
    },
  },
  subTitle: [
    typography.smallCopy,
    {
      color: COLORS.GLOBAL.BLACK,
      whiteSpace: 'nowrap',
    },
  ],
};

export default styles;
