import { BORDERS, COLORS, SPACING, StylesMap } from '~/lib/constants';

const ITEM_HEIGHT = 60;

const styles: StylesMap = {
  list: {
    'a:after': {
      content: '""',
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    width: '100%',
  },
  listItem: {
    ':first-of-type': {
      borderTop: BORDERS.SOLID_GRAY_10_1PX,
    },
    borderBottom: BORDERS.SOLID_GRAY_10_1PX,
    display: 'flex',
    height: ITEM_HEIGHT,
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_20}px 0`,
    position: 'relative',
    span: {
      borderColor: 'transparent',
      color: COLORS.LIGHT.GRAY_70,
    },
    width: '100%',
  },
  moreLinkCustom: {
    borderBottom: 'unset',
  },
};

export default styles;
