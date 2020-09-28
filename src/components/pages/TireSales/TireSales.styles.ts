import { MQ, SPACING, StylesMap } from '~/lib/constants';

export const styles: StylesMap = {
  breadcrumbs: {
    marginBottom: SPACING.SIZE_40,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_80,
    },
    [MQ.L]: {
      marginBottom: SPACING.SIZE_50,
    },
  },
  root: {
    height: '100%',
    paddingBottom: SPACING.SIZE_60,
  },
};
