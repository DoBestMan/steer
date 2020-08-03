import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: typography.labelCopy,
  disableEvents: {
    pointerEvents: 'none',
  },
  results: [
    typography.labelHeadline,
    {
      flexGrow: 1,
      alignItems: 'center',
      display: 'flex',
    },
  ],
  root: {
    alignItems: 'baseline',
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_20}px 0`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px 0`,
    },
  },
  sort: {
    display: 'flex',
  },
  sortLabel: [
    typography.labelCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginRight: SPACING.SIZE_05,
    },
  ],
};

export default styles;
