import { MQ, SPACING, StylesMap } from '~/lib/constants';

/*
 * Pointer events are disabled on the filter button whose dropdown is open so when clicking the
 * open button again, it will close the dropdown.
 * Pointer events are disabled for the carousel when a dropdown is open so that other buttons are clickable
 * while a dropdown is open
 */

const styles: StylesMap = {
  disableEvents: {
    pointerEvents: 'none',
  },
  filterButton: {
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
  filterHide: {
    display: 'none',
  },
  listContainer: {
    '.filters-wrapper': {
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
};

export default styles;
