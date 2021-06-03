import {
  BORDERS,
  GAP_COLUMNS,
  MQ,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';

import { STICKY_BAR_HEIGHT } from '../../StickyBar/StickyBar.styles';

const styles: StylesMap = {
  item: {
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
    '> button': {
      textAlign: 'left',
      width: '100%',
    },
    position: 'relative',
  },
  root: {
    '&[aria-hidden="false"]': {
      [MQ.M]: {
        height: STICKY_BAR_HEIGHT.M,
      },
      [MQ.L]: {
        height: STICKY_BAR_HEIGHT.L,
      },
      height: STICKY_BAR_HEIGHT.S,
      pointerEvents: 'auto',
      transform: 'translateY(-100%)',
      transition: `transform ${TIME.MS2000}ms ease`,
    },
    height: 0,
    transform: 'translateY(50%)',
    transition: `transform ${TIME.MS2000}ms ease, height 0s linear ${TIME.MS400}ms`,
  },
  rootInactive: {
    height: 0,
  },
  stickyBar: {
    [MQ.L]: {
      boxShadow: 'none',
    },
    borderTop: 'none',
    boxShadow: '0px -3px 10px rgba(0, 0, 0, 0.2)',
  },
};

export default styles;
