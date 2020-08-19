import { BORDERS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    paddingBottom: SPACING.SIZE_20,
    [MQ.M]: {
      paddingBottom: 0,
    },
  },
  eyebrow: [
    typography.eyebrow,
    {
      [MQ.L]: [
        typography.secondaryHeadline,
        {
          display: 'block',
          textTransform: 'none',
          marginTop: SPACING.SIZE_50,
        },
      ],
    },
  ],
  modalButton: [
    typography.filterItemLabel,
    {
      marginBottom: SPACING.SIZE_10,
      paddingTop: SPACING.SIZE_10,
      textAlign: 'left',
    },
  ],
  modalDivider: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    display: 'block',
    marginBottom: SPACING.SIZE_20,
    paddingTop: SPACING.SIZE_30,
  },
  modalListItem: typography.filterItemLabel,
  modalWithEyebrow: {
    [MQ.L]: {
      paddingTop: SPACING.SIZE_10,
    },
  },
};

export default styles;
