import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  breadcrumbs: {
    marginBottom: SPACING.SIZE_50,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_20,
    },
  },
  container: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
  },
  filtersContainer: {
    marginTop: SPACING.SIZE_40,
    marginBottom: SPACING.SIZE_40,
    '.filters-wrapper': {
      display: 'flex',
    },
  },
};

export default styles;
