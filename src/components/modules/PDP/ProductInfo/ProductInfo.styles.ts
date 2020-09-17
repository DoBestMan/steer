import {
  BORDERS,
  COLORS,
  MQ,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { fadeIn } from '~/styles/animations.styles';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  FADE_IN_ANIMATION: `${fadeIn} ${TIME.MS200}ms ease`,
  HEADER_MAX_WIDTH: 140,
};

const styles: StylesMap = {
  actionBar: {
    display: 'none',

    [MQ.L]: {
      animation: CONSTANTS.FADE_IN_ANIMATION,
      display: 'block',
    },
  },
  actionBarMultiple: {
    button: {
      flex: 'none',
      marginLeft: 0,
      marginRight: 'auto',
      marginTop: SPACING.SIZE_20,
      paddingLeft: SPACING.SIZE_80,
      paddingRight: SPACING.SIZE_80,
    },
  },
  crossSellWrapper: [
    typography.bodyCopy,
    {
      animation: CONSTANTS.FADE_IN_ANIMATION,
      borderTop: BORDERS.SOLID_GRAY_20_1PX,
      marginTop: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_25,
      textAlign: 'center',

      [MQ.M]: {
        marginTop: SPACING.SIZE_25,
      },

      [MQ.L]: {
        marginTop: SPACING.SIZE_40,
        paddingTop: SPACING.SIZE_40,
      },
    },
  ],
  error: {
    zIndex: Z_INDEX.FRONT,

    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
      width: '100%',
    },
  },
  loadIndex: {
    fontWeight: 'normal',
  },
  loading: {
    backgroundColor: COLORS.LIGHT.GRAY_10,
    height: 25,
    marginBottom: SPACING.SIZE_20,
    marginTop: SPACING.SIZE_40,
    paddingTop: SPACING.SIZE_20,
    width: 70,

    [MQ.M]: {
      height: 40,
      width: 120,
    },

    [MQ.L]: {
      height: 45,
      marginBottom: 0,
      width: 195,
    },
  },
  loadingSizeSelector: {
    backgroundColor: COLORS.LIGHT.GRAY_10,
    height: 20,
    marginBottom: SPACING.SIZE_05,
    marginTop: SPACING.SIZE_05,
    width: 200,

    [MQ.M]: {
      height: 30,
      width: 260,
    },

    [MQ.L]: {
      height: 35,
      width: 260,
    },
  },
  name: {
    display: 'block',
  },
  nameWrapper: {
    flex: 1,

    [MQ.L]: {
      flexBasis: '100%',
    },
  },
  nameWrapperTireLine: {
    [MQ.L]: {
      flexBasis: 'auto',
    },
  },
  pricesWrapper: {
    animation: CONSTANTS.FADE_IN_ANIMATION,
    marginBottom: SPACING.SIZE_35,
    maxWidth: CONSTANTS.HEADER_MAX_WIDTH,
    textAlign: 'right',

    [MQ.M]: {
      marginBottom: SPACING.SIZE_30,
    },

    [MQ.L]: {
      textAlign: 'left',
      marginTop: SPACING.SIZE_40,
      maxWidth: '100%',
    },
  },
  promoTags: {
    animation: CONSTANTS.FADE_IN_ANIMATION,
    marginBottom: -SPACING.SIZE_05,
    marginTop: SPACING.SIZE_25,

    [MQ.L]: {
      marginTop: SPACING.SIZE_20,
    },
  },
  sizeButton: [
    typography.primaryHeadline,
    {
      alignItems: 'center',
      display: 'flex',
    },
  ],
  sizeButtonIcon: {
    marginLeft: SPACING.SIZE_05,
  },
  sizeNoRating: {
    marginBottom: SPACING.SIZE_20,

    [MQ.L]: {
      marginBottom: 0,
    },
  },
  wrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    [MQ.L]: {
      flexFlow: 'row wrap',
    },
  },
};

export default styles;
