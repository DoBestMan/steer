import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  listboxItem: [
    typography.primaryHeadline,

    {
      lineHeight: 1.68,
      position: 'relative',
      [MQ.M]: { lineHeight: 1.68 },
    },
  ],
  listboxItemHighlight: {
    color: COLORS.LIGHT.GRAY_70,
  },
  listboxItemSecondary: [typography.bodyCopy, { marginLeft: SPACING.SIZE_10 }],
  listboxItemSelected: {
    outline: BORDERS.FOCUS_STATE,
  },
};

export default styles;
