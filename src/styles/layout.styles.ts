import { css } from '@emotion/core';

import { MQ } from '~/lib/constants';

export const layout = {
  absoluteContainer: css({
    height: '100%',
    position: 'absolute',
    width: '100%',
  }),
  centered: css({
    alignItems: 'center',
    justifyContent: 'center',
  }),
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
  horizontalContainer: css({
    display: 'flex',
    flexDirection: 'row',
  }),
  verticalContainer: css({
    display: 'flex',
    flexDirection: 'column',
  }),
};
