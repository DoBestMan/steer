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
    [MQ.S]: {
      display: 'none',
    },
    [MQ.M]: {
      display: 'initial',
      marginBottom: SPACING.SIZE_40,
    },
  },
  title: {
    color: COLORS.GLOBAL.WHITE,
    marginBottom: SPACING.SIZE_20,
    [MQ.S]: typography.eyebrow,
    [MQ.M]: [
      typography.primaryHeadline,
      {
        marginBottom: SPACING.SIZE_10,
        textTransform: 'initial',
      },
    ],
  },
};

export default styles;
