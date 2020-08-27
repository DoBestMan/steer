import { MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  results: {
    paddingBottom: SPACING.SIZE_60,

    [MQ.M]: {
      paddingBottom: SPACING.SIZE_50,
    },
    [MQ.L]: {
      paddingBottom: 74,
    },
  },
};

export default styles;
