import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  currentBlock: {
    display: 'block',
  },
  noPrice: {
    fontWeight: 'normal',
  },
  originalValue: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_02,
      marginLeft: SPACING.SIZE_05,
      textDecoration: 'line-through',
    },
  ],
  originalValuePrefixed: {
    display: 'block',
    marginLeft: 0,
    textDecoration: 'none',
  },
};

export default styles;
