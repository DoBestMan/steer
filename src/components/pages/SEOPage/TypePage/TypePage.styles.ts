import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  alsoInterestedContainer: {
    [MQ.S]: {
      marginTop: SPACING.SIZE_40,
      marginBottom: SPACING.SIZE_40,
    },
    [MQ.M]: {
      marginTop: SPACING.SIZE_60,
    },
    [MQ.L]: {
      marginTop: SPACING.SIZE_80,
      marginBottom: SPACING.SIZE_100,
    },
  },
  breadCrumbs: {
    marginBottom: SPACING.SIZE_40,
  },
  curatedProductsContainer: {
    [MQ.S]: {
      marginTop: SPACING.SIZE_60,
      marginBottom: SPACING.SIZE_60,
    },
    [MQ.M]: {
      marginTop: SPACING.SIZE_80,
      marginBottom: SPACING.SIZE_80,
    },
    [MQ.L]: {
      marginTop: SPACING.SIZE_100,
      marginBottom: SPACING.SIZE_100,
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
  mostPopularBrandsContainer: {
    backgroundColor: COLORS.LIGHT.GRAY_10,
  },
  pageHeader: {
    marginBottom: SPACING.SIZE_40,
    [MQ.S]: {
      marginTop: SPACING.SIZE_40,
    },
    [MQ.L]: {
      marginTop: SPACING.SIZE_70,
    },
  },
  reviewText: {
    marginBottom: SPACING.SIZE_60,
    marginTop: SPACING.SIZE_20,
  },
  root: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    paddingTop: SPACING.SIZE_80,
    [MQ.L]: {
      paddingTop: SPACING.SIZE_120,
    },
  },
};

export default styles;
