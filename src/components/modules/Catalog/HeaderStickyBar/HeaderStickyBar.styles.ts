import { MQ, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';

const styles: StylesMap = {
  root: {
    padding: `${SPACING.SIZE_15}px ${SPACING.SIZE_20}px`,
    position: 'sticky',
    top: 0,
    zIndex: Z_INDEX.FRONT,

    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_60}px`,
    },
  },
};

export default styles;
