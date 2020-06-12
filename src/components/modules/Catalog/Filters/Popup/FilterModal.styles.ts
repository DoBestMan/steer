import { CSSObject } from '@emotion/core';

import { MQ } from '~/lib/constants';

import { ACTION_BAR_HEIGHT } from './ActionBar.styles';

const styles: CSSObject = {
  filterContent: {
    [MQ.S]: {
      paddingBottom: ACTION_BAR_HEIGHT.SM,
    },
    [MQ.M]: {
      paddingBottom: ACTION_BAR_HEIGHT.MED,
    },
    [MQ.L]: {
      paddingBottom: ACTION_BAR_HEIGHT.LG,
    },
  },
};

export default styles;
