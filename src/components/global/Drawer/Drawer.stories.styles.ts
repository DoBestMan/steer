import { COLORS, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  container: {
    alignContent: 'center',
    background: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    justifyContent: 'center',
    padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_60}px`,
  },
  content: {
    fontSize: SPACING.SIZE_20,
    color: COLORS.GLOBAL.WHITE,
  },
  drawer: {
    alignContent: 'center',
    background: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    fontSize: SPACING.SIZE_30,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flex: '1 1 auto',
    height: '100vh',
    justifyContent: 'center',
  },
  side: {
    height: '100%',
  },
};

export default styles;
