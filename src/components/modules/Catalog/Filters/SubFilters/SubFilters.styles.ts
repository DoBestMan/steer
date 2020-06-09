import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  range: {
    [MQ.S]: [
      typography.smallCopyTight,
      {
        flexGrow: 1,
      },
    ],
    [MQ.M]: typography.bodyCopy,
  },
  rangeLabel: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginRight: SPACING.SIZE_05,
    },
  ],
  results: {
    alignItems: 'center',
    display: 'flex',
    [MQ.S]: [
      typography.secondarySubhead,
      {
        ':after': {
          content: '"•"',
          fontSize: 6,
          padding: SPACING.SIZE_10,
        },
      },
    ],
    [MQ.M]: typography.tertiaryHeadline,
    [MQ.L]: {
      ':after': {
        content: '""',
        padding: 'unset',
      },
      flexGrow: 1,
    },
  },
  root: {
    alignItems: 'baseline',
    background: COLORS.GLOBAL.WHITE,
    display: 'flex',
    [MQ.S]: {
      padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_20}px`,
    },
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_60}px`,
    },
  },
  slider: {
    marginRight: SPACING.SIZE_40,
    width: 200,
  },
  smallHide: {
    [MQ.S]: {
      display: 'none',
    },
    [MQ.L]: {
      display: 'initial',
    },
  },
  smallShow: {
    [MQ.L]: {
      display: 'none',
    },
  },
  sort: {
    [MQ.S]: typography.smallCopyTight,
    [MQ.M]: typography.bodyCopy,
  },
  sortLabel: {
    color: COLORS.LIGHT.GRAY_70,
    marginRight: SPACING.SIZE_05,
    [MQ.S]: typography.smallCopy,
    [MQ.M]: typography.bodyCopyTight,
  },
};

export default styles;
