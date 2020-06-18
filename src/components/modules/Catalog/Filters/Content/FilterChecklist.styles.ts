import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  checkboxLabel: {
    flexGrow: 1,
    marginRight: SPACING.SIZE_10,
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    ':not(:last-of-type)': { marginBottom: SPACING.SIZE_15 },
  },
  containerLabel: {
    alignItems: 'center',
    display: 'flex',
  },
  count: [
    typography.smallCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingTop: SPACING.SIZE_02,
    },
  ],
  description: [typography.smallCopyTight, { color: COLORS.LIGHT.GRAY_70 }],
  flair: [
    typography.smallCopyTight,
    {
      ':before': {
        color: COLORS.GLOBAL.BLACK,
        padding: `0 ${SPACING.SIZE_05}px`,
        content: '"•"',
        fontSize: 8,
      },
      color: COLORS.GLOBAL.ORANGE,
    },
  ],
  group: {
    marginBottom: SPACING.SIZE_40,
  },
  groupTitle: [
    typography.eyebrow,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_15,
    },
  ],
  label: [
    typography.filterItemLabel,
    {
      marginRight: SPACING.SIZE_05,
    },
  ],
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_40,
    [MQ.L]: { display: 'none' },
  },
  root: {
    minWidth: 200,
  },
  title: typography.eyebrow,
  tooltip: [
    typography.smallCopyTight,
    {
      borderBottom: BORDERS.DOTTED_GRAY_40_2PX,
      borderColor: COLORS.LIGHT.GRAY_70,
      color: COLORS.LIGHT.GRAY_70,
      cursor: 'pointer',
      marginRight: SPACING.SIZE_30,
      width: 'fit-content',
      [MQ.L]: {
        marginRight: 0,
      },
    },
  ],
};

export default styles;
