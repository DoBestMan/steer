import { MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  brand: {
    display: 'inline-block',
    marginBottom: SPACING.SIZE_20,
  },
  breadcrumbs: {
    marginBottom: SPACING.SIZE_40,
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
  title: typography.primaryHeadline,
};
export default styles;
