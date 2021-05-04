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
  chevron: {
    marginLeft: 'auto',
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.WHITE,
    color: COLORS.GLOBAL.BLACK,
    display: 'flex',
    paddingBottom: SPACING.SIZE_25,
    paddingLeft: GAP_COLUMNS.S,
    paddingRight: GAP_COLUMNS.S,
    paddingTop: SPACING.SIZE_25,
    position: 'relative',
    transition: `background-color ${TIME.MS100}ms ${EASING.QUAD_EASE_OUT}`,

    [MQ.M]: {
      paddingLeft: GAP_COLUMNS.M,
      paddingRight: GAP_COLUMNS.M,
    },

    [MQ.L]: {
      backgroundColor: COLORS.LIGHT.GRAY_10,
      color: COLORS.GLOBAL.BLACK,
      paddingLeft: 38,
      paddingRight: SPACING.SIZE_40,
    },
  },
  containerAction: {
    cursor: 'pointer',

    // eslint-disable-next-line sort-keys
    ':hover, :focus': {
      backgroundColor: COLORS.LIGHT.GRAY_20,
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
  vehicleIcon: {
    alignItems: 'center',
    display: 'flex',
    height: 'auto',
    justifyContent: 'center',
    width: 30,
  },
};

export default styles;
