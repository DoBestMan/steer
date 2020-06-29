import {
  BORDERS,
  COLORS,
  EASING,
  RADIUS,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    border: BORDERS.SOLID_GRAY_20_1PX,
    borderRadius: RADIUS.RADIUS_15,
    padding: SPACING.SIZE_01, // Accounts for the container's border width difference
  },
  containerChecked: {
    border: BORDERS.SOLID_ORANGE_2PX,
    padding: 0,
  },
  header: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
    },
  ],
  headerChecked: {
    color: COLORS.GLOBAL.ORANGE,
  },
  indicator: {
    alignItems: 'center',
    border: '2px solid currentColor',
    borderRadius: RADIUS.CIRCLE,
    color: COLORS.LIGHT.GRAY_20,
    display: 'inline-flex',
    height: 20,
    justifyContent: 'center',
    marginLeft: 'auto',
    transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
    width: 20,

    // eslint-disable-next-line sort-keys
    '&:after': {
      background: 'currentColor',
      borderRadius: RADIUS.CIRCLE,
      content: '""',
      display: 'block',
      height: 10,
      opacity: 0,
      transition: `opacity ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
      width: 10,
    },
  },
  indicatorChecked: {
    color: COLORS.GLOBAL.ORANGE,

    // eslint-disable-next-line sort-keys
    '&:after': {
      opacity: 1,
    },
  },
  input: {
    appearance: 'none',
    opacity: 0,
    position: 'absolute',

    '&:focus': {
      '+ label': {
        outline: BORDERS.FOCUS_STATE,
      },
    },
  },
  label: {
    display: 'block',
    padding: SPACING.SIZE_25,
  },
  labelWithOuterContent: {
    paddingBottom: 0,
  },
  outerContent: {
    padding: `0 ${SPACING.SIZE_25}px ${SPACING.SIZE_25}px`,
  },
};

export default styles;
