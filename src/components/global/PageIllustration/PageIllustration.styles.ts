import { BORDERS, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  car: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    width: '100%',
    // eslint-disable-next-line sort-keys
    svg: {
      transform: 'scale(0.9) translateY(5%)',
    },
  },
  illustration: {
    position: 'relative',
  },
  scenery: {
    backgroundSize: 'auto 80%',
    opacity: 0.5,
  },
};

export default styles;
