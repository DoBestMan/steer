import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

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
    [MQ.L]: {
      padding: `0 ${SPACING.SIZE_60}px`,
    },
  },
};

export default styles;
