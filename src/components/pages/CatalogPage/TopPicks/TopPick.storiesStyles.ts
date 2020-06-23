import { CSSObject } from '@emotion/core';

import { NAV_HEIGHT } from '~/components/modules/Nav/Nav.styles';
import { COLORS, MQ } from '~/lib/constants';

export const styles: CSSObject = {
  bottomContent: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    flex: '1 1 auto',
  },
  fakeBackground: {
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: -1,
  },

  root: {
    position: 'relative',
  },

  topContent: {
    flex: '0 1 auto',
    height: `calc(60vh - ${NAV_HEIGHT.S}px)`,
    minHeight: 385,
    paddingTop: NAV_HEIGHT.S,

    [MQ.M]: {
      height: `calc(65vh - ${NAV_HEIGHT.M}px)`,
      minHeight: 517,
      paddingTop: NAV_HEIGHT.M,
    },

    [MQ.L]: {
      height: `calc(66.66666666vh - ${NAV_HEIGHT.L}px)`,
      minHeight: 538,
      paddingTop: NAV_HEIGHT.L,
    },
  },
};
