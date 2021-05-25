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
  buttonWrapper: {
    textAlign: 'right',
  },
  chevron: {
    marginLeft: 'auto',
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT.GRAY_70,
    color: COLORS.GLOBAL.WHITE,
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
      backgroundColor: COLORS.LIGHT.GRAY_70,
      color: COLORS.GLOBAL.WHITE,
      paddingLeft: SPACING.SIZE_40,
      paddingRight: SPACING.SIZE_40,
    },
  },
  copyCodeButton: [
    typography.secondarySubhead,
    {
      border: 'none',
      height: 30,
      marginRight: SPACING.SIZE_10,
      marginTop: SPACING.SIZE_05,
      paddingLeft: SPACING.SIZE_15,
      paddingRight: SPACING.SIZE_15,
      [MQ.M]: {
        marginRight: 0,
      },
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
      paddingLeft: SPACING.SIZE_10,
      paddingRight: SPACING.SIZE_05,
      whiteSpace: 'pre-line',
      [MQ.M]: {
        paddingLeft: SPACING.SIZE_25,
        paddingRight: SPACING.SIZE_25,
      },
    },
  ],
};

export default styles;
