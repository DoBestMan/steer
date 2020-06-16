import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  label: {
    fontWeight: 'normal',
  },
  noPrice: {
    color: COLORS.GLOBAL.WHITE,
    fontWeight: 'normal',
  },
  originalValue: [
    typography.smallCopy,
    {
      marginLeft: SPACING.SIZE_05,
      textDecoration: 'line-through',
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
};

export default styles;
