import { COLORS, EASING, StylesMap, TIME, Z_INDEX } from '~/lib/constants';

const BAR_HEIGHT = 3;
export const ANIMATION_DURATION = TIME.MS200;
export const INCREMENT_DURATION = TIME.MS50;

const styles: StylesMap = {
  bar: {
    '&::after': {
      boxShadow: `0 0 10px ${COLORS.ORANGE.SHADE_85_SOLID}, 0 0 5px ${COLORS.ORANGE.SHADE_85_SOLID}`,
      content: '""',
      display: 'block',
      height: BAR_HEIGHT,
      position: 'absolute',
      right: 0,
      transform: 'rotate(3deg) translate(0px, -4px)',
      width: 100,
    },

    backgroundColor: COLORS.ORANGE.SHADE_15_SOLID,
    display: 'block',
    height: BAR_HEIGHT,
    left: 0,
    position: 'absolute',
    top: 0,
    transform: 'translate3d(-100%, 0, 0)',
    transition: `transform ${ANIMATION_DURATION}ms ${EASING.CUBIC_EASE_IN_OUT}`,
    width: '100%',
  },

  container: {
    height: BAR_HEIGHT,
    left: 0,
    overflow: 'hidden',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: Z_INDEX.LOADING_BAR,
  },
};

export default styles;
