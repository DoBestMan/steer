import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { GAP_COLUMNS } from '~/lib/constants/grid.ts';
import { typography, typographyStyles } from '~/styles/typography.styles';

export const styles: CSSObject = {
  closeButton: {
    marginTop: SPACING.SIZE_60,
  },
  contentSection: {
    marginTop: SPACING.SIZE_40,
    'p:first-of-type': {
      marginTop: 0,
    },
    p: [
      typography.bodyCopy,

      {
        marginTop: SPACING.SIZE_20,
      },
    ],
  },
  eyebrow: {
    color: COLORS.GLOBAL.WHITE,
    marginTop: SPACING.SIZE_40,
  },
  specItem: {
    '&:nth-child(even)': {
      marginLeft: GAP_COLUMNS.S,
    },

    borderBottom: `1px solid ${COLORS.DARK.GRAY_80}`,
    display: 'inline-flex',
    flexDirection: 'column',
    marginTop: SPACING.SIZE_20,
    paddingBottom: SPACING.SIZE_10,
    width: `calc(50% - ${GAP_COLUMNS.S / 2}px)`,

    [MQ.M]: {
      width: `calc(50% - ${GAP_COLUMNS.M / 2}px)`,
    },

    [MQ.L]: {
      width: `calc(50% - ${GAP_COLUMNS.L / 2}px)`,
    },

    [MQ.XL]: {
      width: `calc(50% - ${GAP_COLUMNS.XL / 2}px)`,
    },
  },
  specItemLabel: {
    display: 'block',
  },
  specItemValue: {
    color: COLORS.GLOBAL.WHITE,
    display: 'block',
    marginTop: SPACING.SIZE_10,
  },
  title: [
    typography.jumboHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      marginTop: SPACING.SIZE_50,
      [MQ.L]: typographyStyles.primaryHeadline.XL,
    },
  ],
};
