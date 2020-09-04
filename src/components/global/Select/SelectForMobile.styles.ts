import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  TIME,
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
  activeSelect: {
    opacity: 1,
    transition: `opacity ${TIME.MS100}ms ease`,
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
      fontSize: '1.6rem',
      height: CONSTANTS.INPUT_HEIGHT,
      marginBottom: SPACING.SIZE_05,
      position: 'relative',
      transition: `background-color ${TIME.MS100}ms ease, border-color ${TIME.MS100}ms ease`,
    },
  ],
  icon: {
    pointerEvents: 'none',
    position: 'absolute',
    right: SPACING.SIZE_20,
    top: 'calc(50% - 4px)',
    [MQ.M]: {
      right: SPACING.SIZE_30,
    },
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
  placeholder: {
    color: COLORS.LIGHT.GRAY_20,
  },
  select: [
    typography.bodyCopy,
    {
      '&::after': {
        content: '""',
        height: '100%',
        left: 0,
        position: 'absolute',
        top: 0,
        width: '100%',
      },
      appearance: 'none',
      background: 'transparent',
      border: 'none',
      color: COLORS.GLOBAL.BLACK,
      mozAppearance: 'none',
      opacity: 0,
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_20}px ${CONSTANTS.INPUT_BOTTOM_PADDING}px`,
      transition: `opacity ${TIME.MS100}ms ease`,
      webkitAppearance: 'none',
      width: '100%',
    },
  ],
  title: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,
    },
  ],
  wrapper: {
    position: 'relative',
  },
};

export default styles;
