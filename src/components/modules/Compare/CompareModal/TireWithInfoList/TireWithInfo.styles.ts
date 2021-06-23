import {
  COLORS,
  MQ,
  PRODUCT,
  SPACING,
  StylesMap,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { PRODUCT_WIDTH } from '../../Compare.constants';

const styles: StylesMap = {
  blackButton: {
    background: COLORS.GLOBAL.BLACK,
    opacity: '0.3',
  },
  brand: {
    marginBottom: SPACING.SIZE_05,
    '& span img': {
      maxWidth: SPACING.SIZE_110,
    },
  },
  brandContainer: {
    maxWidth: PRODUCT_WIDTH.BIG,
    maxHeight: 15,
    img: {
      height: 15,
      width: 'auto',
      maxWidth: 12,
    },
  },
  brandLabel: [
    typography.largeCopy,
    {
      color: COLORS.GLOBAL.WHITE,
      display: 'block',
      fontWeight: 'bold',
      lineHeight: `${PRODUCT.BRAND_IMAGE_HEIGHT}px`,

      [MQ.XL]: {
        fontSize: `${22 / 10}rem`,
      },
    },
  ],
  closeButton: {
    '&:active': {
      opacity: 0.45,
    },
    '&:focus:not(:active)': {
      opacity: 0.45,
    },
    '&:hover:not(:active)': {
      opacity: 0.45,
    },
    alignItems: 'center',
    background: 'rgba(255, 255, 255, 0.3)',
    borderRadius: '50%',
    color: COLORS.GLOBAL.WHITE,
    cursor: 'pointer',
    display: 'flex',
    height: SPACING.SIZE_30,
    justifyContent: 'center',
    position: 'absolute',
    right: SPACING.SIZE_10,
    top: SPACING.SIZE_02,
    width: SPACING.SIZE_30,
    zIndex: Z_INDEX.FRONT,
  },
  image: {
    backgroundBlendMode: 'darken',
    height: PRODUCT_WIDTH.BIG,
    marginBottom: SPACING.SIZE_25,
    mixBlendBode: 'multiply',
    opacity: 0.9,
    position: 'relative',
    [MQ.M]: {
      marginBottom: SPACING.SIZE_30,
    },
    width: PRODUCT_WIDTH.BIG,
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  linkText: {
    '&::after': {
      content: '""',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: PRODUCT_WIDTH.BIG + SPACING.SIZE_30,
    overflow: 'hidden',
    position: 'relative',
    width: PRODUCT_WIDTH.BIG + SPACING.SIZE_30,
  },
  shadow: {
    bottom: -SPACING.SIZE_20,
    left: 0,
    opacity: 1,
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    zIndex: Z_INDEX.BEHIND,
  },
  subcopy: [
    typography.smallCopyTight,
    {
      color: COLORS.GLOBAL.WHITE,
      height: SPACING.SIZE_30,
      marginBottom: SPACING.SIZE_02,
      marginTop: SPACING.SIZE_02,
      maxWidth: PRODUCT_WIDTH.BIG,
    },
  ],
};

export default styles;
