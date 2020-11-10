import { COLORS, MQ, StylesMap, Z_INDEX } from '~/lib/constants';

const BUTTON_SIZE = {
  S: 45,
  M: 93,
};

const styles: StylesMap = {
  root: {
    alignItems: 'center',
    background: COLORS.GLOBAL.WHITE,
    borderRadius: '50%',
    boxShadow: '0px 0px 8px 8px rgba(0, 0, 0, 0.1)',
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    height: BUTTON_SIZE.S,
    justifyContent: 'center',
    position: 'absolute',
    top: -64,
    width: BUTTON_SIZE.S,
    zIndex: Z_INDEX.FRONT,
    [MQ.M]: {
      top: -75,
      height: BUTTON_SIZE.M,
      width: BUTTON_SIZE.M,
    },
    [MQ.L]: {
      top: -56,
    },
  },
  nextButton: {
    right: 0,
    transform: 'translateX(50%)',
  },
  prevButton: {
    left: 0,
    transform: 'translateX(-50%)',
  },
  isHoverd: {
    background: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
  },
};

export default styles;
