import { COLORS, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  breadCrumbs: {
    marginBottom: SPACING.SIZE_40,
  },
  circularItems: {
    margin: `${SPACING.SIZE_40}px 0`,
    '.electric-car-symbol': {
      stroke: COLORS.GLOBAL.BLACK,
      fill: 'none',
      strokeWidth: 2,
    },
  },
  innerItems: {
    marginBottom: SPACING.SIZE_40,
  },
};

export default styles;
