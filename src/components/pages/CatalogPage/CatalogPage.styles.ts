import { NAV_HEIGHT } from '~/components/modules/Nav/Nav.styles';
import { MQ, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  grid: {
    minHeight: '100vh',
    paddingTop: NAV_HEIGHT.S,

    [MQ.M]: {
      paddingTop: NAV_HEIGHT.M,
    },

    [MQ.L]: {
      paddingTop: NAV_HEIGHT.L + 30,
    },

    [MQ.XL]: {
      paddingTop: NAV_HEIGHT.XL + 30,
    },
  },
  loaderWrapper: {
    paddingTop: NAV_HEIGHT.S,

    [MQ.M]: {
      paddingTop: NAV_HEIGHT.M,
    },

    [MQ.L]: {
      paddingTop: NAV_HEIGHT.L + 30,
    },

    [MQ.XL]: {
      paddingTop: NAV_HEIGHT.XL + 30,
    },
  },
};

export default styles;
