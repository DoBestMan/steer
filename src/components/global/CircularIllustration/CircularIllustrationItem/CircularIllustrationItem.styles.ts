import { COLORS, MQ, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CIRCLE_SIZES = {
  SMALL: 118,
  MEDIUM: 156,
  LARGE: 174,
};

export const styles: StylesMap = {
  baseLink: {
    display: 'inline-block',
  },
  byline: [
    typography.smallCopyTight,
    {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      textAlign: 'center',
      width: '100%',
    },
  ],
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
  logoImage: {
    width: SPACING.SIZE_110,
    maxWidth: SPACING.SIZE_110,
  },
  root: {
    position: 'relative',
    width: '100%',
  },
  tag: {
    left: 0,
    padding: 3,
    position: 'absolute',
    top: 0,
    zIndex: Z_INDEX.BETWEEN_ZERO_TOP,
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
  titlePlacementBottom: {
    marginTop: SPACING.SIZE_02,
  },
  titlePlacementTop: {
    marginTop: SPACING.SIZE_20,
  },
};

export const customImageMaxWidth: StylesMap = {
  vehicleModelMaxWidth: {
    [MQ.S]: {
      width: 85.12,
      maxWidth: 85.12,
    },
    [MQ.M]: {
      width: 104.03,
      maxWidth: 104.03,
    },
    [MQ.XL]: {
      width: 122.95,
      maxWidth: 122.95,
    },
  },
  vehicleTypesMaxWidth: {
    [MQ.S]: {
      width: 81.45,
      maxWidth: 81.45,
    },
    [MQ.M]: {
      width: 99.55,
      maxWidth: 99.55,
    },
    [MQ.XL]: {
      width: 117.65,
      maxWidth: 117.65,
    },
  },
  logosBrandsMaxWidth: {
    [MQ.S]: {
      width: 81,
      maxWidth: 81,
    },
    [MQ.M]: {
      width: 110.5,
      maxWidth: 110.5,
    },
  },
  logosMakesMaxWidth: {
    [MQ.S]: {
      width: 60,
      maxWidth: 60,
    },
    [MQ.M]: {
      width: 80,
      maxWidth: 80,
    },
  },
};
