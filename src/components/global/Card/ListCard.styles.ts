import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles = {
  content: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
  cta: css({
    [MQ.S]: {
      padding: `0 ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `0 ${SPACING.SIZE_40}px 0 0`,
    },
  }),
  icon: css({
    display: 'inline-flex',
  }),
  image: css({
    alignItems: 'flex-end',
    display: 'flex',
    height: '100%',
  }),
  imageContainer: css({
    bottom: 0,
    height: '100%',
    pointerEvents: 'none',
    position: 'absolute',
    right: SPACING.SIZE_20,
  }),
  list: css({
    'li:first-of-type': {
      paddingTop: 0,
    },
    marginBottom: SPACING.SIZE_40,
  }),
  listItem: [
    typography.smallCopy,
    css({
      borderBottom: BORDERS.SOLID_GRAY_90_1PX,
      color: COLORS.GLOBAL.WHITE,
      position: 'relative',
      [MQ.S]: {
        padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_40}px`,
      },
      [MQ.L]: {
        padding: `${SPACING.SIZE_20}px 0`,
      },
    }),
  ],
  root: [
    typography.jumboHeadline,
    css({
      backgroundColor: COLORS.DARK.GRAY_90,
      borderRadius: RADIUS.RADIUS_15,
      [MQ.S]: {
        padding: `${SPACING.SIZE_40}px 0`,
      },
      [MQ.L]: {
        padding: `${SPACING.SIZE_60}px 0 ${SPACING.SIZE_60}px ${SPACING.SIZE_50}px`,
      },
    }),
  ],
  title: [
    typography.primaryHeadline,
    css({
      color: COLORS.GLOBAL.ORANGE,
      display: 'flex',
      [MQ.S]: {
        marginBottom: SPACING.SIZE_20,
        padding: `0 ${SPACING.SIZE_40}px`,
      },
      [MQ.L]: {
        justifyContent: 'center',
        marginBottom: 0,
        marginTop: -5, // line height causes misalignemnt to right column content
        padding: 0,
      },
    }),
  ],
};

export default styles;
