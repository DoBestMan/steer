import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  TIRE_INSTALLATION_ICON_SIZE: 30,
  TIRE_INSTALLATION_SIZE: 68,
};
const styles: StylesMap = {
  addressText: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  addressTextContainer: {
    alignItems: 'center',
    display: 'grid',
  },
  appointmentNote: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_LIGHT_SOLID,
      paddingTop: SPACING.SIZE_30,
    },
  ],
  appointmentPadding: {
    paddingBottom: SPACING.SIZE_40,
  },
  installerIconContainer: {
    [MQ.L]: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      left: 400,
      position: 'absolute',
    },
    [MQ.XL]: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      left: 600,
      position: 'absolute',
    },
    marginBottom: SPACING.SIZE_10,
  },
  orderDate: {
    paddingBottom: SPACING.SIZE_15,
  },
  orderDetailsText: [
    typography.smallCopyTight,
    {
      [MQ.S]: {
        marginBottom: SPACING.SIZE_30,
        textAlign: 'left',
      },
      [MQ.M]: {
        marginBottom: SPACING.SIZE_30,
        textAlign: 'left',
      },
      color: COLORS.LIGHT.GRAY_70,
      marginTop: SPACING.SIZE_05,
      textAlign: 'center',
    },
  ],
  orderSubHeader: [
    typography.eyebrow,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingBottom: SPACING.SIZE_30,
    },
  ],
  sectionHeader: [
    typography.tertiaryHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
    },
  ],
  seperator: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    marginBottom: SPACING.SIZE_30,
  },
  shippingContainer: {
    paddingBottom: SPACING.SIZE_40,
  },
  tireInstallationContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT.GRAY_20,
    borderRadius: RADIUS.CIRCLE,
    display: 'flex',
    height: CONSTANTS.TIRE_INSTALLATION_SIZE,
    justifyContent: 'center',
    width: CONSTANTS.TIRE_INSTALLATION_SIZE,
  },
  tireInstallationIcon: {
    svg: {
      display: 'block',
      height: CONSTANTS.TIRE_INSTALLATION_ICON_SIZE,
      width: CONSTANTS.TIRE_INSTALLATION_ICON_SIZE,
    },
  },
  wrapper: {
    paddingLeft: SPACING.SIZE_05,
  },
};
export default styles;
