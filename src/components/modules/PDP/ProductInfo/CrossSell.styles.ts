import { CSSObject } from '@emotion/core';

import { MQ, SPACING } from '~/lib/constants';

const styles: CSSObject = {
  crossSellButton: {
    justifyContent: 'center',
    marginTop: SPACING.SIZE_15,
    width: '100%',

    [MQ.M]: {
      width: 'auto',
      marginTop: SPACING.SIZE_25,
    },

    [MQ.L]: {
      marginTop: SPACING.SIZE_20,
    },
  },
};

export default styles;
