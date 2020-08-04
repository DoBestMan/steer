import { BORDERS, COLORS, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  keyPoint: {
    textAlign: 'center',
    marginTop: SPACING.SIZE_20,
    marginBottom: SPACING.SIZE_20,
  },
  byline: {
    textAlign: 'center',
    color: COLORS.LIGHT.GRAY_70,
    marginTop: SPACING.SIZE_20,
    marginBottom: SPACING.SIZE_20,
  },
  quoteContainer: {
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
  },
};

export default styles;
