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
  group: {
    marginBottom: SPACING.SIZE_40,
  },
  groupTitle: [
    typography.eyebrow,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  header: {
    marginBottom: SPACING.SIZE_40,
    [MQ.L]: { display: 'none' },
  },
  infoLink: [
    typography.smallCopyTight,
    {
      borderBottom: BORDERS.DOTTED_GRAY_40_2PX,
      borderColor: COLORS.LIGHT.GRAY_70,
      color: COLORS.LIGHT.GRAY_70,
      cursor: 'pointer',
      width: 'fit-content',
    },
  ],
  infoLinkTitle: {
    marginRight: SPACING.SIZE_30,
  },
  label: [
    typography.filterItemLabel,
    {
      marginRight: SPACING.SIZE_05,
    },
  ],
  labelContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_15,
  },
  root: {
    minWidth: 200,
  },
  title: typography.eyebrow,
};

export default styles;
