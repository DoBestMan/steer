import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
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
  },
  findMyTireSizeLabel: typography.smallCopyTight,
  header: {
    paddingBottom: SPACING.SIZE_15,
    marginRight: SPACING.SIZE_40,

    [MQ.L]: {
      marginRight: 0,
    },
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
    marginBottom: SPACING.SIZE_10,
  },
  root: {
    minWidth: 200,
  },
  title: [
    typography.eyebrow,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  titleRadio: {
    padding: 7,
  },
};

export default styles;
