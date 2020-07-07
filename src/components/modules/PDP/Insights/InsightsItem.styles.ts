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

    // eslint-disable-next-line sort-keys
    ':hover, :focus': {
      backgroundColor: COLORS.ORANGE.SHADE_30_SOLID,
    },
  },
  containerAction: {
    cursor: 'pointer',
  },
  containerHighlight: {
    backgroundColor: COLORS.ORANGE.SHADE_15_SOLID,
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
  icon: {
    alignItems: 'center',
    display: 'flex',
    height: 24,
    justifyContent: 'center',
    width: 26,

    // eslint-disable-next-line sort-keys
    span: {
      height: 20,
      width: 26,
    },

    svg: {
      height: 'auto',
      maxHeight: '100%',
      width: '100%',
    },
  },
  label: [
    typography.primarySubhead,
    {
      flexGrow: 1,
      paddingLeft: SPACING.SIZE_25,
      paddingRight: SPACING.SIZE_25,
      whiteSpace: 'pre-line',
    },
  ],
  modalButton: [
    typography.filterItemLabel,
    {
      padding: `${SPACING.SIZE_10}px 0`,
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
