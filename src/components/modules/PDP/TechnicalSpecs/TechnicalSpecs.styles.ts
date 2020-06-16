import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  description: [
    typography.bodyCopy,
    {
      color: COLORS.DARK.GRAY_40,
    },
  ],
  descriptionContainer: {
    gridRow: 3,

    [MQ.L]: {
      gridRow: 2,
    },
  },
  findMyTireSizeLabel: {
    marginTop: SPACING.SIZE_20,
  },
  header: {
    paddingBottom: SPACING.SIZE_40,
  },
  imageContainer: {
    gridRow: 2,
    marginBottom: SPACING.SIZE_40,

    [MQ.L]: {
      gridRow: '1/4',
      marginBottom: 0,
    },
  },
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
  titleContainer: {
    gridRow: 1,
    marginBottom: SPACING.SIZE_40,

    [MQ.L]: {
      gridRow: 1,
      marginBottom: SPACING.SIZE_15,
    },
  },
};

export default styles;
