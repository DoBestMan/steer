import { CSSObject } from '@emotion/core';

import { NAV_HEIGHT } from '~/components/modules/Nav/Nav.styles';
import { COLORS, MQ, SPACING } from '~/lib/constants';

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

  itemWrapper: {
    padding: SPACING.SIZE_30,
  },

  root: {
    position: 'relative',
  },

  topContent: {
    flex: '0 1 auto',
    height: '60vh',
    minHeight: 385,
    paddingTop: NAV_HEIGHT.S,

    [MQ.M]: {
      height: '65vh',
      minHeight: 517,
      paddingTop: NAV_HEIGHT.M,
    },

    [MQ.L]: {
      height: '66.6666666vh',
      minHeight: 538,
      paddingTop: NAV_HEIGHT.L,
    },
  },
};
