import { SPACING, StylesMap, TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { PRODUCT_WIDTH } from '../../Compare.constants';
import { removingProduct } from '../../ProductToCompare/ProductToCompare.styles';

const styles: StylesMap = {
  buttonAddToCart: {
    marginBottom: SPACING.SIZE_10,
  },
  buttonLearnMore: {
    marginBottom: SPACING.SIZE_20,
  },
  isRemoving: {
    animation: `${removingProduct} ${TIME.MS750}ms linear forwards`,
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    textAlign: 'center',
    width: PRODUCT_WIDTH.BIG + SPACING.SIZE_30,
  },
  subHead: [
    typography.secondarySubhead,
    {
      whiteSpace: 'nowrap',
    },
  ],
};

export default styles;
