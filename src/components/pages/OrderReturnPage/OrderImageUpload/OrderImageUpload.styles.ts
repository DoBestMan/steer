import {
  COLORS,
  GAP_COLUMNS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  BORDER_SIZE: 2,
  BROWSE_BUTTON_SIZE: 50,
  CLOSE_ICON_SIZE: 8,
  DELETE_BUTTON_POSITION_MOBILE: 10,
  DELETE_BUTTON_POSITION_RIGHT_WEB: -75,
  DELETE_BUTTON_POSITION_TOP_WEB: 5,
  DELETE_BUTTON_SIZE: 20,
  MIN_IMAGE_SIZE: 80,
};

const styles: StylesMap = {
  browseButton: [
    typography.primarySubhead,
    {
      '&:hover': {
        borderColor: COLORS.LIGHT.GRAY_70,
      },
      alignItems: 'center',
      borderColor: COLORS.LIGHT.GRAY_20,
      borderRadius: RADIUS.RADIUS_25,
      borderStyle: 'solid',
      borderWidth: CONSTANTS.BORDER_SIZE,
      boxSizing: 'border-box',
      color: COLORS.GLOBAL.BLACK,
      display: 'inline-flex',
      height: CONSTANTS.BROWSE_BUTTON_SIZE,
      padding: `0 ${SPACING.SIZE_25}px`,
      transition: `all ${TIME.MS100}ms ease`,
      width: 'auto',
    },
  ],
  closeIcon: {
    svg: {
      display: 'block',
      height: CONSTANTS.CLOSE_ICON_SIZE,
      padding: SPACING.SIZE_05,
      paddingTop: SPACING.SIZE_05 + 1,
    },
  },
  commentGridContainer: {
    paddingTop: SPACING.SIZE_40,
  },
  commentsHeader: [
    typography.tertiaryHeadline,
    {
      padding: `${SPACING.SIZE_20}px 0`,
    },
  ],
  deleteFloatButton: [
    typography.bodyCopyTight,
    {
      [MQ.S]: {
        right: CONSTANTS.DELETE_BUTTON_POSITION_MOBILE,
        top: CONSTANTS.DELETE_BUTTON_POSITION_MOBILE,
      },
      [MQ.M]: {
        right: CONSTANTS.DELETE_BUTTON_POSITION_RIGHT_WEB,
        top: CONSTANTS.DELETE_BUTTON_POSITION_TOP_WEB,
      },
      [MQ.L]: {
        right: CONSTANTS.DELETE_BUTTON_POSITION_RIGHT_WEB,
        top: CONSTANTS.DELETE_BUTTON_POSITION_TOP_WEB,
      },
      [MQ.XL]: {
        right: CONSTANTS.DELETE_BUTTON_POSITION_RIGHT_WEB,
        top: CONSTANTS.DELETE_BUTTON_POSITION_TOP_WEB,
      },
      alignItems: 'flex-start',
      backgroundColor: COLORS.GLOBAL.WHITE,
      borderColor: COLORS.LIGHT.GRAY_20,
      borderRadius: RADIUS.RADIUS_25,
      borderWidth: CONSTANTS.BORDER_SIZE,
      color: COLORS.GLOBAL.BLACK,
      display: 'inline-flex',
      height: CONSTANTS.DELETE_BUTTON_SIZE,
      justifyContent: 'center',
      position: 'absolute',
      transition: `all ${TIME.MS100}ms ease`,
      width: CONSTANTS.DELETE_BUTTON_SIZE,
      zIndex: 2,
    },
  ],
  disabledBrowseButton: {
    '&:hover': {
      borderColor: COLORS.LIGHT.GRAY_20,
    },
    opacity: 0.4,
  },
  image: {
    borderColor: COLORS.LIGHT.GRAY_20,
    borderRadius: RADIUS.RADIUS_5,
    borderStyle: 'solid',
    borderWidth: CONSTANTS.BORDER_SIZE,
    minHeight: CONSTANTS.MIN_IMAGE_SIZE,
    minWidth: CONSTANTS.MIN_IMAGE_SIZE,
  },
  imageGridContainer: {
    direction: 'rtl',
  },
  imageWrapper: {
    alignItems: 'center',
    display: 'grid',
    gridColumnGap: GAP_COLUMNS.M,
    gridTemplateColumns: 'repeat(5, 1fr)',
  },
  imageWrapperMobile: {
    alignItems: 'center',
    display: 'grid',
    gridColumnGap: 0,
    gridRowGap: GAP_COLUMNS.S,
    gridTemplateColumns: 'repeat(2, 1fr)',
    paddingTop: SPACING.SIZE_10,
  },
  listWrapper: {
    marginRight: SPACING.SIZE_50,
  },
  sectionHeader: [
    typography.tertiaryHeadline,
    {
      paddingBottom: SPACING.SIZE_20,
    },
  ],
};
export default styles;
