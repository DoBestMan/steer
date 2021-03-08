import { SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  body: {
    marginBottom: SPACING.SIZE_60,
  },
  breadCrumbs: {
    marginBottom: SPACING.SIZE_40,
  },
  header: [typography.primaryHeadline],
  makeList: {
    marginBottom: SPACING.SIZE_60,
  },
};

export default styles;
