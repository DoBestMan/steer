import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const IMAGE_SIZES = {
  S: 200,
  M: 250,
  L: 300,
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
  brandLabel: typography.tertiaryHeadline,
  filterItem: typography.primarySubhead,
  image: {
    maxWidth: IMAGE_SIZES.S,
  },
  imageHighlighted: {
    maxWidth: IMAGE_SIZES.M,
    [MQ.XL]: {
      maxWidth: IMAGE_SIZES.L,
    },
  },
  imageWrapper: { position: 'relative' },
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
