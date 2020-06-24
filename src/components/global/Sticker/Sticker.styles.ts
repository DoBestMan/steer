import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

const SIZES = {
  DEFAULT: {
    S: 44,
    M: 44,
    L: 44,
    XL: 50,
  },
  LARGE: {
    S: 55,
    M: 75,
    L: 65,
    XL: 65,
  },
};

export const styles: StylesMap = {
  root: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderRadius: '100%',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    fontWeight: 'normal',
    height: SIZES.DEFAULT.S,
    justifyContent: 'center',
    lineHeight: '100%', // not great but closer from design
    padding: SPACING.SIZE_05,
    textAlign: 'center',
    width: SIZES.DEFAULT.S,

    [MQ.M]: {
      height: SIZES.DEFAULT.M,
      width: SIZES.DEFAULT.M,
    },

    [MQ.L]: {
      height: SIZES.DEFAULT.L,
      width: SIZES.DEFAULT.L,
    },

    [MQ.XL]: {
      height: SIZES.DEFAULT.XL,
      width: SIZES.DEFAULT.XL,
    },
  },

  large: {
    height: SIZES.LARGE.S,
    padding: 3,
    width: SIZES.LARGE.S,

    [MQ.M]: {
      height: SIZES.LARGE.M,
      padding: 13,
      width: SIZES.LARGE.M,
    },

    [MQ.L]: {
      height: SIZES.LARGE.L,
      padding: SPACING.SIZE_10,
      width: SIZES.LARGE.L,
    },

    [MQ.XL]: {
      height: SIZES.LARGE.XL,
      width: SIZES.LARGE.XL,
    },
  },
};
