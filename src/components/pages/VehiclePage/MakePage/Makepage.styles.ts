import { SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  breadCrumbs: {
    marginBottom: SPACING.SIZE_40,
  },
  header: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_60,
    },
  ],
  makeList: {
    marginBottom: SPACING.SIZE_60,
  },
};

export default styles;
