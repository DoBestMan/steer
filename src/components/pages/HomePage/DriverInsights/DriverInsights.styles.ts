import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  cards: {
    '> div:not(:last-child)': {
      marginBottom: SPACING.SIZE_20,
    },

    marginBottom: SPACING.SIZE_80,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_120,
    },
  },
  description: {
    color: COLORS.DARK.GRAY_40,
    marginBottom: SPACING.SIZE_40,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_40,
    },
  },
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      marginBottom: SPACING.SIZE_20,

      [MQ.M]: {
        marginBottom: SPACING.SIZE_10,
      },
    },
  ],
};

export default styles;
