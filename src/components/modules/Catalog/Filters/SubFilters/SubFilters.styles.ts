import {
  BORDERS,
  COLORS,
  MQ,
  SPACING,
  StylesMap,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const TOPS = {
  S: 110,
  M: 144,
};

const styles: StylesMap = {
  decorator: {
    ':after': {
      content: '"•"',
      fontSize: 6,
      padding: SPACING.SIZE_10,
    },
    [MQ.L]: {
      ':after': {
        content: '""',
        padding: 'unset',
      },
    },
  },
  disableEvents: {
    pointerEvents: 'none',
  },
  label: [
    typography.labelHeadline,
    {
      fontWeight: 'normal',
      color: COLORS.LIGHT.GRAY_70,
      marginRight: SPACING.SIZE_15,
    },
  ],
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
      flexGrow: 1,
    },
  ],
  root: {
    alignItems: 'baseline',
    background: COLORS.GLOBAL.WHITE,
    position: 'sticky',
    top: TOPS.S,
    zIndex: Z_INDEX.BETWEEN_ZERO_TOP,
    [MQ.M]: {
      top: TOPS.M,
    },
    [MQ.L]: {},
  },
  slider: {
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
  sortBy: {
    display: 'flex',
    marginLeft: SPACING.SIZE_20,
    [MQ.M]: {
      marginLeft: SPACING.SIZE_40,
    },
  },
  sortLabel: [
    typography.labelCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginRight: SPACING.SIZE_05,
    },
  ],
  toggle: {
    alignItems: 'center',
    display: 'flex',
  },
  wrapper: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    display: 'flex',
    padding: SPACING.SIZE_20,
    [MQ.M]: {
      margin: `0px ${SPACING.SIZE_40}px`,
      padding: `${SPACING.SIZE_30}px 0px`,
    },
    [MQ.L]: {
      margin: `0px ${SPACING.SIZE_60}px`,
      padding: `${SPACING.SIZE_30}px 0px`,
    },
  },
};

export default styles;
