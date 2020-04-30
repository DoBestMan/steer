import { css } from '@emotion/core';

import { MQ } from '~/lib/constants';

export const layout = {
  centeredHorizontal: css({
    alignItems: 'center',
    justifyContent: 'space-between',
  }),
  centeredVertical: css({
    alignItems: 'center',
  }),
  container: css({
    display: 'flex',
  }),
  hideOnSmall: {
    display: 'none',

    [MQ.M]: {
      display: 'block',
    },
  },
};
