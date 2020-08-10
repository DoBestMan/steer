import {
  BORDERS,
  COLORS,
  MQ,
  SPACING,
  StylesMap,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const IMAGE_SIZE = {
  HIGHLIGHT: {
    S: 210,
    M: 240,
    XL: 280,
  },
  DEFAULT: {
    S: 120,
    M: 155,
    XL: 180,
  },
};

const BRAND_IMAGE_HEIGHT = 20;

const styles: StylesMap = {
  attribute: [
    typography.tertiaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
    },
  ],
  brand: {
    marginBottom: SPACING.SIZE_15,
  },
  brandImage: {
    img: {
      height: BRAND_IMAGE_HEIGHT,
      margin: '0 auto',
      width: 'auto',
    },
  },
  brandLabel: [
    typography.largeCopy,

    {
      fontWeight: 'bold',
      lineHeight: `${BRAND_IMAGE_HEIGHT}px`,

      [MQ.XL]: {
        fontSize: `${22 / 10}rem`,
      },
    },
  ],
  deliveryIcon: {
    position: 'relative',
    left: -3,
    top: 2,
  },
  deliveryInfoHighlighted: {
    [MQ.M]: {
      display: 'none',
    },
  },
  filterItem: typography.secondarySubhead,
  filterItemContainer: {
    marginBottom: SPACING.SIZE_10,
  },
  image: {
    marginBottom: SPACING.SIZE_25,
    minHeight: IMAGE_SIZE.DEFAULT.S,
    position: 'relative',
    width: IMAGE_SIZE.DEFAULT.S,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_30,
      minHeight: IMAGE_SIZE.DEFAULT.M,
      width: IMAGE_SIZE.DEFAULT.M,
    },
    [MQ.XL]: {
      minHeight: IMAGE_SIZE.DEFAULT.XL,
      width: IMAGE_SIZE.DEFAULT.XL,
    },
  },
  imageHighlighted: {
    width: IMAGE_SIZE.HIGHLIGHT.S,
    [MQ.M]: {
      width: IMAGE_SIZE.HIGHLIGHT.M,
    },
    [MQ.XL]: {
      width: IMAGE_SIZE.HIGHLIGHT.XL,
    },
  },
  info: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  infoHighlighted: {
    [MQ.M]: {
      alignItems: 'start',
      textAlign: 'left',
      marginLeft: SPACING.SIZE_20,
    },
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
  moment: [
    typography.secondarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'flex',
      [MQ.XL]: { lineHeight: '20px' },
    },
  ],
  momentIcon: {
    width: 16,
    height: 14,

    svg: {
      height: '100%',
      width: 'auto',
    },
  },
  momentList: {
    display: 'none',
    [MQ.M]: {
      display: 'block',
      margin: `${SPACING.SIZE_05}px 0 ${SPACING.SIZE_05}px`,
    },
    [MQ.XL]: { margin: `${SPACING.SIZE_05}px 0 ${SPACING.SIZE_15}px` },
  },
  morePromos: [
    typography.secondarySubhead,
    {
      color: COLORS.GLOBAL.ORANGE,
      marginTop: 5,
    },
  ],
  promos: {
    marginBottom: -8,

    'div:first-of-type:not(:only-child)': {
      marginBottom: -1,
    },
  },
  rating: {
    alignItems: 'flex-end',
    display: 'flex',
    marginBottom: SPACING.SIZE_10,
  },
  ratingQuantity: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: 3,
    },
  ],
  root: {
    '&:hover': {
      borderColor: COLORS.GLOBAL.ORANGE,
    },

    alignItems: 'center',
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: `${SPACING.SIZE_25}px ${SPACING.SIZE_10}px`,
    position: 'relative',

    [MQ.M]: {
      padding: `${SPACING.SIZE_40}px ${SPACING.SIZE_20}px ${SPACING.SIZE_30}px ${SPACING.SIZE_20}px`,
    },

    [MQ.XL]: {
      padding: `${SPACING.SIZE_80}px ${SPACING.SIZE_20}px ${SPACING.SIZE_40}px ${SPACING.SIZE_20}px`,
    },
  },
  rootGrouped: {
    paddingTop: SPACING.SIZE_30,

    [MQ.M]: {
      paddingTop: SPACING.SIZE_30,
    },

    [MQ.XL]: {
      paddingTop: SPACING.SIZE_40,
    },
  },
  rootHighlighted: {
    maxWidth: 'initial',
    [MQ.M]: {
      flexDirection: 'row',
      justifyContent: 'center',
      maxWidth: 'initial',
    },
    [MQ.XL]: {
      justifyContent: 'start',
      maxWidth: 'initial',
    },
  },
  shadow: {
    bottom: -21,
    left: 0,
    pointerEvents: 'none',
    position: 'absolute',
    width: '100%',
    zIndex: Z_INDEX.BEHIND,

    [MQ.M]: {
      bottom: -27,
    },

    [MQ.XL]: {
      bottom: -32,
    },
  },
  shadowHighlighted: {
    bottom: -36,

    [MQ.M]: {
      bottom: -42,
    },

    [MQ.L]: {
      bottom: -42,
    },

    [MQ.XL]: {
      bottom: -48,
    },
  },
  sticker: {
    left: -SPACING.SIZE_10,
    position: 'absolute',
    textTransform: 'lowercase',
    top: -SPACING.SIZE_05,

    [MQ.M]: {
      left: SPACING.SIZE_05,
    },
    [MQ.XL]: {
      left: SPACING.SIZE_15,
    },
  },
  stickerHighlighted: {
    left: SPACING.SIZE_05,
    top: -SPACING.SIZE_10,

    [MQ.M]: {
      left: SPACING.SIZE_15,
      top: -SPACING.SIZE_05,
    },
    [MQ.XL]: {
      left: SPACING.SIZE_35,
    },

    /* eslint-disable sort-keys */
    span: {
      fontSize: `${12 / 10}rem`,
      [MQ.XL]: {
        fontSize: `${15 / 10}rem`,
      },
    },
    /* eslint-enable sort-keys */
  },
  subcopy: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_02,
      marginTop: SPACING.SIZE_02,
    },
  ],
};

export default styles;
