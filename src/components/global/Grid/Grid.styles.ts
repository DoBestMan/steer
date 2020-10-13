import {
  Breakpoint,
  GAP_COLUMNS,
  GRID_MARGIN,
  MQ,
  NB_COLUMNS,
  StylesMap,
} from '~/lib/constants';

const gridColumnByMQ = (mq: Breakpoint): Record<string, unknown> => {
  return {
    gridColumnGap: `${GAP_COLUMNS[mq]}px`,
    gridTemplateColumns: `[wrapper-start] ${
      GRID_MARGIN[mq] - GAP_COLUMNS[mq]
    }px [start] repeat(${NB_COLUMNS[mq]}, 1fr) [end] ${
      GRID_MARGIN[mq] - GAP_COLUMNS[mq]
    }px [wrapper-end]`,
  };
};

const styles: StylesMap = {
  container: {
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
  },
};

export default styles;
