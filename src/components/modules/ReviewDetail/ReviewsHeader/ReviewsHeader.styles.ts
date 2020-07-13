import { MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  BRAND_WIDTH: 85,
};

const styles: StylesMap = {
  brand: {
    alignItems: 'center',
    display: 'flex',
    marginBottom: SPACING.SIZE_20,
    maxWidth: CONSTANTS.BRAND_WIDTH,
  },
  breadcrumbs: {
    marginBottom: SPACING.SIZE_50,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_80,
    },
    [MQ.L]: {
      marginBottom: SPACING.SIZE_50,
    },
  },
  container: {
    marginBottom: SPACING.SIZE_40,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_60,
    },

    [MQ.L]: {
      marginBottom: SPACING.SIZE_80,
      marginTop: SPACING.SIZE_80,
    },
  },
  ratingsContainer: {
    marginTop: SPACING.SIZE_35,
    [MQ.M]: {
      marginTop: SPACING.SIZE_60,
    },
    [MQ.L]: {
      marginTop: SPACING.SIZE_80,
    },
  },
  statsContainer: {
    marginTop: SPACING.SIZE_40,
  },
  title: [typography.primaryHeadline, { marginBottom: SPACING.SIZE_10 }],
};
export default styles;
