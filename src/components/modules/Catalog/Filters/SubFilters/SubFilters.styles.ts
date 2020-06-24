import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
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
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    display: 'flex',
    [MQ.S]: {
      margin: `0 ${SPACING.SIZE_20}px`,
      padding: `${SPACING.SIZE_20}px 0`,
    },
    [MQ.M]: {
      margin: `0 ${SPACING.SIZE_40}px`,
      padding: `${SPACING.SIZE_30}px 0`,
    },
    [MQ.L]: {
      margin: `0 ${SPACING.SIZE_60}px`,
      padding: `${SPACING.SIZE_30}px 0`,
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
