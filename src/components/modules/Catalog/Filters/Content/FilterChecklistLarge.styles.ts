import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  group: {
    ':not(:last-of-type)': { borderBottom: BORDERS.SOLID_GRAY_20_1PX },
    marginBottom: SPACING.SIZE_15,
    paddingBottom: SPACING.SIZE_40,
  },
  groupTitle: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_05,
    },
  ],
  label: [
    typography.primarySubhead,
    {
      marginRight: SPACING.SIZE_05,
    },
  ],
  title: [
    typography.eyebrow,
    {
      marginBottom: SPACING.SIZE_15,
      paddingBottom: SPACING.SIZE_25,
      [MQ.L]: {
        borderBottom: BORDERS.SOLID_GRAY_20_1PX,
        color: COLORS.LIGHT.GRAY_70,
      },
    },
  ],
};

export default styles;
