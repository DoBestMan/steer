import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  headerText: [
    typography.eyebrow,
    {
      color: COLORS.GLOBAL.BLACK,
      textAlign: 'left',
    },
  ],
  labelText: [
    typography.filterItemLabel,
    {
      color: COLORS.GLOBAL.BLACK,
      marginTop: SPACING.SIZE_30,
      textAlign: 'left',
      cursor: 'pointer',
    },
  ],
  modalContent: {
    [MQ.L]: {
      height: '100%',
    },
  },
};

export default styles;
