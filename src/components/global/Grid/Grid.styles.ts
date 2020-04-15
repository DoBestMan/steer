import { css } from '@emotion/core';

import {
  Breakpoint,
  MQ,
  NB_COLUMNS,
  GAP_COLUMNS,
  GRID_MARGIN,
} from '~/lib/constants';

const gridColumnByMQ = (mq: Breakpoint): object => {
  return {
    gridColumnGap: `${GAP_COLUMNS[mq]}px`,
    gridTemplateColumns: `[wrapper-start] ${
      GRID_MARGIN[mq] - GAP_COLUMNS[mq]
    }px [start] repeat(${NB_COLUMNS[mq]}, 1fr) [end] ${
      GRID_MARGIN[mq] - GAP_COLUMNS[mq]
    }px [wrapper-end]`,
  };
};

const styles = {
  container: css({
    display: 'grid',
    gridTemplateRows: 'auto',
    width: '100%',
    ...gridColumnByMQ('S'),

    [MQ.M]: {
      ...gridColumnByMQ('M'),
    },

    [MQ.L]: {
      ...gridColumnByMQ('L'),
    },

    [MQ.XL]: {
      ...gridColumnByMQ('XL'),
    },
  }),
};

export default styles;
