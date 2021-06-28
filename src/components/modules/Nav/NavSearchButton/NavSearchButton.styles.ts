import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

import { NAV_CONTENT_HEIGHT } from '../Nav.styles';

const styles: StylesMap = {
  button: {
    alignItems: 'center',
    display: 'flex',
    height: 19,
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_10}px ${SPACING.SIZE_15}px`,
    width: 62,
    [MQ.L]: {
      height: NAV_CONTENT_HEIGHT,
      justifyContent: 'flex-start',
      padding: `0 0 ${SPACING.SIZE_20}px 0`,
      textAlign: 'left',
      width: '100%',
    },
    [MQ.XL]: {
      marginTop: SPACING.SIZE_01,
    },
  },
  icon: {
    color: COLORS.GLOBAL.BLACK,
    [MQ.L]: {
      marginRight: SPACING.SIZE_10,
    },
  },
};

export default styles;
