import { CSSObject } from '@emotion/core';

import { COLORS, MQ } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  icon: {
    marginLeft: 15,
    color: COLORS.LIGHT.GRAY_70,

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
    color: COLORS.LIGHT.GRAY_70,
    borderBottom: '2px dotted currentColor',
  },
};

export default styles;
