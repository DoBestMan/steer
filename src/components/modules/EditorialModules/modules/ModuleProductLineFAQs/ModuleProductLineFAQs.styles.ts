import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  dataContainer: {
    borderTop: BORDERS.SOLID_GRAY_80_1PX,
    [MQ.L]: {
      marginBottom: SPACING.SIZE_25,
      marginTop: SPACING.SIZE_25,
    },
    marginTop: SPACING.SIZE_40,
    marginBottom: SPACING.SIZE_40,
  },
  faqItem: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
    },
    marginTop: SPACING.SIZE_25,
  },
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      marginBottom: SPACING.SIZE_40,
      marginTop: SPACING.SIZE_40,

      [MQ.L]: {
        marginBottom: SPACING.SIZE_25,
        marginTop: SPACING.SIZE_25,
      },
    },
  ],
};

export default styles;
