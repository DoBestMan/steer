import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

import { NAV_CONTENT_HEIGHT } from '../Nav.styles';

const styles: StylesMap = {
  button: {
    alignItems: 'center',
    display: 'flex',
    padding: `${SPACING.SIZE_10}px ${SPACING.SIZE_15}px`,
    [MQ.L]: {
      height: NAV_CONTENT_HEIGHT,
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
    marginRight: SPACING.SIZE_10,
  },
};

export default styles;
