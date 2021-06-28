import { CSSObject } from '@emotion/core';

import { COLORS, MQ } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  btnContainer: {
    height: 30,
    width: 320,
    [MQ.M]: {
      width: 340,
    },
    [MQ.XL]: {
      height: 47,
      width: 400,
    },
  },
  btnRoot: {
    ':hover': {
      color: COLORS.ORANGE.SHADE_30_SOLID,
    },
  },
  icon: {
    marginLeft: 15,
    color: COLORS.GLOBAL.ORANGE,

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
  selectSize: {
    color: COLORS.GLOBAL.ORANGE,
    borderBottom: '2px dotted currentColor',
  },
  size: {
    color: COLORS.GLOBAL.ORANGE,
    borderBottom: '2px dotted currentColor',
  },
};

export default styles;
