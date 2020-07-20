import { NAV_HEIGHT } from '~/components/modules/Nav/Nav.styles';
import { MQ, StylesMap } from '~/lib/constants';

const EXTRA_PADDING = {
  S: 0,
  M: 50,
  L: 50,
};

const styles: StylesMap = {
  root: {
    minHeight: '100vh',
    paddingBottom: EXTRA_PADDING.S,
    paddingTop: NAV_HEIGHT.S + EXTRA_PADDING.S,

    [MQ.M]: {
      paddingBottom: EXTRA_PADDING.M,
      paddingTop: NAV_HEIGHT.M + EXTRA_PADDING.M,
    },

    [MQ.L]: {
      paddingBottom: EXTRA_PADDING.L,
      paddingTop: NAV_HEIGHT.L + EXTRA_PADDING.L,
    },
  },
  rootIos: {
    minHeight: '-webkit-fill-available',
  },
};

export default styles;
