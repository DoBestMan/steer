import { CSSObject } from '@emotion/core';

import { COLORS } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  icon: {
    marginLeft: 7,
  },
  loadIndex: {
    fontWeight: 'normal',
  },
  root: [
    typography.primaryHeadline,
    {
      alignItems: 'center',
      display: 'flex',

      ':disabled': {
        pointerEvents: 'none',
      },
    },
  ],
  selectSize: {
    color: COLORS.GLOBAL.ORANGE,
  },
  size: {
    color: COLORS.GLOBAL.BLACK,
  },
};

export default styles;
