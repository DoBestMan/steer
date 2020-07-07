import { MQ, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  ratingQuantity: { marginLeft: '1ch' },
  ratingValue: [
    typography.smallCopyTight,
    {
      [MQ.XL]: typography.bodyCopyTight,
    },
  ],
  reviews: {
    alignItems: 'center',
    display: 'flex',
  },
};

export default styles;
