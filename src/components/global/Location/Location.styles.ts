import { css } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';
import { layout } from '~/styles/layout.styles';
import { typography } from '~/styles/typography.styles';

export const styles = {
  container: css({
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingBottom: SPACING.SIZE_60,
  }),
  currentLocation: [
    typography.bodyCopy,
    css({
      color: COLORS.LIGHT.GRAY_70,
      display: 'block',
      marginTop: SPACING.SIZE_20,
    }),
  ],
  freeShipping: layout.container,
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
    color: COLORS.LIGHT.GRAY_70,
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
