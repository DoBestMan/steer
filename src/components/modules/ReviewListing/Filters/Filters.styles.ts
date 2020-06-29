import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    marginTop: SPACING.SIZE_10,
    button: {
      marginRight: SPACING.SIZE_05,
    },
  },
  label: [
    typography.bodyCopy,
    {
      color: COLORS.ORANGE.SHADE_85,
    },
  ],
};

export default styles;
