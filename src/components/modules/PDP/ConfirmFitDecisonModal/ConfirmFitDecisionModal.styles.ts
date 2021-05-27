import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  detailsContainer: {
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    marginTop: SPACING.SIZE_30,
  },
  labelText: [
    typography.filterItemLabel,
    {
      '&:hover:not(:active), &:focus:not(:active)': {
        borderColor: COLORS.GLOBAL.BLACK,
        color: COLORS.GLOBAL.BLACK,
      },
      color: COLORS.GLOBAL.BLACK,
      cursor: 'pointer',
      marginTop: SPACING.SIZE_20,
      textAlign: 'left',
    },
  ],
  modalContent: {
    [MQ.L]: {
      height: '100%',
    },
  },
};

export default styles;
