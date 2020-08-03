import { MQ, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';

const styles: StylesMap = {
  stickyBar: {
    bottom: 0,
    marginTop: SPACING.SIZE_60,
    position: 'sticky',
    zIndex: Z_INDEX.FRONT,

    [MQ.L]: {
      marginTop: SPACING.SIZE_80,
    },
  },
};

export default styles;
