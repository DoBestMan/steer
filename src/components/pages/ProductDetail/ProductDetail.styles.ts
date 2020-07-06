import { MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  root: {
    [MQ.L]: {
      paddingTop: SPACING.SIZE_80,
    },
  },
  breadcrumbs: {
    marginBottom: SPACING.SIZE_20,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_30,
    },

    [MQ.L]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  productInfo: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_05,
    },
  },
  tireImage: {
    marginBottom: SPACING.SIZE_10,
    width: '100%',

    [MQ.M]: {
      marginBottom: SPACING.SIZE_05,
    },

    [MQ.L]: {
      marginTop: 0,
    },
  },
};

export default styles;
