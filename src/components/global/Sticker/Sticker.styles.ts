import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

export enum STICKER_SIZES {
  LARGE = 'LARGE',
  MEDIUM = 'MEDIUM',
  SMALL = 'SMALL',
  X_LARGE = 'X_LARGE',
}

export const SIZES = {
  [STICKER_SIZES.SMALL]: {
    S: 46,
    XL: 50,
  },
  [STICKER_SIZES.MEDIUM]: {
    S: 55,
    XL: 60,
  },
  [STICKER_SIZES.LARGE]: {
    S: 55,
    XL: 65,
  },
  [STICKER_SIZES.X_LARGE]: {
    S: 60,
    XL: 65,
  },
};

const ROOT_LINE_HEIGHT = 0.95; // not great but closer from design

export const styles: StylesMap = {
  root: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderRadius: '100%',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    justifyContent: 'center',
    lineHeight: ROOT_LINE_HEIGHT,
    textAlign: 'center',
    [MQ.M]: { lineHeight: ROOT_LINE_HEIGHT },
    [MQ.L]: { lineHeight: ROOT_LINE_HEIGHT },
    [MQ.XL]: { lineHeight: ROOT_LINE_HEIGHT },
  },

  [STICKER_SIZES.SMALL]: {
    height: SIZES[STICKER_SIZES.SMALL].S,
    padding: SPACING.SIZE_05,
    width: SIZES[STICKER_SIZES.SMALL].S,

    [MQ.XL]: {
      height: SIZES[STICKER_SIZES.SMALL].XL,
      width: SIZES[STICKER_SIZES.SMALL].XL,
    },
  },

  [STICKER_SIZES.MEDIUM]: {
    height: SIZES[STICKER_SIZES.MEDIUM].S,
    padding: 3,
    width: SIZES[STICKER_SIZES.MEDIUM].S,

    [MQ.M]: {
      padding: 13,
    },

    [MQ.L]: {
      padding: SPACING.SIZE_10,
    },

    [MQ.XL]: {
      height: SIZES[STICKER_SIZES.MEDIUM].XL,
      width: SIZES[STICKER_SIZES.MEDIUM].XL,
    },
  },

  [STICKER_SIZES.LARGE]: {
    height: SIZES[STICKER_SIZES.LARGE].S,
    padding: 3,
    width: SIZES[STICKER_SIZES.LARGE].S,

    [MQ.M]: {
      padding: 13,
    },

    [MQ.L]: {
      padding: SPACING.SIZE_10,
    },

    [MQ.XL]: {
      height: SIZES[STICKER_SIZES.LARGE].XL,
      width: SIZES[STICKER_SIZES.LARGE].XL,
    },
  },
  [STICKER_SIZES.X_LARGE]: {
    height: SIZES[STICKER_SIZES.X_LARGE].S,
    padding: 3,
    width: SIZES[STICKER_SIZES.X_LARGE].S,

    [MQ.M]: {
      padding: 13,
    },

    [MQ.L]: {
      padding: SPACING.SIZE_10,
    },

    [MQ.XL]: {
      height: SIZES[STICKER_SIZES.X_LARGE].XL,
      width: SIZES[STICKER_SIZES.X_LARGE].XL,
    },
  },
};
