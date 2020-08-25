import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const styles: StylesMap = {
  brandListContainer: {
    marginTop: SPACING.SIZE_60,
    '&:last-of-type': {
      marginBottom: SPACING.SIZE_40,
    },
  },
  breadCrumbs: {
    marginBottom: SPACING.SIZE_40,
    [MQ.L]: {
      marginBottom: SPACING.SIZE_50,
    },
  },
  carouselContainer: {
    marginTop: SPACING.SIZE_60,
  },
  carouselSubTitle: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  carouselTitle: [
    typography.primaryHeadline,
    {
      paddingBottom: SPACING.SIZE_20,
    },
  ],
  carouselTitleWrapper: {
    paddingTop: SPACING.SIZE_40,
    backgroundColor: COLORS.LIGHT.GRAY_10,
    marginBottom: 0,
  },
  listItem: {
    marginBottom: SPACING.SIZE_40,
  },
  title: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,
    },
  ],
  titleContainer: {
    marginBottom: SPACING.SIZE_20,
  },
};
