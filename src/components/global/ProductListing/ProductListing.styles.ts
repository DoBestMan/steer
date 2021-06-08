import {
  BORDERS,
  COLORS,
  MQ,
  PRODUCT,
  SPACING,
  StylesMap,
  TIME,
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
  brandLabel: [
    typography.largeCopy,
    {
      display: 'block',
      fontWeight: 'bold',
      lineHeight: `${PRODUCT.BRAND_IMAGE_HEIGHT}px`,

      [MQ.XL]: {
        fontSize: `${22 / 10}rem`,
      },
    },
  ],
  category: {
    display: 'flex',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 12,
    height: 12,
    marginRight: SPACING.SIZE_05,
  },
  checkbox: {
    ':hover&:not(:disabled)': {
      span: {
        borderColor: COLORS.DARK.GRAY_DARK_SOLID,
      },
    },
    display: 'flex',
    position: 'absolute',
    right: '-8%',
    top: -SPACING.SIZE_05,
    zIndex: 1,
  },
  checkLabel: {
    '& input': {
      height: 0,
    },
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
  },
  checkTitle: [
    typography.smallCopyTight,
    {
      color: '#181818',
      display: 'none',
      fontSize: '10px',
      marginTop: SPACING.SIZE_05,
      [MQ.M]: {
        display: 'inline',
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
    alignItems: 'center',
    display: 'flex',
    div: {
      width: 'fit-content',

      ':first-of-type:not(:only-child)': {
        marginBottom: SPACING.SIZE_05,
      },
    },
    flexDirection: 'column',
    marginBottom: -8,
    width: '100%',
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
      borderBottom: BORDERS.SOLID_ORANGE_1PX,
    },

    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    marginRight: `${SPACING.SIZE_20}px`,
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
    opacity: 0,
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
    opacity: 0,

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
  shadowLoaded: {
    opacity: 1,
    transition: `opacity ${TIME.MS350}ms ease`,
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
  topPickBadge: {
    zIndex: Z_INDEX.BETWEEN_ZERO_TOP,
  },
};

export default styles;
