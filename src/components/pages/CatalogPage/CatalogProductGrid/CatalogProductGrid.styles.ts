import { MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  advancedListing: {
    marginTop: SPACING.SIZE_40,
  },
  loadMoreButton: {
    marginTop: SPACING.SIZE_60,
    display: 'flex',
    justifyContent: 'center',
    [MQ.L]: {
      marginTop: SPACING.SIZE_80,
    },
  },
};

export default styles;
