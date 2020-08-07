import {
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
    paddingBottom: SPACING.SIZE_25,
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
  containerAction: {
    cursor: 'pointer',

    // eslint-disable-next-line sort-keys
    ':hover, :focus': {
      backgroundColor: COLORS.ORANGE.SHADE_30_SOLID,
    },
  },
  containerHighlight: {
    backgroundColor: COLORS.ORANGE.SHADE_15_SOLID,
  },
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
};

export default styles;
