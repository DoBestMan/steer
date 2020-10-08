import { CSSObject } from '@emotion/core';

import { COLORS, MQ } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  btnRoot: {
    ':hover': {
      color: COLORS.ORANGE.SHADE_30_SOLID,
    },
  },
  icon: {
    marginLeft: 15,

    [MQ.M]: {
      marginLeft: 17,
    },
    [MQ.XL]: {
      marginLeft: 12,
    },
  },
  iconNoSize: {
    color: COLORS.GLOBAL.ORANGE,
  },
  loadIndex: {
    fontWeight: 'normal',
  },
  root: [
    typography.primaryHeadline,
    {
      alignItems: 'center',
      color: COLORS.GLOBAL.ORANGE,
      display: 'flex',

      ':disabled': {
        pointerEvents: 'none',
      },
    },
  ],
  size: {
    borderBottom: '2px dotted currentColor',
  },
};

export default styles;
