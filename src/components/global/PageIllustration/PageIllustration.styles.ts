import { BORDERS, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  car: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    transform: `translate3D(0, ${SPACING.SIZE_20}, 0)`,
    width: '100%',
  },
  illustration: {
    position: 'relative',
  },
  scenery: {
    marginBottom: SPACING.SIZE_20,
    opacity: 0.5,
  },
};

export default styles;
