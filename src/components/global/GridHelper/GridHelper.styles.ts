import { StylesMap, Z_INDEX } from '~/lib/constants';

const styles: StylesMap = {
  container: {
    height: '100%',
    left: 0,
    pointerEvents: 'none',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: Z_INDEX.GRID_HELPER,
  },
  grid: {
    height: '100%',
  },
  item: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    height: '100%',
  },
};

export default styles;
