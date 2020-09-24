import { COLORS, SPACING, StylesMap } from '~/lib/constants';

export const styles: StylesMap = {
  container: {
    alignItems: 'baseline',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_20,
    width: '100%',
  },
  bar: {
    backgroundColor: COLORS.LIGHT.GRAY_70,
    borderRadius: '50px',
    height: '24px',
    width: '10px',
  },
};
