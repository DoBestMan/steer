import { MQ, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  label: [
    typography.labelHeadline,
    {
      marginRight: SPACING.SIZE_15,
    },
  ],
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
  toggle: {
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    right: SPACING.SIZE_20,
    [MQ.M]: {
      right: SPACING.SIZE_40,
    },
    [MQ.L]: {
      right: SPACING.SIZE_70,
    },
  },
};

export default styles;
