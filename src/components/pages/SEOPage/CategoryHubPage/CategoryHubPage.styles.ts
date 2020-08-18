import { SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  breadCrumbs: {
    marginBottom: SPACING.SIZE_40,
  },
  categoryList: {
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
