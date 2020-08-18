import { MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  bottomDescription: [
    typography.bodyCopy,
    {
      p: {
        marginBottom: SPACING.SIZE_10,
      },
    },
  ],
  breadCrumbs: {
    marginBottom: SPACING.SIZE_40,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  dealsListHeading: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_40,
    },
  ],
  dealsSepartor: {
    marginBottom: SPACING.SIZE_40,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  dealsSignUp: {
    marginTop: SPACING.SIZE_40,
    [MQ.M]: {
      marginTop: SPACING.SIZE_60,
    },
  },
  header: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,
    },
  ],
  headerSeparator: {
    marginTop: SPACING.SIZE_60,
    [MQ.L]: {
      marginTop: SPACING.SIZE_80,
    },
  },
  pageHeader: {
    marginTop: 0,
    [MQ.M]: {
      marginTop: SPACING.SIZE_40,
    },
    [MQ.L]: {
      marginTop: SPACING.SIZE_70,
    },
  },
  promotionCardItem: {
    marginBottom: SPACING.SIZE_40,
  },
};

export default styles;
