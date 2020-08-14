import { MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  grid: {
    marginBottom: SPACING.SIZE_60,
    minHeight: '100vh',

    [MQ.M]: {
      marginBottom: SPACING.SIZE_50,
    },
    [MQ.L]: {
      marginBottom: 74,
    },
  },
};

export default styles;
