import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const IMAGE_SIZE = {
  HIGHLIGHT: {
    S: 250,
    M: 250,
    XL: 300,
  },
  DEFAULT: {
    S: 140,
    M: 180,
    XL: 200,
  },
};

const DISC_SIZE = 50;

const styles: StylesMap = {
  attribute: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.ORANGE,
      marginBottom: SPACING.SIZE_05,
    },
  ],
  brand: {
    marginTop: SPACING.SIZE_10,
    marginBottom: SPACING.SIZE_15,
  },
  brandImage: {
    img: {
      height: 20,
      margin: '0 auto',
      width: 'auto',
    },
  },
  brandLabel: typography.tertiaryHeadline,
  filterItem: typography.primarySubhead,
  image: {
    minHeight: IMAGE_SIZE.DEFAULT.S,
    width: IMAGE_SIZE.DEFAULT.S,
    [MQ.M]: {
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
  morePromos: [
    typography.secondarySubhead,
    {
      color: COLORS.GLOBAL.ORANGE,
    },
  ],
  promoDisc: [
    typography.smallCopyTight,
    {
      alignItems: 'center',
      backgroundColor: COLORS.GLOBAL.ORANGE,
      borderRadius: RADIUS.CIRCLE,
      color: COLORS.GLOBAL.WHITE,
      display: 'flex',
      height: DISC_SIZE,
      justifyContent: 'center',
      left: SPACING.SIZE_20,
      lineHeight: 0.9,
      position: 'absolute',
      textAlign: 'center',
      top: SPACING.SIZE_10,
      width: DISC_SIZE,
    },
  ],
  rating: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: SPACING.SIZE_10,
  },
  root: {
    '&:hover': {
      borderColor: COLORS.GLOBAL.ORANGE,
    },

    alignItems: 'center',
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_10}px`,
    position: 'relative',

    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px ${SPACING.SIZE_20}px`,
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
  subcopy: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
};

export default styles;
