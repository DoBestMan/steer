import { COLORS, MQ, PRODUCT, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';
const CONSTANTS = {
  IMAGE_MAX_WIDTH: 150,
};

const styles: StylesMap = {
  brandLabel: [
    typography.largeCopy,
    {
      [MQ.XL]: {
        fontSize: `${22 / 10}rem`,
      },
      display: 'block',
      fontWeight: 'bold',
      lineHeight: `${PRODUCT.BRAND_IMAGE_HEIGHT}px`,
    },
  ],
  detailsContainer: {
    marginTop: SPACING.SIZE_10,
  },
  image: {
    marginRight: SPACING.SIZE_20,
    maxWidth: CONSTANTS.IMAGE_MAX_WIDTH,
  },
  imageContainer: {
    display: 'flex',
  },
  priceText: [
    typography.bodyCopyTight,
    {
      color: COLORS.GLOBAL.BLACK,
      right: 0,
      textAlign: 'right',
    },
  ],
  tireContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_10,
    padding: `0px ${SPACING.SIZE_20}px`,
  },
  tireHeader: [
    typography.smallCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      textAlign: 'left',
    },
  ],
  tireQuantity: [
    typography.smallCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingBottom: SPACING.SIZE_05,
      textAlign: 'left',
    },
  ],
};
export default styles;
