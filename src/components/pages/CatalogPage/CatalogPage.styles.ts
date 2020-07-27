import { COLORS, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';

const styles: StylesMap = {
  grid: {
    marginBottom: SPACING.SIZE_30,
    minHeight: '100vh',
  },

  loadingContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: Z_INDEX.FRONT,
  },
};

export default styles;
