import { COLORS, RADIUS, SPACING, StylesMap } from '~/lib/constants';

export const styles: StylesMap = {
  colors: {
    minHeight: '100vh',
    padding: SPACING.SIZE_50,
  },
  colorsContainer: {
    display: 'flex',
    div: {
      '&:not(:last-of-type)': {
        marginRight: SPACING.SIZE_30,
      },
      borderRadius: RADIUS.RADIUS_15,
      height: 160,
      width: '33%',
    },
    maxWidth: 900,
  },
  containerFullbleed: {
    backgroundColor: COLORS.LIGHT.GRAY_70,
    color: COLORS.GLOBAL.WHITE,
    padding: SPACING.SIZE_50,
  },
  containerText: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
  },
};
