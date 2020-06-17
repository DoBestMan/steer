import { COLORS, MQ, StylesMap } from '~/lib/constants';

const SIZES = {
  SMALL: 55,
  MEDIUM: 65,
  LARGE: 75,
};

export const styles: StylesMap = {
  root: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderRadius: '100%',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    fontWeight: 'normal',
    height: SIZES.SMALL,
    justifyContent: 'center',
    padding: 3,
    textAlign: 'center',
    width: SIZES.SMALL,

    [MQ.M]: {
      height: SIZES.LARGE,
      padding: 5,
      width: SIZES.LARGE,
    },

    [MQ.L]: {
      height: SIZES.MEDIUM,
      width: SIZES.MEDIUM,
    },
  },

  small: {
    [MQ.M]: {
      height: SIZES.SMALL,
      width: SIZES.SMALL,
    },
    [MQ.L]: {
      height: SIZES.MEDIUM,
      width: SIZES.MEDIUM,
    },
  },
};
