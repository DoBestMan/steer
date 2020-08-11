import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { MAX_HEIGHT } from './TireImage.styles';

const styles: StylesMap = {
  image: {
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 'auto',
  },
  label: [
    typography.smallCopyTight,
    {
      bottom: 0,
      color: COLORS.LIGHT.GRAY_70,
      left: '50%',
      marginBottom: SPACING.SIZE_05,
      marginLeft: SPACING.SIZE_60,
      maxWidth: 80,
      position: 'absolute',
      textTransform: 'lowercase',

      [MQ.M]: {
        marginBottom: SPACING.SIZE_20,
        marginLeft: SPACING.SIZE_100,
      },

      [MQ.L]: {
        marginBottom: SPACING.SIZE_30,
        marginLeft: SPACING.SIZE_140,
      },
    },
  ],
  root: {
    height: MAX_HEIGHT.S,
    marginBottom: SPACING.SIZE_10,
    position: 'relative',

    [MQ.M]: {
      height: MAX_HEIGHT.M,
      marginBottom: SPACING.SIZE_25,
    },

    [MQ.L]: {
      height: MAX_HEIGHT.L,
    },
  },
};

export default styles;
