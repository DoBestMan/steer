import { css } from '@emotion/core';

import { COLORS, MQ, RADIUS, SPACING, TIME } from '~/lib/constants';
import {
  fadeInUp,
  fadeInUp20px,
  fadeOutDown,
  fadeOutDown20px,
} from '~/styles/animations.styles';
import { typography } from '~/styles/typography.styles';

const styles = {
  root: css([
    typography.secondaryHeadline,
    css({
      animation: `${fadeInUp} ${TIME.MS350}ms ease-in`,
      backgroundColor: COLORS.GLOBAL.ORANGE,
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
        css({
          animation: `${fadeInUp20px} ${TIME.MS200}ms ease-in`,
          borderRadius: RADIUS.RADIUS_15,
          minHeight: 'auto',
          padding: SPACING.SIZE_20,
          position: 'relative',
        }),
      ],
    }),
  ]),

  // eslint-disable-next-line sort-keys
  icon: css({
    alignSelf: 'flex-start',
    color: COLORS.GLOBAL.WHITE,
    [MQ.L]: {
      color: COLORS.ORANGE.TINT_70,
      paddingLeft: SPACING.SIZE_15,
      paddingTop: 3,
    },
  }),

  isDismissed: css({
    pointerEvents: 'none',
    visibility: 'hidden',
    [MQ.S]: css({
      animation: `${fadeOutDown} ${TIME.MS350}ms ease-out`,
      transition: `visibility ${TIME.MS350}ms ease-out`,
    }),
    [MQ.L]: css({
      animation: `${fadeOutDown20px} ${TIME.MS200}ms ease-in`,
      transition: `visibility ${TIME.MS200}ms ease-out`,
    }),
  }),
};

export default styles;
