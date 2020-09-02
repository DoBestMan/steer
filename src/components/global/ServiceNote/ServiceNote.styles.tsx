import { COLORS, MQ, SPACING, StylesMap, TIME } from '~/lib/constants';
import {
  fadeInUp,
  fadeInUp20px,
  fadeOutDown,
  fadeOutDown20px,
} from '~/styles/animations.styles';
import { typography } from '~/styles/typography.styles';

const CLOSE_ICON_POS = {
  S: {
    right: SPACING.SIZE_10,
    top: SPACING.SIZE_15,
  },
  M: {
    right: SPACING.SIZE_30,
    top: SPACING.SIZE_35,
  },
  L: {
    right: SPACING.SIZE_10,
    top: SPACING.SIZE_15,
  },
};

const styles: StylesMap = {
  root: [
    typography.secondaryHeadline,
    {
      animation: `${fadeInUp} ${TIME.MS350}ms ease-in`,
      backgroundColor: COLORS.GLOBAL.ORANGE,
      color: COLORS.GLOBAL.WHITE,
      display: 'flex',
      justifyContent: 'space-between',
      left: 0,
      padding: SPACING.SIZE_20,
      paddingRight: SPACING.SIZE_110,
      position: 'fixed',
      width: '100%',
      [MQ.M]: {
        padding: SPACING.SIZE_40,
        paddingRight: SPACING.SIZE_160,
      },
      [MQ.L]: [
        {
          alignItems: 'center',
          animation: `${fadeInUp20px} ${TIME.MS200}ms ease-in`,
          minHeight: 'auto',
          padding: SPACING.SIZE_20,
          paddingRight: SPACING.SIZE_110,
        },
      ],
    },
  ],

  icon: [
    {
      alignSelf: 'flex-start',
      color: COLORS.GLOBAL.WHITE,
      position: 'absolute',
      [MQ.L]: {
        ':hover': {
          color: COLORS.GLOBAL.WHITE,
        },
      },
    },
    {
      [MQ.S]: CLOSE_ICON_POS.S,
      [MQ.M]: CLOSE_ICON_POS.M,
      [MQ.L]: CLOSE_ICON_POS.L,
    },
  ],

  isDismissed: {
    pointerEvents: 'none',
    visibility: 'hidden',
    [MQ.S]: {
      animation: `${fadeOutDown} ${TIME.MS350}ms ease-out`,
      transition: `visibility ${TIME.MS350}ms ease-out`,
    },
    [MQ.L]: {
      animation: `${fadeOutDown20px} ${TIME.MS200}ms ease-in`,
      transition: `visibility ${TIME.MS200}ms ease-out`,
    },
  },
};

export default styles;
