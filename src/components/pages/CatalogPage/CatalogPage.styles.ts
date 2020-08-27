import { MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  grid: {
    marginBottom: SPACING.SIZE_60,
    minHeight: '100vh',
    [MQ.L]: {
      marginBottom: SPACING.SIZE_80,
    },
  },
};

export default styles;
