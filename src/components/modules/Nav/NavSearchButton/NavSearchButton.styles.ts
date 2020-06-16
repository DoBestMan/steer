import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

import { NAV_CONTENT_HEIGHT } from '../Nav.styles';

const styles: StylesMap = {
  button: {
    alignItems: 'center',
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    [MQ.L]: {
      borderBottom: BORDERS.SOLID_GRAY_20_1PX,
      height: NAV_CONTENT_HEIGHT,
      paddingBottom: SPACING.SIZE_20,
      textAlign: 'left',
      width: '100%',
    },
  },
  icon: {
    [MQ.L]: {
      color: COLORS.GLOBAL.ORANGE,
      marginRight: SPACING.SIZE_10,
    },
  },
};

export default styles;
