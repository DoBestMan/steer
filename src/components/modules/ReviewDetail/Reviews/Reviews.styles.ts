import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    paddingTop: SPACING.SIZE_40,

    [MQ.M]: {
      paddingTop: SPACING.SIZE_60,
    },

    [MQ.L]: {
      paddingTop: SPACING.SIZE_80,
    },
  },
  header: {
    paddingBottom: SPACING.SIZE_40,
  },
  seeMore: {
    marginTop: SPACING.SIZE_40,
    textAlign: 'center',
    [MQ.L]: {
      marginTop: SPACING.SIZE_60,
    },
  },
  sources: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
      flexDirection: 'column',
      paddingTop: SPACING.SIZE_02,
    },
  ],
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
    },
  ],
};

export default styles;
