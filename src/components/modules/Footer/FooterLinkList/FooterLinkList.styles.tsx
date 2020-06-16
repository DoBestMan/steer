import { SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  listItem: {
    '&:not(:last-child)': {
      marginBottom: SPACING.SIZE_20,
    },
  },
};

export default styles;
