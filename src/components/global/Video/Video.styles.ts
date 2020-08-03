import { COLORS, StylesMap, TIME, Z_INDEX } from '~/lib/constants';

const styles: StylesMap = {
  button: {
    bottom: 0,
    display: 'block',
    height: '100%',
    left: 0,
    opacity: 1,
    position: 'absolute',
    right: 0,
    top: 0,
    transition: `opacity ${TIME.MS200}ms ease, z-index ${TIME.MS200}ms ease`,
    width: '100%',
    zIndex: Z_INDEX.FRONT,
  },

  buttonContent: {
    display: 'flex',
    height: '100%',
    width: '100%',
  },

  container: {
    display: 'block',
    position: 'relative',
    color: COLORS.GLOBAL.WHITE,
  },

  posterFrame: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  posterIcon: {
    margin: 'auto',
    position: 'relative',
    zIndex: Z_INDEX.TOP,
  },

  video: {
    bottom: 0,
    display: 'block',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },

  videoIframe: {
    height: '100%',
    width: '100%',
    opacity: 0,
  },
};

export const activeVideoStyles: StylesMap = {
  video: {
    zIndex: Z_INDEX.FRONT,
  },

  videoIframe: {
    opacity: 1,
  },

  button: {
    opacity: 0,
    zIndex: Z_INDEX.ZERO,
  },
};

export default styles;
