import { BORDERS, COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  listBoxButton: {
    alignItems: 'baseline',
    color: COLORS.GLOBAL.BLACK,
    display: 'flex',
    padding: `${SPACING.SIZE_02}px 0`,
  },
  listboxItem: [
    typography.secondaryHeadline,
    {
      position: 'relative',
    },
  ],
  listboxItemHighlight: {
    color: COLORS.LIGHT.GRAY_70,
  },
  listboxItemSecondary: [typography.largeCopy, { marginLeft: SPACING.SIZE_10 }],
  listboxItemSelected: {
    outline: BORDERS.FOCUS_STATE,
  },
};

export default styles;
