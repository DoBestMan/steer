import { CSSObject } from '@emotion/core';

import { COLORS } from '~/lib/constants';

export const styles: CSSObject = {
  height100: {
    height: '100%',
  },
  page: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    height: '100%',
  },
  root: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    height: '100vh',
  },
};
