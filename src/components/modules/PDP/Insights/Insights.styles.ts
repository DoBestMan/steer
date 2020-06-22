import { BORDERS, GAP_COLUMNS, MQ, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  container: {
    [MQ.L]: {
      borderRadius: 15,
      overflow: 'hidden',
    },
  },
  item: {
    position: 'relative',

    // eslint-disable-next-line sort-keys
    '&:not(:first-of-type):before': {
      borderBottom: BORDERS.SOLID_ORANGE_SHADE_15_1PX,
      content: '""',
      display: 'block',
      left: GAP_COLUMNS.S,
      position: 'absolute',
      right: GAP_COLUMNS.S,
      top: 0,
      zIndex: 1,
    },

    // eslint-disable-next-line sort-keys
    '> button': {
      textAlign: 'left',
      width: '100%',
    },
  },
};

export default styles;
