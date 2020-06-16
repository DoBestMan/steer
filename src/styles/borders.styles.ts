import { BORDERS, GAP_COLUMNS, MQ, SPACING } from '~/lib/constants';

export const borderTop = {
  borderTop: BORDERS.SOLID_GRAY_20_1PX,
};

export const borderBottom = {
  borderBottom: BORDERS.SOLID_GRAY_20_1PX,
};

const borderGapFix = {
  marginRight: -GAP_COLUMNS.S,

  [MQ.L]: {
    marginRight: -GAP_COLUMNS.L,
  },
};

const borderTopMarginPadding = {
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
};

export const borderTopWithGap = [borderTop, borderGapFix];

export const borderBottomWithGap = [borderBottom, borderGapFix];

export const borderTopWithGapAndSpacing = [
  borderTop,
  borderGapFix,
  borderTopMarginPadding,
];

export const borderTopWithSpacing = [borderTop, borderTopMarginPadding];
