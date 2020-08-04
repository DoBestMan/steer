import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  separator: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
    height: SPACING.SIZE_02,
    marginBottom: 0,
    marginTop: SPACING.SIZE_60,
    [MQ.XL]: {
      marginTop: SPACING.SIZE_80,
    },
  },
};

export default styles;
