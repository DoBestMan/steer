import { COLORS, StylesMap } from '~/lib/constants';

const CONSTANTS = {
  EMPTY_CONTAINER_HEIGHT: 200,
};

const styles: StylesMap = {
  container: {
    backgroundColor: COLORS.GLOBAL.WHITE,
  },
  emptyContainer: {
    padding: CONSTANTS.EMPTY_CONTAINER_HEIGHT,
    display: 'flex',
    justifyContent: 'center',
  },
};

export default styles;
