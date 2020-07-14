import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_40,
    [MQ.L]: {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_15,
    },
  },
  root: {
    [MQ.L]: { minWidth: 400 },
  },
  title: typography.eyebrow,
};

export default styles;
