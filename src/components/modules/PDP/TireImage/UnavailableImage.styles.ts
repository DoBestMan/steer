import { COLORS, MQ, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { MAX_HEIGHT } from './TireImage.styles';

const styles: StylesMap = {
  image: {
    height: '100%',
    width: 'auto',
  },
  label: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_05,
      marginLeft: -SPACING.SIZE_05,
      maxWidth: 80,
      zIndex: Z_INDEX.OVERLAY,

      [MQ.M]: {
        marginBottom: SPACING.SIZE_20,
        marginLeft: -SPACING.SIZE_20,
      },

      [MQ.L]: {
        marginBottom: SPACING.SIZE_30,
        marginLeft: -SPACING.SIZE_30,
      },
    },
  ],
  root: {
    alignItems: 'flex-end',
    display: 'flex',
    height: MAX_HEIGHT.S,
    justifyContent: 'center',
    position: 'relative',

    [MQ.M]: {
      height: MAX_HEIGHT.M,
    },

    [MQ.L]: {
      height: MAX_HEIGHT.L,
    },
  },
};

export default styles;
