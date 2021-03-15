import { MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  group: {
    marginBottom: SPACING.SIZE_30,
    [MQ.XL]: { marginBottom: SPACING.SIZE_50 },
  },
  root: {
    paddingTop: SPACING.SIZE_40,
  },
};

export default styles;
