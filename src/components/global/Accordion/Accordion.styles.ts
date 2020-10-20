import {
  BORDERS,
  COLORS,
  EASING,
  SPACING,
  StylesMap,
  THEME,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const tStyles = {
  [THEME.DARK]: {
    itemContainer: {
      '&:not(:first-of-type)': {
        borderTop: BORDERS.SOLID_GRAY_80_1PX,
      },
    },
    itemContainerActive: {
      '&:not(:first-of-type)': {
        borderTopColor: COLORS.GLOBAL.WHITE,
      },
    },
  },
  [THEME.LIGHT]: {
    itemContainer: {
      '&:not(:first-of-type)': {
        borderTop: BORDERS.SOLID_GRAY_LIGHT_1PX,
      },
    },
    itemContainerActive: {
      '&:not(:first-of-type)': {
        borderTopColor: COLORS.GLOBAL.BLACK,
      },
    },
  },
};
const styles: StylesMap = {
  hideItem: {
    display: 'none',
  },
  showAll: [
    typography.primarySubhead,
    {
      alignItems: 'center',
      borderTop: BORDERS.SOLID_GRAY_80_1PX,
      display: 'flex',
      justifyContent: 'space-between',
      paddingBottom: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_20,
      transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
      width: '100%',
    },
  ],
  showAllIcon: {
    svg: {
      display: 'block',
      height: SPACING.SIZE_05,
      padding: SPACING.SIZE_05,
    },
  },
  [THEME.DARK]: {
    '&:hover, &:focus, &:active': {
      color: COLORS.GLOBAL.WHITE,
    },
    color: COLORS.DARK.GRAY_40,
  },
  [THEME.LIGHT]: {
    '&:hover, &:focus, &:active': {
      color: COLORS.GLOBAL.BLACK,
    },
    borderTop: BORDERS.SOLID_GRAY_LIGHT_1PX,
  },
};

export default styles;
