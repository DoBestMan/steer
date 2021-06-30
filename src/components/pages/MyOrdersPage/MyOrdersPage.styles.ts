import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  button: {
    [MQ.S]: {
      width: '100%',
    },
    [MQ.M]: {
      width: '50%',
    },
    [MQ.L]: {
      width: '30%',
    },
    [MQ.XL]: {
      width: '30%',
    },
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: `${SPACING.SIZE_30}px 0`,
  },
  columnContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    flexDirection: 'column',
  },
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: SPACING.SIZE_50,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
};

export default styles;
