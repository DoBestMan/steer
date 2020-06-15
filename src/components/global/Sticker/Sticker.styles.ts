import { CSSObject } from '@emotion/core';

import { COLORS, MQ } from '~/lib/constants';

export const styles: CSSObject = {
  root: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderRadius: '100%',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    fontWeight: 'normal',
    height: 55,
    justifyContent: 'center',
    padding: 3,
    textAlign: 'center',
    width: 55,

    [MQ.M]: {
      height: 75,
      padding: 5,
      width: 75,
    },

    [MQ.L]: {
      height: 65,
      width: 65,
    },
  },
};
