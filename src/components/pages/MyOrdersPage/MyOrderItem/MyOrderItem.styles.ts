import {
  COLORS,
  MQ,
  PRODUCT,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  CONTAINER_MAX_WIDTH: 350,
  IMAGE_MAX_HEIGHT: 150,
  IMAGE_MAX_WIDTH: 100,
  TIRE_INSTALLATION_ICON_SIZE: 30,
  TIRE_INSTALLATION_SIZE: 68,
};

const styles: StylesMap = {
  addressText: [
    typography.smallCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      textAlign: 'right',
    },
  ],
  appointmentContainer: {
    [MQ.S]: {
      margin: `${SPACING.SIZE_30}px ${SPACING.SIZE_20}px`,
      marginBottom: SPACING.SIZE_10,
    },
    [MQ.M]: {
      margin: `${SPACING.SIZE_30}px ${SPACING.SIZE_20}px`,
    },
    [MQ.L]: {
      margin: `${SPACING.SIZE_30}pxpx ${SPACING.SIZE_30}px`,
    },
    [MQ.XL]: {
      margin: `${SPACING.SIZE_30}pxpx ${SPACING.SIZE_30}px`,
    },
  },
  appointmentHeader: [
    typography.secondarySubhead,
    {
      paddingBottom: SPACING.SIZE_10,
      paddingTop: SPACING.SIZE_30,
      textAlign: 'left',
    },
  ],
  brandLabel: [
    typography.largeCopy,
    {
      [MQ.XL]: {
        fontSize: `${22 / 10}rem`,
      },
      display: 'block',
      fontWeight: 'bold',
      lineHeight: `${PRODUCT.BRAND_IMAGE_HEIGHT}px`,
    },
  ],
  cancelButton: {
    [MQ.S]: {
      width: '100%',
    },
    [MQ.L]: {
      width: '30%',
    },
    [MQ.XL]: {
      width: '30%',
    },
    display: 'flex',
    justifyContent: 'center',
    marginTop: SPACING.SIZE_30,
  },
  cancelContainer: {
    [MQ.L]: {
      justifyContent: 'center',
    },
    [MQ.XL]: {
      justifyContent: 'center',
    },
    alignItems: 'center',
    display: 'flex',
  },
  description: [
    typography.labelCopyTight,
    {
      color: COLORS.GLOBAL.BLACK,
      textAlign: 'left',
    },
  ],
  descriptionContainer: {
    alignItems: 'center',
    display: 'flex',
    paddingBottom: SPACING.SIZE_20,
    paddingTop: SPACING.SIZE_10,
  },
  detailsContainer: {
    marginTop: SPACING.SIZE_20,
  },
  image: {
    marginRight: SPACING.SIZE_30,
    maxHeight: CONSTANTS.IMAGE_MAX_HEIGHT,
    maxWidth: CONSTANTS.IMAGE_MAX_WIDTH,
  },
  imageContainer: {
    display: 'flex',
  },
  loaderContainer: {
    alignItems: 'center',
    display: 'flex',
    marginLeft: SPACING.SIZE_20,
    marginTop: SPACING.SIZE_25,
  },
  orderDetailsContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
  orderDetailsKey: {
    color: COLORS.LIGHT.GRAY_70,
    textAlign: 'left',
  },
  orderDetailsText: [
    typography.bodyCopyTight,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_10,
      textAlign: 'right',
    },
  ],
  orderDetailsWithoutMultiLine: {
    paddingBottom: SPACING.SIZE_10,
  },
  orderStatusAlign: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  orderStatusContainer: {
    backgroundColor: COLORS.GLOBAL.BLACK,
    borderRadius: RADIUS.RADIUS_8,
    display: 'inline-block',
    marginBottom: SPACING.SIZE_20,
    overflow: 'hidden',
    padding: `${SPACING.SIZE_05}px ${SPACING.SIZE_10}px`,
  },
  orderStatusDeliveryIcon: {
    height: SPACING.SIZE_15,
    width: SPACING.SIZE_15,
  },
  orderStatusIcon: {
    color: COLORS.GLOBAL.WHITE,
    height: SPACING.SIZE_05,
    marginLeft: SPACING.SIZE_10,
    width: SPACING.SIZE_05,
  },
  orderStatusNewOrder: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
  },
  orderStatusText: [
    typography.secondarySubhead,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
  orderStatusTopRight: {
    position: 'absolute',
    right: SPACING.SIZE_30,
  },
  orderStatusWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceText: [
    typography.bodyCopyTight,
    {
      color: COLORS.GLOBAL.BLACK,
      textAlign: 'right',
    },
  ],
  rightIcon: {
    height: SPACING.SIZE_10,
    marginLeft: SPACING.SIZE_10,
    width: SPACING.SIZE_10,
  },
  sectionContainer: {
    [MQ.S]: {
      padding: `0px ${SPACING.SIZE_20}px`,
    },
    [MQ.M]: {
      padding: `0px ${SPACING.SIZE_20}px`,
    },
    [MQ.L]: {
      padding: `0px ${SPACING.SIZE_30}px`,
    },
    [MQ.XL]: {
      padding: `0px ${SPACING.SIZE_30}px`,
    },
  },
  seperator: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
    height: SPACING.SIZE_01,
    marginTop: SPACING.SIZE_20,
    width: '100%',
  },
  shadowContainer: {
    alignSelf: 'center',
    borderRadius: RADIUS.RADIUS_15,
    boxShadow: `${SPACING.SIZE_10}px ${SPACING.SIZE_10}px ${SPACING.SIZE_30}px ${COLORS.LIGHT.GRAY_SHADE}`,
    display: 'inline-block',
    flex: 1,
    flexDirection: 'column',
    margin: SPACING.SIZE_20,
    padding: `${SPACING.SIZE_30}px 0px`,
    position: 'relative',
    [MQ.S]: {
      width: '100%',
    },
    [MQ.M]: {
      width: '100%',
    },
    [MQ.L]: {
      width: '80%',
    },
    [MQ.XL]: {
      width: '70%',
    },
  },
  tireContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: SPACING.SIZE_30,
  },
  tireDetailContainer: {
    marginBottom: SPACING.SIZE_10,
    marginTop: SPACING.SIZE_30,
    [MQ.S]: {
      marginRight: 0,
      marginLeft: 0,
    },
    [MQ.M]: {
      marginRight: 0,
      marginLeft: 0,
    },
    [MQ.L]: {
      marginRight: SPACING.SIZE_10,
      marginLeft: SPACING.SIZE_10,
    },
    [MQ.XL]: {
      marginRight: SPACING.SIZE_10,
      marginLeft: SPACING.SIZE_10,
    },
  },
  tireHeader: [
    typography.secondarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingBottom: SPACING.SIZE_05,
      textAlign: 'left',
    },
  ],
  tireInstallation: {
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },
  tireQuantity: [
    typography.secondarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingBottom: SPACING.SIZE_05,
      textAlign: 'left',
    },
  ],
  title: [
    typography.secondaryHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
      textAlign: 'left',
    },
  ],
  toastContainer: {
    alignSelf: 'center',
    [MQ.S]: {
      width: '100%',
    },
    [MQ.M]: {
      width: '100%',
    },
    [MQ.L]: {
      width: '80%',
    },
    [MQ.XL]: {
      width: '70%',
    },
  },
  toastMessage: [
    typography.bodyCopy,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
};

export default styles;
