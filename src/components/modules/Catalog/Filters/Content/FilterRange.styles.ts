import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
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
  infoLink: [
    typography.smallCopyTight,
    {
      borderBottom: BORDERS.DOTTED_GRAY_40_2PX,
      borderColor: COLORS.LIGHT.GRAY_70,
      color: COLORS.LIGHT.GRAY_70,
      cursor: 'pointer',
      marginRight: SPACING.SIZE_30,
      width: 'fit-content',
    },
  ],
  root: {
    [MQ.L]: { minWidth: 400 },
  },
  title: typography.eyebrow,
};

export default styles;
