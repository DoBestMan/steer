import { css } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { layout } from '~/styles/layout.styles';
import { typography } from '~/styles/typography.styles';

export const styles = {
  container: css({
    height: '100%',
    paddingBottom: SPACING.SIZE_60,
  }),
  content: css({
    background: COLORS.GLOBAL.WHITE,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    minHeight: '100%',
    [MQ.S]: {
      padding: `0 ${SPACING.SIZE_20}px ${SPACING.SIZE_50}px ${SPACING.SIZE_20}px`,
    },
    [MQ.M]: {
      padding: `0 0 ${SPACING.SIZE_50}px 0`,
    },
  }),
  currentLocation: [
    typography.bodyCopy,
    css({
      color: COLORS.LIGHT.GRAY_70,
      display: 'block',
      marginTop: SPACING.SIZE_20,
    }),
  ],
  freeShippingIcon: css({
    marginRight: SPACING.SIZE_10,
  }),
  infoContainer: [
    typography.bodyCopy,
    css({
      color: COLORS.LIGHT.GRAY_70,
      marginTop: 'auto',
    }),
  ],
  infoLink: css({
    '&:hover span, &:focus span': {
      color: COLORS.GLOBAL.BLACK,
    },
    color: COLORS.LIGHT.GRAY_70,
  }),
  toast: css({
    marginTop: 'auto',
  }),
  useCurrentLocationButton: [
    typography.primaryHeadline,
    layout.container,
    css({
      alignItems: 'baseline',
      marginTop: SPACING.SIZE_40,
    }),
  ],
  useCurrentLocationIcon: css({
    marginLeft: SPACING.SIZE_10,
  }),
};
