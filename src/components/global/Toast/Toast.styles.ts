import { COLORS, MQ, RADIUS, SPACING, StylesMap, TIME } from '~/lib/constants';
import {
  fadeInUp,
  fadeInUp20px,
  fadeOutDown,
  fadeOutDown20px,
} from '~/styles/animations.styles';
import { typography } from '~/styles/typography.styles';

const CLOSE_ICON_POS = {
  S: {
    right: 11,
    top: 15,
  },
  M: {
    right: 31,
    top: 36,
  },
  L: {
    right: 11,
    top: 15,
  },
};

const styles: StylesMap = {
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
  iconwithoutModal: [
    {
      color: COLORS.GLOBAL.WHITE,
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
  root: [
    typography.secondaryHeadline,
    {
      animation: `${fadeInUp} ${TIME.MS350}ms ease-in`,
      backgroundColor: COLORS.ORANGE.SHADE_15_SOLID,
      bottom: 0,
      color: COLORS.GLOBAL.WHITE,
      display: 'flex',
      justifyContent: 'space-between',
      left: 0,
      minHeight: 240,
      padding: SPACING.SIZE_20,
      position: 'fixed',
      width: '100%',
      [MQ.M]: {
        padding: SPACING.SIZE_40,
      },
      [MQ.L]: [
        typography.primarySubhead,
        {
          alignItems: 'center',
          animation: `${fadeInUp20px} ${TIME.MS200}ms ease-in`,
          borderRadius: RADIUS.RADIUS_15,
          minHeight: 'auto',
          padding: SPACING.SIZE_20,
          position: 'relative',
        },
      ],
    },
  ],
  rootWithoutModal: [
    typography.secondaryHeadline,
    {
      alignItems: 'center',
      animation: `${fadeInUp20px} ${TIME.MS200}ms ease-in`,
      backgroundColor: COLORS.ORANGE.SHADE_15_SOLID,
      borderRadius: RADIUS.RADIUS_15,
      bottom: 0,
      color: COLORS.GLOBAL.WHITE,
      display: 'flex',
      justifyContent: 'space-between',
      left: 0,
      minHeight: 'auto',
      padding: SPACING.SIZE_20,
      position: 'relative',
      width: '90%',
    },
  ],
};

export default styles;
