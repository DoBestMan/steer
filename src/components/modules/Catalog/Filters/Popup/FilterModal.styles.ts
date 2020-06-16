import { MQ, StylesMap } from '~/lib/constants';

import { ACTION_BAR_HEIGHT } from './ActionBar.styles';

const styles: StylesMap = {
  actionBar: {
    paddingBottom: ACTION_BAR_HEIGHT.SM,
    [MQ.M]: {
      paddingBottom: ACTION_BAR_HEIGHT.MED,
    },
    [MQ.L]: {
      paddingBottom: ACTION_BAR_HEIGHT.LG,
    },
  },
};

export default styles;
