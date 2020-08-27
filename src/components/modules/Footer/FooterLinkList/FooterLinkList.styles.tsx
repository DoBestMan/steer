import { SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  list: {
    '.listItem': {
      '&:not(:last-child)': {
        marginBottom: SPACING.SIZE_20,
      },
      a: typography.bodyCopyTight,
    },
  },
};

export default styles;
