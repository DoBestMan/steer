import { COLORS, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  item: {
    alignItems: 'center',
    color: COLORS.LIGHT.GRAY_70,
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
    color: COLORS.LIGHT.GRAY_70,
    height: 5,
    marginLeft: SPACING.SIZE_05,
    marginRight: SPACING.SIZE_05,
    width: 3,
  },
};

export default styles;
