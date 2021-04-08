import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

/*
 * Pointer events are disabled on the filter button whose dropdown is open so when clicking the
 * open button again, it will close the dropdown.
 * Pointer events are disabled for the carousel when a dropdown is open so that other buttons are clickable
 * while a dropdown is open
 */

const styles: StylesMap = {
  container: {
    '.dropdown-button': {
      transitionProperty: 'transform',
    },
    '.filters-carousel': {
      display: 'flex',
    },
    margin: `0 ${-SPACING.SIZE_20}px`,
    [MQ.M]: {
      margin: `0 ${-SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      margin: `0 ${-SPACING.SIZE_60}px`,
    },
  },
  disableEvents: {
    pointerEvents: 'none',
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
  filterContainerServerSide: {
    [MQ.M]: {
      overflowX: 'initial',
    },
    display: 'flex',
    overflowX: 'scroll',
  },
  filterHide: {
    display: 'none',
  },
  filterLabel: [
    typography.labelCopyTight,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_15,
    },
  ],
  label: [
    typography.smallCopy,
    {
      color: COLORS.ORANGE.SHADE_85,
      marginBottom: SPACING.SIZE_10,
      [MQ.M]: typography.bodyCopy,
    },
  ],
};

export default styles;
