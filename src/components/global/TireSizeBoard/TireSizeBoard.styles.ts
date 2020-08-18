import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  tireSizeBoardButton: {
    [MQ.S]: {
      marginRight: SPACING.SIZE_10,
    },
    [MQ.M]: {
      marginRight: SPACING.SIZE_30,
    },
    [MQ.XL]: {
      marginRight: SPACING.SIZE_40,
    },
  },

  tireSizeBoardButtonsContainer: {
    marginBottom: SPACING.SIZE_40,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_80,
    },
    [MQ.XL]: {
      marginBottom: SPACING.SIZE_80,
    },
    marginTop: SPACING.SIZE_40,
    textAlign: 'center',
  },

  tireSizeBoardContainer: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
  },

  tireSizeBoardTitle: {
    color: COLORS.GLOBAL.WHITE,
    textAlign: 'center',
    [MQ.M]: {
      marginBottom: SPACING.SIZE_40,
    },
    [MQ.L]: {
      marginBottom: SPACING.SIZE_20,
    },
  },
};

export default styles;
