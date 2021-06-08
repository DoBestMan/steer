import { COLORS, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';

const styles: StylesMap = {
  addTire: {
    display: 'flex',
    justifyContent: 'center',
    width: '152px',
  },
  background: {
    '&:before': {
      background: COLORS.GLOBAL.WHITE,
      content: '""',
      height: '70%',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
      zIndex: Z_INDEX.BEHIND,
    },
    '&:after': {
      background: COLORS.GLOBAL.ORANGE,
      bottom: 0,
      content: '""',
      height: '30%',
      left: 0,
      overflow: 'hidden',
      position: 'absolute',
      right: 0,
      zIndex: Z_INDEX.BEHIND,
    },
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    padding: `${SPACING.SIZE_60}px ${SPACING.SIZE_05}px ${SPACING.SIZE_10}px ${SPACING.SIZE_05}px`,
    position: 'relative',
  },
};

export default styles;
