import { MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  breadCrumbs: {
    marginBottom: SPACING.SIZE_40,
  },
  dataTableHeader: [
    typography.primaryHeadline,
    {
      [MQ.S]: {
        marginBottom: SPACING.SIZE_40,
      },
      [MQ.M]: {
        marginBottom: SPACING.SIZE_60,
      },
    },
  ],
  dataTableList: {
    marginBottom: SPACING.SIZE_60,
  },
  header: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,
    },
  ],
  pageHeader: {
    marginBottom: SPACING.SIZE_60,
  },
};

export default styles;
