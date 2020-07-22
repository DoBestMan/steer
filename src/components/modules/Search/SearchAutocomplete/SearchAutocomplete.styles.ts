import {
  ENTERED,
  ENTERING,
  EXITED,
  EXITING,
} from 'react-transition-group/Transition';

import {
  BORDERS,
  COLORS,
  GRID_MARGIN,
  MQ,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const animationStyles = {
  [`listbox_${ENTERING}`]: {
    opacity: 0,
    transform: 'translateX(10%)',
  },
  [`listbox_${ENTERED}`]: {
    opacity: 1,
    transform: 'translateX(0)',
  },
  [`listbox_${EXITING}`]: {
    opacity: 1,
  },
  [`listbox_${EXITED}`]: {
    opacity: 0,
  },
};

const CONSTANTS = {
  CLEAR_BUTTON_SIZE: 20,
};

// To mirror padding in SerachButton.styles
const SEARCH_PADDING_XL = 65 / 2;

const styles: StylesMap = {
  autocompleteGrid: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderBottom: '1px solid transparent',
    transition: `border-color ${TIME.MS100}ms ease`,
    [MQ.L]: {
      borderBottom: BORDERS.SOLID_GRAY_80_1PX,
    },
  },
  autocompleteGridItem: {
    padding: `${SPACING.SIZE_25}px ${SPACING.SIZE_50}px ${SPACING.SIZE_25}px 0`,
    position: 'relative',
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_80}px ${SPACING.SIZE_30}px 0`,
    },
    [MQ.XL]: {
      padding: `${SEARCH_PADDING_XL}px ${SPACING.SIZE_80}px ${SEARCH_PADDING_XL}px 0`,
    },
  },
  autocompleteGridItemRearTireState: {
    borderBottom: `1px solid ${COLORS.ORANGE.SHADE_30}`,
    padding: `${SPACING.SIZE_25}px 0 ${SPACING.SIZE_25}px 0`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_40}px 0 ${SPACING.SIZE_20}px 0`,
    },
    [MQ.L]: {
      borderBottom: BORDERS.SOLID_GRAY_80_1PX,
      padding: `${SPACING.SIZE_50}px 0 ${SPACING.SIZE_30}px 0`,
    },
  },
  autocompleteGridRearTireState: {
    [MQ.L]: {
      borderColor: 'transparent',
    },
  },
  clearSearch: {
    color: COLORS.LIGHT.GRAY_70,
    marginLeft: SPACING.SIZE_15,
    [MQ.M]: {
      svg: {
        height: CONSTANTS.CLEAR_BUTTON_SIZE,
        width: CONSTANTS.CLEAR_BUTTON_SIZE,
      },
    },
  },
  clearSearchButton: {
    flexShrink: 0,
  },
  clearSecondaryInput: [
    typography.labelCopyTight,
    {
      color: COLORS.GLOBAL.BLACK,
    },
  ],
  closeSearchButton: [
    typography.labelCopyTight,
    {
      span: {
        borderBottom: BORDERS.DOTTED_TRANSPARENT_2PX,
      },
    },
  ],
  closeSearchButtonRearTire: {
    '&:focus > span': {
      color: COLORS.GLOBAL.ORANGE,
    },
    color: COLORS.GLOBAL.ORANGE,
  },
  closeSearchRearTire: {
    top: 21,
    [MQ.M]: {
      top: SPACING.SIZE_30,
    },
    [MQ.L]: {
      top: SPACING.SIZE_40,
    },
    [MQ.XL]: {
      top: SPACING.SIZE_40,
    },
  },
  closeSearchWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'flex-end',
    position: 'absolute',
    right: GRID_MARGIN.S,
    top: 27,
    [MQ.M]: {
      right: GRID_MARGIN.M,
      top: SPACING.SIZE_40,
    },
    [MQ.L]: {
      right: GRID_MARGIN.L,
    },
    [MQ.XL]: {
      right: GRID_MARGIN.XL,
      top: SPACING.SIZE_45,
    },
  },
  errorLabel: [
    typography.secondaryHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
      [MQ.M]: [typography.primaryHeadline],
    },
  ],
  errorMessage: [
    typography.primaryHeadline,
    {
      padding: `${SPACING.SIZE_15}px 0 ${SPACING.SIZE_10}px`,
      [MQ.M]: {
        padding: `${SPACING.SIZE_30}px 0 ${SPACING.SIZE_20}px`,
      },
      [MQ.L]: {
        padding: `${SPACING.SIZE_70}px 0 ${SPACING.SIZE_10}px`,
      },
    },
  ],
  header: {
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: Z_INDEX.FRONT,
  },
  listboxRoot: {
    listStyle: 'none',
    transition: `opacity ${TIME.MS600}ms ease, transform ${TIME.MS300}ms ease`,
  },
  loading: {
    padding: `${SPACING.SIZE_15}px 0 ${SPACING.SIZE_25}px`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_70}px 0 ${SPACING.SIZE_10}px`,
    },
  },
  searchIcon: {
    '> svg': {
      height: 34,
      width: 34,
    },
    color: COLORS.ORANGE.TINT_70,
  },
  searchIconGridItem: {
    alignItems: 'center',
    display: 'none',
    justifyContent: 'center',
    [MQ.L]: {
      display: 'flex',
      padding: `${SPACING.SIZE_30}px 0`,
    },
    [MQ.XL]: {
      padding: `${SEARCH_PADDING_XL}px 0`,
    },
  },
  searchIconGridRearTire: {
    [MQ.L]: {
      padding: `${SPACING.SIZE_40}px 0 ${SPACING.SIZE_20}px`,
    },
    [MQ.XL]: {
      padding: `${SPACING.SIZE_50}px 0 ${SPACING.SIZE_30}px`,
    },
  },
  searchIconSecondaryInput: {
    gridRow: 2,
  },
  searchIconWrapper: {
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
    marginTop: SPACING.SIZE_05,
  },
  searchResultsGrid: {
    paddingTop: 75,
    [MQ.M]: {
      paddingTop: SPACING.SIZE_100,
    },
  },
  searchResultsGridItem: {
    padding: `${SPACING.SIZE_20}px 0`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_60}px 0 ${SPACING.SIZE_20}px`,
    },
  },
  searchResultsGridRearTire: {
    paddingTop: 230,
    [MQ.M]: {
      paddingTop: 330,
    },
    [MQ.L]: {
      paddingTop: 350,
    },
    [MQ.XL]: {
      paddingTop: 360,
    },
  },
  secondaryActionButton: [
    typography.smallCopy,
    {
      '&:not(:last-child)': {
        marginRight: SPACING.SIZE_20,
      },
      backgroundColor: COLORS.GLOBAL.ORANGE,
      boxShadow: '0px 0px 10px 10px rgba(254, 95, 16, 1)',
      span: {
        borderBottom: `2px dotted ${COLORS.ORANGE.SHADE_30}`,
      },
      [MQ.M]: {
        '&:not(:last-child)': {
          marginRight: SPACING.SIZE_30,
        },
      },
      [MQ.L]: {
        '&:not(:last-child)': {
          marginRight: SPACING.SIZE_40,
        },
      },
    },
  ],
  secondaryActionWrapper: {
    bottom: SPACING.SIZE_20,
    display: 'flex',
    position: 'fixed',
    right: SPACING.SIZE_20,
    zIndex: Z_INDEX.TOP,
    [MQ.M]: {
      bottom: SPACING.SIZE_45,
      right: SPACING.SIZE_40,
    },
    [MQ.L]: {
      bottom: SPACING.SIZE_60,
      right: SPACING.SIZE_60,
    },
  },
  tireSizeHeader: {
    alignItems: 'center',
    backgroundColor: COLORS.ORANGE.SHADE_85_SOLID,
    height: 60,
    [MQ.M]: {
      height: 80,
    },
    [MQ.L]: {
      height: 100,
    },
  },
  tireSizeHeaderCopy: [
    typography.eyebrow,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
  ...animationStyles,
};

export default styles;
