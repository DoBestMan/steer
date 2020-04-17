import { css } from '@emotion/core';

import { BORDERS } from '~/lib/constants/borders';
import { SPACING } from '~/lib/constants/spacing';
import { GAP_COLUMNS } from '~/lib/constants';
import { MQ } from '~/lib/constants/breakpoints';

export const borderTop = css({
  borderTop: BORDERS.SOLID_GRAY_20_1PX,
});

export const borderBottom = css({
  borderBottom: BORDERS.SOLID_GRAY_20_1PX,
});

const borderGapFix = css({
  marginRight: -GAP_COLUMNS.S,

  [MQ.L]: {
    marginRight: -GAP_COLUMNS.L,
  },
});

const borderTopMarginPadding = css({
  [MQ.S]: {
    marginTop: SPACING.SIZE_40,
    paddingTop: SPACING.SIZE_40,
  },
  [MQ.L]: {
    marginTop: SPACING.SIZE_50,
    paddingTop: SPACING.SIZE_50,
  },
  [MQ.XL]: {
    marginTop: SPACING.SIZE_60,
    paddingTop: SPACING.SIZE_60,
  },
});

export const borderTopWithGap = [borderTop, borderGapFix];

export const borderBottomWithGap = [borderBottom, borderGapFix];

export const borderTopWithGapAndSpacing = [
  borderTop,
  borderGapFix,
  borderTopMarginPadding,
];

export const borderTopWithSpacing = [borderTop, borderTopMarginPadding];
