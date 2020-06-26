import { COLORS, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  link: {
    '&:hover': {
      color: COLORS.GLOBAL.ORANGE,
    },
    color: COLORS.GLOBAL.BLACK,
  },
  linkItem: {
    padding: `${SPACING.SIZE_05}px 0`,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
  },
};

export default styles;
