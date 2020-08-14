import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
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
  container: {
    '&:hover': {
      backgroundColor: COLORS.LIGHT.GRAY_20,
    },
    alignItems: 'flex-end',
    backgroundColor: COLORS.LIGHT.GRAY_10,
    border: BORDERS.SOLID_TRANSPARENT_2PX,
    borderRadius: RADIUS.RADIUS_15,
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    // To avoid scaling on input focus on iOS devices, set font-size to 16px.
    fontSize: '1.6rem',
    height: CONSTANTS.INPUT_HEIGHT,
    position: 'relative',
    transition: `background-color ${TIME.MS100}ms ease, border-color ${TIME.MS100}ms ease`,
  },
  disabled: {
    '&:hover': {
      backgroundColor: COLORS.LIGHT.GRAY_10,
    },
    color: COLORS.LIGHT.GRAY_20,
  },
  input: [
    disableGlobalFocus,
    {
      '&::placeholder': {
        // label placeholder hidden until focused
        color: COLORS.LIGHT.GRAY_70,
        opacity: 0,
        transition: `opacity ${TIME.MS100}ms ease`,
      },
      ':focus::placeholder': {
        // actual placeholder displayed on focus
        opacity: 1,
        transition: `opacity ${TIME.MS100}ms ease`,
      },
      backgroundColor: 'transparent',
      border: 0,
      color: COLORS.GLOBAL.BLACK,
      height: '100%',
      overflow: 'hidden',
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_20}px ${CONSTANTS.INPUT_BOTTOM_PADDING}px`,
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      width: '100%',
    },
  ],
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
};

export const textAreaStyles: StylesMap = {
  container: {
    height: CONSTANTS.TEXT_AREA_HEIGHT,
  },
  input: {
    height: `calc(100% - ${SPACING.SIZE_30}px - ${CONSTANTS.INPUT_BOTTOM_PADDING}px)`,
    margin: `${SPACING.SIZE_30}px ${SPACING.SIZE_20}px ${CONSTANTS.INPUT_BOTTOM_PADDING}px`,
    overflowY: 'auto',
    padding: '0',
    resize: 'none',
    whiteSpace: 'pre-wrap',
    width: `calc(100% - ${SPACING.SIZE_20 * 2}px)`,
    [MQ.M]: {
      padding: 0,
    },
  },
  label: {
    marginRight: 0,
    paddingTop: SPACING.SIZE_15,
    top: '17.5%', // proportional percent change when input height goes from 70 to 200
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
      paddingTop: SPACING.SIZE_05,
      position: 'absolute',
      transform: 'translate3D(0, 100%, 0)',
    },
  ],
};

export default styles;
