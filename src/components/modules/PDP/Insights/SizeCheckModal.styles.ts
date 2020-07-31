import {
  BORDERS,
  COLORS,
  EASING,
  GAP_COLUMNS,
  MQ,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    paddingBottom: SPACING.SIZE_30,
    paddingLeft: GAP_COLUMNS.S,
    paddingRight: GAP_COLUMNS.S,
    paddingTop: SPACING.SIZE_30,
    position: 'relative',
    transition: `background-color ${TIME.MS100}ms ${EASING.QUAD_EASE_OUT}`,

    [MQ.M]: {
      paddingLeft: GAP_COLUMNS.M,
      paddingRight: GAP_COLUMNS.M,
    },

    [MQ.L]: {
      paddingLeft: SPACING.SIZE_40,
      paddingRight: SPACING.SIZE_40,
    },
  },
  eyebrow: [
    typography.eyebrow,

    {
      [MQ.L]: [
        typography.secondaryHeadline,
        {
          display: 'block',
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
  modalListItem: [typography.filterItemLabel],
  modalWithEyebrow: {
    [MQ.L]: {
      paddingTop: SPACING.SIZE_10,
    },
  },
};

export default styles;
