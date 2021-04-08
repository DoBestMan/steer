import FiltersCarouselStyles from '~/components/global/FiltersCarousel/FiltersCarousel.styles';
import { OVERLAY_BOX_SHADOW } from '~/components/global/Modal/Modal.styles';
import {
  COLORS,
  GRID_MARGIN,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { fadeIn, fadeInUp } from '~/styles/animations.styles';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  BORDER_SIZE: 2,
  SIZE: 50,
};

export const CLASS_NAMES = {
  DROPDOWN: 'filter-dropdown-content',
};

export const filterContainerStyles: StylesMap = {
  input: {
    [MQ.L]: {
      left: '0',
      position: 'absolute',
      top: '120%',
    },
    ['&:checked~label']: {
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderColor: COLORS.GLOBAL.WHITE,
    },
    background: COLORS.GLOBAL.WHITE,
    borderRadius: SPACING.SIZE_15,
    boxShadow: '0px 4px 6px rgb(0 0 0 / 10%)',
    height: 350,
    left: '8%',
    maxHeight: '350px',
    maxWidth: '400px',
    minHeight: '150px',
    minWidth: '325px',
    overflow: 'auto',
    padding: SPACING.SIZE_30,
    position: 'fixed',
    top: '30%',
    zIndex: 999,
  },
};

export const styles: StylesMap = {
  closeLabel: {
    [MQ.L]: {
      display: 'none',
    },
  },
  filterButton: {
    ...FiltersCarouselStyles.filterButton,
    ':first-of-type': {
      marginLeft: 0,
    },
    ':last-of-type': {
      marginRight: 0,
    },
  },
  filterButtonActive: {
    background: 'black',
  },
  filterDropdownActive: {
    [MQ.L]: {
      background: 'none',
      borderRadius: SPACING.SIZE_15,
      boxShadow: OVERLAY_BOX_SHADOW,
      height: 350,
      maxHeight: 350,
      maxWidth: 400,
      minHeight: 150,
      minWidth: 325,
      position: 'absolute',
      top: '120%',
    },
    [`.${CLASS_NAMES.DROPDOWN}`]: {
      [MQ.M]: {
        animation: `${TIME.MS350}ms ease-in 0s 1 normal none running ${fadeIn}`,
        borderRadius: SPACING.SIZE_15,
        height: 'inherit',
        margin: 'auto',
        maxHeight: `calc(100vh - ${GRID_MARGIN.M}px)`,
        maxWidth: 480,
        minWidth: 400,
        position: 'relative',
        top: '50%',
        transform: 'translateY(-50%)',
      },
      [MQ.L]: {
        animation: 'none',
        maxHeight: 'inherit',
        maxWidth: 'inherit',
        minWidth: 'inherit',
        top: 0,
        transform: 'none',
      },
      animation: `${TIME.MS350}ms ease-in 0s 1 normal none running ${fadeInUp}`,
      background: COLORS.GLOBAL.WHITE,
      borderRadius: SPACING.SIZE_15,
      bottom: 0,
      boxShadow: OVERLAY_BOX_SHADOW,
      color: COLORS.GLOBAL.BLACK,
      maxHeight: '100%',
      overflowY: 'auto',
      padding: SPACING.SIZE_20,
      position: 'absolute',
      width: '100%',
    },
    backgroundColor: COLORS.LIGHT.GRAY_70,
    height: '100%',
    inset: 0,
    opacity: 1,
    position: 'fixed',
    zIndex: 900,
  },
  filterGroup: {
    ':not(:last-of-type)': {
      marginBottom: SPACING.SIZE_40,
    },
  },
  filterIcon: {
    marginLeft: SPACING.SIZE_05,
  },
  filterServerContainer: {
    '&:last-of-type': {
      marginRight: 0,
    },
    '[data-component="dropdown-component"]': {
      left: '0',
      top: '100%',
    },
    display: 'flex',
    input: {
      ['&:checked~label']: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderColor: COLORS.GLOBAL.WHITE,
        ['&.isActiveLabel']: {
          color: COLORS.GLOBAL.WHITE,
        },
      },
      ['&:checked~label > .chevron-down']: {
        display: 'none',
      },
      ['&:checked~label > .chevron-up']: {
        display: 'flex',
      },
      ['~ label > .chevron-down']: {
        marginLeft: 0,
      },
      ['~ label > .chevron-up']: {
        display: 'none',
        marginLeft: 0,
      },
      display: 'none',
    },
    marginRight: SPACING.SIZE_05,
    position: 'relative',
  },
  filterTitle: [
    typography.eyebrow,
    {
      flex: 1,
      marginBottom: SPACING.SIZE_40,

      [MQ.L]: {
        display: 'none',
      },
    },
  ],
  filterTitleContainer: {
    display: 'flex',
  },
  isButtonActive: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    borderColor: COLORS.GLOBAL.WHITE,
    color: COLORS.GLOBAL.ORANGE,
  },
  isHidden: { display: 'none' },
  item: {
    marginBottom: SPACING.SIZE_20,
  },
  label: [
    typography.eyebrow,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_20,
    },
  ],
  labelAsButton: [
    typography.primarySubhead,
    {
      '&:hover': {
        borderColor: COLORS.ORANGE.SHADE_30,
      },
      [MQ.L]: {
        whiteSpace: 'initial',
      },
      alignItems: 'center',
      backgroundColor: COLORS.GLOBAL.ORANGE,
      borderColor: COLORS.LIGHT.GRAY_20,
      borderRadius: RADIUS.RADIUS_25,
      borderStyle: 'solid',
      borderWidth: CONSTANTS.BORDER_SIZE,
      boxSizing: 'border-box',
      color: COLORS.GLOBAL.WHITE,
      cursor: 'pointer',
      display: 'flex',
      height: CONSTANTS.SIZE,
      padding: `0 ${SPACING.SIZE_25}px`,
      span: {
        marginLeft: SPACING.SIZE_05,
      },
      whiteSpace: 'nowrap',
    },
  ],
  listContainer: {
    height: 0,
    overflow: 'hidden',
    position: 'absolute',
  },
};
