import { COLORS, MQ, SPACING, StylesMap, TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  action: {
    alignItems: 'baseline',
    color: COLORS.GLOBAL.WHITE,
    marginBottom: SPACING.SIZE_10,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_15,
    },
  },
  back: {
    alignItems: 'center',
    marginLeft: -SPACING.SIZE_05,
    marginTop: -SPACING.SIZE_05,
    [MQ.L]: {
      position: 'absolute',
      right: SPACING.SIZE_60,
    },
  },
  decorator: {
    ':after': {
      content: '"•"',
      fontSize: 10,
      padding: `0 ${SPACING.SIZE_10}px`,
    },
    alignItems: 'center',
    display: 'flex',
  },
  filterLabel: [
    typography.labelCopyTight,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_15,
    },
  ],
  header: {
    marginBottom: SPACING.SIZE_40,
  },
  headerContainer: {
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
    zIndex: -1,
  },
  info: [
    typography.primarySubhead,
    {
      alignItems: 'baseline',
      display: 'flex',
    },
  ],
  label: [
    typography.labelHeadline,
    {
      marginRight: SPACING.SIZE_15,
    },
  ],
  link: {
    marginLeft: SPACING.SIZE_05,
  },
  location: {
    color: COLORS.GLOBAL.BLACK,
  },
  navOffset: {
    [MQ.S]: {
      paddingTop: 150,
    },
  },
  root: {
    color: COLORS.GLOBAL.WHITE,
    padding: SPACING.SIZE_20,
    position: 'relative',
    transition: `all ${TIME.MS300}ms ease`,
    width: '100%',
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_40}px ${SPACING.SIZE_30}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_60}px ${SPACING.SIZE_60}px ${SPACING.SIZE_30}px`,
    },
  },
  title: [typography.primaryHeadline, { marginBottom: SPACING.SIZE_10 }],
  toggle: {
    alignItems: 'center',
    display: 'flex',
    position: 'absolute',
    right: SPACING.SIZE_20,
    [MQ.M]: {
      right: SPACING.SIZE_40,
    },
    [MQ.L]: {
      right: SPACING.SIZE_70,
    },
  },
  wrappedLocation: {
    marginTop: SPACING.SIZE_05,
  },
};

export default styles;
