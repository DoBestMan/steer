import {
  BORDERS,
  COLORS,
  EASING,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  showAll: [
    typography.primarySubhead,
    {
      '&:hover, &:focus, &:active': {
        color: COLORS.GLOBAL.WHITE,
      },
      alignItems: 'center',
      borderTop: BORDERS.SOLID_GRAY_80_1PX,
      color: COLORS.DARK.GRAY_40,
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
  itemContainer: {
    '&:not(:first-child)': {
      borderTop: BORDERS.SOLID_GRAY_80_1PX,
    },
  },
  itemContainerActive: {
    '&:not(:first-child)': {
      borderTopColor: COLORS.GLOBAL.WHITE,
    },
  },
};

export default styles;
