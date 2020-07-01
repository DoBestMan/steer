import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: {
    marginRight: SPACING.SIZE_05,
    whiteSpace: 'nowrap',
    pointerEvents: 'auto',
  },
  container: {
    marginTop: SPACING.SIZE_10,
  },
  disableEvents: {
    pointerEvents: 'none',
  },

  label: [
    typography.bodyCopy,
    {
      color: COLORS.ORANGE.SHADE_85,
    },
  ],
};

export default styles;
