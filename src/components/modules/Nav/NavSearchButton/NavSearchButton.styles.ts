import { MQ, SPACING, StylesMap } from '~/lib/constants';

import { NAV_CONTENT_HEIGHT } from '../Nav.styles';

const styles: StylesMap = {
  button: {
    alignItems: 'center',
    display: 'flex',
    [MQ.L]: {
      height: NAV_CONTENT_HEIGHT,
      paddingBottom: SPACING.SIZE_20,
      textAlign: 'left',
      width: '100%',
    },
  },
  icon: {
    [MQ.L]: {
      marginRight: SPACING.SIZE_10,
    },
  },
};

export default styles;
