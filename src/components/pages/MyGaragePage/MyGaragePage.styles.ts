import { COLORS, MQ, RADIUS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  ROOT_MAX_WIDTH: 750,
};

const styles: StylesMap = {
  bulletPoint: {
    backgroundColor: COLORS.LIGHT.GRAY_70,
    borderRadius: RADIUS.RADIUS_5,
    height: SPACING.SIZE_10,
    width: SPACING.SIZE_10,
  },
  bulletPointContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: SPACING.SIZE_10 - 2,
    width: '5%',
  },
  bulletText: {
    display: 'flex',
    width: '95%',
  },
  container: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    flexDirection: 'column',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: SPACING.SIZE_30,
  },
  noCarsContainer: {
    paddingBottom: SPACING.SIZE_30,
  },
  noCarsDescContianer: {
    alignSelf: 'center',
    display: 'flex',
  },
  noCarsDescription: [
    typography.largeCopy,
    {
      '> a': [
        typography.largeCopy,
        {
          display: 'inline-flex',
        },
      ],
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  orderStatusAlign: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  root: {
    justifyContent: 'center',
    margin: '0 auto',
    maxWidth: CONSTANTS.ROOT_MAX_WIDTH,
    paddingBottom: SPACING.SIZE_50,
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_100,
    },
  },
  searchVehicleButton: {
    alignSelf: 'center',
  },
  searchVehicleContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    marginTop: SPACING.SIZE_30,
  },
  toastMessage: [
    typography.bodyCopy,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
};

export default styles;
