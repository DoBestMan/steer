import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  container: {
    paddingBottom: SPACING.SIZE_120,
    paddingTop: SPACING.SIZE_40,

    [MQ.M]: {
      paddingTop: 0,
    },
  },
  title: {
    color: COLORS.GLOBAL.WHITE,
  },
  video: {
    paddingBottom: SPACING.SIZE_40,
  },
};

export default styles;
