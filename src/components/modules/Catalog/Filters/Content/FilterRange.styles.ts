import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  root: {
    [MQ.L]: { minWidth: 400 },
  },
  title: [
    typography.eyebrow,
    {
      marginBottom: SPACING.SIZE_40,
      paddingBottom: SPACING.SIZE_25,
      [MQ.L]: {
        color: COLORS.LIGHT.GRAY_70,
        marginBottom: SPACING.SIZE_15,
      },
    },
  ],
};

export default styles;
