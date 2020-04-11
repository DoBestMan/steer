import { css } from '@emotion/core';
import { NB_COLUMNS, GAP_COLUMNS, GRID_MARGIN } from '~/styles/constants/grid';
import { Breakpoint } from '~/styles/constants/breakpoints.types';
import { MQ } from '~/styles/constants/breakpoints';

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

export const styles = {
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
