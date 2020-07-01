import { COLORS, SPACING, StylesMap, THEME } from '~/lib/constants';

const styles: StylesMap = {
  item: {
    alignItems: 'center',
    display: 'flex',
    whiteSpace: 'nowrap',
    width: 'auto',
  },
  link: {
    alignItems: 'center',
    display: 'flex',
  },
  root: {
    '.breadcrumbs-wrapper': {
      alignItems: 'center',
      display: 'flex',
    },
  },
  nextItemIcon: {
    height: 5,
    marginLeft: SPACING.SIZE_05,
    marginRight: SPACING.SIZE_05,
    width: 3,
  },
};

export const themeStyles = {
  [THEME.LIGHT]: {
    color: COLORS.LIGHT.GRAY_70,
  },
  [THEME.ORANGE]: {
    color: COLORS.ORANGE.SHADE_85,
  },
  [THEME.DARK]: {
    color: COLORS.DARK.GRAY_40,
  },
};

export default styles;
