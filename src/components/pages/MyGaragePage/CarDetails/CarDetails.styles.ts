import { COLORS, RADIUS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  IMAGE_MAX_WIDTH: 100,
  IMAGE_MAX_HEIGHT: 150,
};

const styles: StylesMap = {
  car: {
    bottom: 0,
    display: 'flex',
    left: SPACING.SIZE_30,
    position: 'absolute',
  },
  carContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    padding: `0px ${SPACING.SIZE_30}px`,
    position: 'relative',
  },
  carTitle: [
    typography.labelCopy,
    {
      color: COLORS.GLOBAL.BLACK,
      textAlign: 'left',
    },
  ],
  closeIcon: {
    color: COLORS.LIGHT.GRAY_70,
    height: SPACING.SIZE_10,
    width: SPACING.SIZE_10,
  },
  closeIconContainer: {
    position: 'absolute',
    right: SPACING.SIZE_15,
    top: SPACING.SIZE_15,
  },
  header: {
    display: 'flex',
    padding: `0px ${SPACING.SIZE_30}px`,
    position: 'relative',
  },
  image: {
    marginLeft: SPACING.SIZE_30,
    maxHeight: CONSTANTS.IMAGE_MAX_HEIGHT,
    maxWidth: CONSTANTS.IMAGE_MAX_WIDTH,
  },
  mobileHeaderContainer: {
    paddingBottom: SPACING.SIZE_60,
  },
  rightIcon: {
    height: SPACING.SIZE_10,
    marginLeft: SPACING.SIZE_10,
    width: SPACING.SIZE_10,
  },
  searchTiresButton: {
    display: 'flex',
    justifyContent: 'center',
    margin: SPACING.SIZE_30,
    marginBottom: SPACING.SIZE_10,
    width: '25%',
  },
  searchTiresButtonForMobile: {
    display: 'flex',
    justifyContent: 'center',
    width: '80%',
  },
  seperator: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
    height: SPACING.SIZE_02,
    width: '100%',
  },
  shadowContainer: {
    borderRadius: RADIUS.RADIUS_15,
    boxShadow: `${SPACING.SIZE_10}px ${SPACING.SIZE_10}px ${SPACING.SIZE_30}px ${COLORS.LIGHT.GRAY_SHADE}`,
    marginBottom: SPACING.SIZE_30,
    padding: `${SPACING.SIZE_30}px 0px`,
    position: 'relative',
  },
  tireContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    padding: `${SPACING.SIZE_30}px`,
  },
  tireContainerMobile: {
    justifyContent: 'space-between',
  },
  tireDetails: [
    typography.smallCopy,
    {
      color: COLORS.GLOBAL.BLACK,
      paddingTop: SPACING.SIZE_10,
      textAlign: 'left',
    },
  ],
  tireQuantity: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingTop: SPACING.SIZE_10,
      textAlign: 'left',
    },
  ],
};

export default styles;
