import { MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  brand: {
    display: 'inline-block',
    marginBottom: SPACING.SIZE_15,
    span: typography.tertiaryHeadline,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_10,
    },
  },
  productName: typography.primaryHeadline,
  productNameLong: [
    typography.secondaryHeadline,
    {
      [MQ.L]: typography.primaryHeadline,
    },
  ],
};

export default styles;
