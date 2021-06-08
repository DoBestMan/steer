import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  assetContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginRight: SPACING.SIZE_20,
    position: 'relative',
    width: 180,
  },
  curation: {
    '.assets-wrapper': {
      display: 'flex',
      marginBottom: SPACING.SIZE_20,
      marginTop: SPACING.SIZE_20,
    },
    backgroundColor: COLORS.GLOBAL.WHITE,
    padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_15}px`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_40}px ${SPACING.SIZE_35}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_60}px`,
    },
  },
  curationItem: {
    marginRight: SPACING.SIZE_20,
  },
  filterButton: {
    '&.focus-visible:focus:not(:active)': {
      borderColor: COLORS.GLOBAL.BLACK,
    },
    '&:focus:not(:active)': {
      borderColor: COLORS.ORANGE.SHADE_15,
    },
    pointerEvents: 'auto',
    // order matters to override when dropdown is open
    // eslint-disable-next-line sort-keys
    ':first-of-type': {
      marginLeft: SPACING.SIZE_20,
      [MQ.M]: {
        marginLeft: SPACING.SIZE_40,
      },
      [MQ.L]: {
        marginLeft: SPACING.SIZE_60,
      },
    },
    ':last-of-type': {
      marginRight: SPACING.SIZE_20,
      [MQ.M]: {
        marginRight: SPACING.SIZE_40,
      },
      [MQ.L]: {
        marginRight: SPACING.SIZE_60,
      },
    },
    marginRight: SPACING.SIZE_05,
    whiteSpace: 'nowrap',
  },
  filterLabel: [
    typography.labelCopyTight,
    {
      color: COLORS.DARK.GRAY_40,
      marginTop: SPACING.SIZE_40,
      marginBottom: SPACING.SIZE_15,
    },
  ],
  header: {
    backgroundColor: COLORS.GLOBAL.BLACK,
    padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_15}px`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_35}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_60}px ${SPACING.SIZE_60}px ${SPACING.SIZE_30}px`,
    },
  },
  root: {
    overflow: 'hidden',
    width: '100%',
  },
  sortBy: {
    display: 'flex',
  },
  sortLabel: [
    typography.labelCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginRight: SPACING.SIZE_05,
    },
  ],
  sticker: {
    position: 'absolute',
    top: 0,
    left: 25,
  },
  subFilter: {
    flexGrow: 1,
  },
  subFilterWrapper: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.WHITE,
    borderBottom: `1px solid ${COLORS.LIGHT.GRAY_20}`,
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_15}px`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_15}px ${SPACING.SIZE_35}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_15}px ${SPACING.SIZE_60}px`,
    },
  },
};

export default styles;
