import { CSSObject } from '@emotion/core';

import { COLORS, MQ } from '~/lib/constants';

export const styles: CSSObject = {
  backgroundContainer: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    height: '100vh',
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  iosBackgroundContainer: {
    height: '-webkit-fill-available',
    [MQ.M]: {
      height: '100vh',
    },
  },
};
