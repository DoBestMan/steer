import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CIRCLE_SIZES = {
  SMALL: 118,
  MEDIUM: 156,
  LARGE: 174,
};

export const styles: StylesMap = {
  car: {
    '.SVGInline-svg': {
      width: '100%',
    },
    padding: SPACING.SIZE_10,
  },
  circle: {
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT.GRAY_10,
    borderRadius: '100%',
    boxSizing: 'border-box',
    color: COLORS.GLOBAL.BLACK,
    display: 'flex',
    fontWeight: 'normal',
    height: CIRCLE_SIZES.SMALL,
    justifyContent: 'center',
    left: SPACING.SIZE_10,
    padding: SPACING.SIZE_20,
    paddingTop: SPACING.SIZE_25,
    position: 'absolute',
    textAlign: 'center',
    top: 0,
    width: CIRCLE_SIZES.SMALL,
    [MQ.M]: {
      height: CIRCLE_SIZES.MEDIUM,
      left: 23,
      padding: SPACING.SIZE_10,
      width: CIRCLE_SIZES.MEDIUM,
    },
    [MQ.L]: {
      height: CIRCLE_SIZES.LARGE,
      padding: SPACING.SIZE_10,
      left: 11,
      width: CIRCLE_SIZES.LARGE,
    },
  },
  graphic: {
    margin: '0px auto',
    minHeight: 118,
    position: 'relative',
    width: 138,
    [MQ.M]: {
      minHeight: 156,
      width: 203,
    },
    [MQ.L]: {
      minHeight: 174,
      width: 195,
    },
  },
  root: {
    position: 'relative',
    width: '100%',
  },
  subTitle: [
    typography.smallCopyTight,
    {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
    },
  ],
  tag: {
    left: 0,
    padding: 3,
    position: 'absolute',
    top: 0,
    zIndex: 1,
    [MQ.M]: {
      left: 14,
    },
    [MQ.L]: {
      left: 0,
    },
  },
  title: [
    typography.primarySubhead,
    {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
    },
  ],
  titlePositionBottom: {
    marginTop: SPACING.SIZE_02,
  },
  titlePositionTop: {
    marginTop: SPACING.SIZE_20,
  },
};
