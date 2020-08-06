import {
  BORDERS,
  COLORS,
  GAP_COLUMNS,
  MQ,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';

const styles: StylesMap = {
  container: {
    [MQ.L]: {
      borderRadius: 15,
      overflow: 'hidden',
    },
  },
  item: {
    position: 'relative',

    // eslint-disable-next-line sort-keys
    '&:not(:first-of-type):before': {
      borderBottom: BORDERS.SOLID_ORANGE_SHADE_15_1PX,
      content: '""',
      display: 'block',
      left: GAP_COLUMNS.S,
      position: 'absolute',
      right: GAP_COLUMNS.S,
      top: 0,
      zIndex: 1,
    },

    // eslint-disable-next-line sort-keys
    '> button': {
      textAlign: 'left',
      width: '100%',
    },
  },
  loading: {
    backgroundColor: COLORS.LIGHT.GRAY_10_SOLID,
    bottom: 0,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: Z_INDEX.FRONT,

    // eslint-disable-next-line sort-keys
    '&[aria-hidden="true"]': {
      opacity: 0,
      visibility: 'hidden',
      transition: `opacity ${TIME.MS200}ms ease, visibility 0s linear ${TIME.MS100}ms`,
    },
  },
  root: {
    position: 'relative',
  },
};

export default styles;
