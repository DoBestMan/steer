import { MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  body: {
    marginBottom: SPACING.SIZE_60,
  },
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
};

export default styles;
