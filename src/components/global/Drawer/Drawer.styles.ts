import { EASING, StylesMap, TIME, Z_INDEX } from '~/lib/constants';

const styles: StylesMap = {
  defaultStyle: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    height: '100%',
    outline: 0,
    overflowY: 'auto',
    position: 'fixed',
    top: 0,
    transition: `transform ${TIME.MS500}ms ${EASING.LINEAR}, background ${TIME.MS500}ms ${EASING.LINEAR}`,
    WebkitOverflowScrolling: 'touch',
    zIndex: Z_INDEX.MODAL - 1,
  },
  focusHide: {
    display: 'none',
  },
};

export default styles;
