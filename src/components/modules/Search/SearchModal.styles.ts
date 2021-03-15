import { NAV_HEIGHT } from '~/components/modules/Nav/Nav.styles';
import { COLORS, MQ, StylesMap, Z_INDEX } from '~/lib/constants';

const styles: StylesMap = {
  loader: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: NAV_HEIGHT.S,

    [MQ.M]: {
      top: NAV_HEIGHT.M,
    },

    [MQ.L]: {
      top: NAV_HEIGHT.L + 30,
    },

    [MQ.XL]: {
      top: NAV_HEIGHT.XL + 30,
    },
  },
  loaderWrapper: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    bottom: 0,
    left: 0,
    position: 'fixed',
    right: 0,
    top: 0,
    zIndex: Z_INDEX.LOADING_BAR,
  },
};

export default styles;
