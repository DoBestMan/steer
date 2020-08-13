import { SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  brand: {
    marginBottom: SPACING.SIZE_05,
    span: typography.tertiaryHeadline,
  },
  productName: typography.primaryHeadline,
  productNameLong: typography.secondaryHeadline,
};

export default styles;
