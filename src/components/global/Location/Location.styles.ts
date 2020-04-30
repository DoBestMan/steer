import { css } from '@emotion/core';

import { COLORS, SPACING } from '~/lib/constants';
import { layout } from '~/styles/layout.styles';
import { typography } from '~/styles/typography.styles';

export const styles = {
  currentLocation: [
    typography.bodyCopy,
    css({
      color: COLORS.LIGHT.GRAY_70,
      display: 'block',
      marginTop: SPACING.SIZE_20,
    }),
  ],
  useCurrentLocationButton: [
    typography.primaryHeadline,
    layout.container,
    layout.alignBaseline,
    css({
      marginTop: SPACING.SIZE_40,
    }),
  ],
  useCurrentLocationIcon: css({
    marginLeft: SPACING.SIZE_10,
  }),
};
