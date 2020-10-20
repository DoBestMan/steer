import {
  BORDERS,
  COLORS,
  RADIUS,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const LABEL_SIZE_DEFAULT = 15;
const LABEL_SIZE_FOCUSED = 12;

const CONSTANTS = {
  INPUT_BOTTOM_PADDING: 16,
  INPUT_HEIGHT: 70,
  LABEL_SCALE_TRANSFORM: LABEL_SIZE_FOCUSED / LABEL_SIZE_DEFAULT,
  LABEL_WIDTH_TRANSFORM: LABEL_SIZE_DEFAULT / LABEL_SIZE_FOCUSED,
  TEXT_AREA_HEIGHT: 200,
};

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
    paddingRight: SPACING.SIZE_20,
    width: '100%',
  },
  disabled: {
    pointerEvents: 'none',
    '&:hover': {
      backgroundColor: COLORS.LIGHT.GRAY_10,
    },
    color: COLORS.LIGHT.GRAY_20,
  },
  dropdown: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    border: BORDERS.SOLID_GRAY_10_1PX,
    borderRadius: SPACING.SIZE_15,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
    maxHeight: 270,
    overflowY: 'scroll',
    padding: SPACING.SIZE_30,
    position: 'absolute',
    transform: `translateY(${SPACING.SIZE_80}px)`,
    width: '100%',
    zIndex: Z_INDEX.TOP,
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
      fontSize: '1.6rem',
      height: CONSTANTS.INPUT_HEIGHT,
      justifyContent: 'space-between',
      marginBottom: SPACING.SIZE_05,
      position: 'relative',
      transition: `background-color ${TIME.MS100}ms ease, border-color ${TIME.MS100}ms ease`,
    },
  ],
  input: [
    typography.bodyCopy,
    {
      backgroundColor: 'transparent',
      boxSizing: 'border-box',
      color: COLORS.GLOBAL.BLACK,
      height: '100%',
      opacity: 0,
      overflow: 'hidden',
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_20}px ${CONSTANTS.INPUT_BOTTOM_PADDING}px`,
      textOverflow: 'ellipsis',
      transition: `opacity ${TIME.MS100}ms ease`,
      width: '100%',
    },
  ],
  inputActive: {
    opacity: 1,
    transition: `opacity ${TIME.MS100}ms ease`,
  },
  label: {
    left: SPACING.SIZE_20,
    marginRight: SPACING.SIZE_20,
    maxWidth: `calc(100% - (${SPACING.SIZE_20}px + ${SPACING.SIZE_20}px))`,
    overflow: 'hidden',
    position: 'absolute',
    textOverflow: 'ellipsis',
    top: '50%',
    transform: 'translateY(-50%)',
    transformOrigin: 0,
    transition: `color ${TIME.MS100}ms ease, transform ${TIME.MS100}ms ease`,
    whiteSpace: 'nowrap',
  },
  listbox: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  selectWrapper: {
    display: 'none',
  },
  visuallyHidden: {
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
  label: {
    display: 'block',
    pointerEvents: 'none',
    textOverflow: 'ellipsis',
    transform: `scale3d(${CONSTANTS.LABEL_SCALE_TRANSFORM}, ${CONSTANTS.LABEL_SCALE_TRANSFORM}, ${CONSTANTS.LABEL_SCALE_TRANSFORM}) translateY(-125%)`,
    whiteSpace: 'nowrap',
    width: `calc((100% * ${CONSTANTS.LABEL_WIDTH_TRANSFORM}) - ${CONSTANTS.INPUT_HEIGHT}px)`,
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
      position: 'absolute',
      transform: 'translate3D(0, 100%, 0)',
    },
  ],
};

export default styles;
