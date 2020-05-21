import { COLORS, TIME } from '~/lib/constants';

const styles = {
  image: {
    display: 'block',
    objectFit: 'inherit',
    objectPosition: 'inherit',
    opacity: 0,
    transition: `opacity ${TIME.MS350}ms ease-in-out`,
  },

  isLoaded: {
    opacity: 1,
  },

  placeholder: {
    backgroundColor: COLORS.LIGHT.GRAY_10,
  },

  root: {
    backgroundColor: 'transparent',
    display: 'block',
    objectFit: 'contain',
    transition: `backgroundColor ${TIME.MS100}ms ease-in-out`,
  },
};

export default styles;
