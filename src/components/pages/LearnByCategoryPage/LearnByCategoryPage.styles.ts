import { BORDERS, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  articles: {
    'article:first-of-type': {
      borderTop: BORDERS.SOLID_GRAY_10_1PX,
    },
  },
  articleWrapper: {
    marginBottom: SPACING.SIZE_20,
  },
  header: {
    marginBottom: SPACING.SIZE_50,
  },
  pagination: {
    marginTop: SPACING.SIZE_20,
    marginBottom: SPACING.SIZE_80,
  },
};

export default styles;
