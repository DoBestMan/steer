import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  header: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: SPACING.SIZE_15,
  },
  pageNumber: [
    typography.tertiaryHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
    },
  ],
  pageOlder: [
    typography.tertiaryHeadline,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
};

export default styles;
