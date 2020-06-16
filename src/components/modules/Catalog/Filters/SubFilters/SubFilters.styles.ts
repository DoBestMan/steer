import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  range: [
    typography.labelCopyTight,
    {
      flexGrow: 1,
    },
  ],
  rangeLabel: [
    typography.labelCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginRight: SPACING.SIZE_05,
    },
  ],
  rangePrefix: [
    typography.labelHeadline,
    {
      marginRight: SPACING.SIZE_05,
      [MQ.L]: {
        display: 'none',
      },
    },
  ],
  rangePrefixHide: {
    display: 'none',
  },
  results: [
    typography.labelHeadline,
    {
      alignItems: 'center',
      display: 'flex',
      [MQ.S]: {
        ':after': {
          content: '"•"',
          fontSize: 6,
          padding: SPACING.SIZE_10,
        },
      },
      [MQ.L]: {
        ':after': {
          content: '""',
          padding: 'unset',
        },
        flexGrow: 1,
      },
    },
  ],
  resultsNone: {
    display: 'none',
    [MQ.L]: {
      display: 'unset',
      visibility: 'hidden',
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
  sort: typography.labelCopy,
  sortLabel: [
    typography.labelCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginRight: SPACING.SIZE_05,
    },
  ],
};

export default styles;
