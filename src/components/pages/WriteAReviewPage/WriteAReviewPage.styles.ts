import { MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  breadcrumbs: {
    marginBottom: SPACING.SIZE_50,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_80,
    },

    [MQ.L]: {
      marginTop: SPACING.SIZE_80,
    },
  },
};

export default styles;
