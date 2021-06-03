import {
  BORDERS,
  COLORS,
  GAP_COLUMNS,
  MQ,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';

const CONSTANTS = {
  CONTAINER_RADIUS: 15,
};
const styles: StylesMap = {
  confirmFitSeperator: {
    [MQ.M]: {
      left: GAP_COLUMNS.M,
      right: GAP_COLUMNS.M,
    },
    [MQ.L]: {
      left: GAP_COLUMNS.S,
      right: GAP_COLUMNS.S,
    },
    borderBottom: BORDERS.SOLID_ORANGE_SHADE_15_1PX,
    content: '""',
    display: 'block',
    left: GAP_COLUMNS.S,
    position: 'absolute',
    right: GAP_COLUMNS.S,
    top: 0,
    zIndex: Z_INDEX.FRONT,
  },
  container: {
    [MQ.L]: {
      borderRadius: CONSTANTS.CONTAINER_RADIUS,
      overflow: 'hidden',
    },
  },
  containerWithConfirmFit: {
    [MQ.L]: {
      borderBottomLeftRadius: CONSTANTS.CONTAINER_RADIUS,
      borderBottomRightRadius: CONSTANTS.CONTAINER_RADIUS,
      overflow: 'hidden',
    },
  },
  item: {
    // eslint-disable-next-line sort-keys
    '&:not(:first-of-type):before': {
      [MQ.M]: {
        left: GAP_COLUMNS.M,
        right: GAP_COLUMNS.M,
      },
      [MQ.L]: {
        left: GAP_COLUMNS.S,
        right: GAP_COLUMNS.S,
      },
      borderBottom: BORDERS.SOLID_ORANGE_SHADE_15_1PX,
      content: '""',
      display: 'block',
      left: GAP_COLUMNS.S,
      position: 'absolute',
      right: GAP_COLUMNS.S,
      top: 0,
      zIndex: Z_INDEX.FRONT,
    },
    // eslint-disable-next-line sort-keys
    '> button': {
      textAlign: 'left',
      width: '100%',
    },
    position: 'relative',
  },
  loading: {
    // eslint-disable-next-line sort-keys
    '&[aria-hidden="true"]': {
      opacity: 0,
      transition: `opacity ${TIME.MS200}ms ease, visibility 0s linear ${TIME.MS100}ms`,
      visibility: 'hidden',
    },
    backgroundColor: COLORS.LIGHT.GRAY_10_SOLID,
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: Z_INDEX.FRONT,
  },
  root: {
    position: 'relative',
  },
};

export default styles;
