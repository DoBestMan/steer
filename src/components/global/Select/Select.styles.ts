import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: {
    '&::after': {
      content: '""',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  disabled: {
    '&:hover': {
      backgroundColor: COLORS.LIGHT.GRAY_10,
    },
    color: COLORS.LIGHT.GRAY_20,
  },
  header: [
    {
      '&:hover': {
        backgroundColor: COLORS.LIGHT.GRAY_20,
      },
      backgroundColor: COLORS.LIGHT.GRAY_10,
      border: BORDERS.SOLID_TRANSPARENT_2PX,
      borderRadius: RADIUS.RADIUS_15,
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: SPACING.SIZE_05,
      padding: SPACING.SIZE_20,
      position: 'relative',
      [MQ.M]: {
        padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_30}px`,
      },
    },
  ],
  input: [
    typography.bodyCopy,
    {
      backgroundColor: 'transparent',
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  listbox: {
    display: 'flex',
    flexDirection: 'column',
  },
  selectWrapper: {
    display: 'none',
  },
};

export const focusStyles: StylesMap = {
  container: {
    borderColor: COLORS.GLOBAL.ORANGE,
    ':hover': {
      backgroundColor: COLORS.LIGHT.GRAY_10,
    },
  },
  input: {
    '&::placeholder': {
      opacity: 0.5,
    },
  },
};

export const errorStyles: StylesMap = {
  container: {
    backgroundColor: COLORS.LIGHT.RED_05,
    borderColor: COLORS.GLOBAL.RED,
  },
  errorMessage: [
    typography.smallCopyTight,
    {
      bottom: 0,
      color: COLORS.GLOBAL.RED,
      left: 0,
      paddingTop: SPACING.SIZE_05,
      position: 'absolute',
      transform: 'translate3D(0, 100%, 0)',
    },
  ],
};

export default styles;
