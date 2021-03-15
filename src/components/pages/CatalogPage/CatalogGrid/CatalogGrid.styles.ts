import { MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  notificationList: {
    marginTop: SPACING.SIZE_20,
  },
  results: {
    marginBottom: SPACING.SIZE_60,
    [MQ.L]: {
      marginBottom: SPACING.SIZE_80,
    },
  },
};

export default styles;
