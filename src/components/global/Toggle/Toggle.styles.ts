import { COLORS, RADIUS, StylesMap, TIME } from '~/lib/constants';

const styles: StylesMap = {
  checked: {
    transform: 'translateX(17px)',
  },
  indicator: {
    background: COLORS.GLOBAL.WHITE,
    borderRadius: RADIUS.CIRCLE,
    bottom: 2,
    content: '""',
    height: 11,
    left: 2,
    position: 'absolute',
    transition: `${TIME.MS300}ms ease`,
    width: 10,
  },
  slider: {
    background: COLORS.GLOBAL.BLACK,
    borderRadius: RADIUS.PILL,
    bottom: 0,
    cursor: 'pointer',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    transition: `${TIME.MS300}ms ease`,
  },
  sliderActive: {
    background: COLORS.GLOBAL.ORANGE,
  },
  switch: {
    display: 'inline-block',
    height: 15,
    position: 'relative',
    width: 31,
  },
};

export default styles;
