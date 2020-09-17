import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  borderBottom: {
    borderBottom: `2px dotted ${COLORS.LIGHT.GRAY_70}`,
  },
  ratingQuantity: { marginLeft: '0.5ch' },
  ratingValue: [
    typography.smallCopyTight,
    {
      [MQ.XL]: typography.bodyCopyTight,
    },
  ],
  reviews: {
    alignItems: 'center',
    display: 'flex',
    marginTop: SPACING.SIZE_20,
    position: 'relative',
  },
  reviewsLink: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
};

export default styles;
