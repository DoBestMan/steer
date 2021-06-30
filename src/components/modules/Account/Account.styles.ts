import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

const CONSTANTS = {
  ROOT_MAX_WIDTH: 600,
};

const styles: StylesMap = {
  container: {
    backgroundColor: COLORS.GLOBAL.WHITE,
  },
  gridContainer: {
    padding: `${SPACING.SIZE_20}px 0px`,
  },
  loaderContainer: {
    alignItems: 'center',
    alignSelf: 'center',
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
  },
  logoutContainer: {
    marginLeft: SPACING.SIZE_20,
    marginTop: SPACING.SIZE_20,
  },
  notificationContainer: {
    backgroundColor: COLORS.GLOBAL.BLACK,
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 100,
    width: '100%',
  },
  root: {
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_100,
    },
    margin: '0 auto',
    maxWidth: CONSTANTS.ROOT_MAX_WIDTH,
    paddingBottom: SPACING.SIZE_50,
  },
};

export default styles;
