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
  errorMessage: [
    typography.smallCopyTight,
    {
      alignItems: 'center',
      color: COLORS.GLOBAL.RED,
      display: 'flex',
      [MQ.M]: {},
      [MQ.L]: {},
    },
  ],
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
  marginTopM20: {
    marginTop: -SPACING.SIZE_15,
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
  priceAndActionBarWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    [MQ.L]: { marginTop: SPACING.SIZE_20 },
    width: '100%',
  },
  pricesWrapper: {
    animation: CONSTANTS.FADE_IN_ANIMATION,
    maxWidth: CONSTANTS.HEADER_MAX_WIDTH,
    position: 'absolute',
    right: 0,
    textAlign: 'right',
    [MQ.L]: {
      position: 'unset',
      textAlign: 'left',
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
  questionMark: {
    alignItems: 'center',
    border: `1px solid ${COLORS.ORANGE.SHADE_15_SOLID}`,
    borderRadius: SPACING.SIZE_05,
    color: COLORS.ORANGE.SHADE_15_SOLID,
    display: 'flex',
    height: SPACING.SIZE_15,
    justifyContent: 'center',
    marginRight: SPACING.SIZE_10,
    width: SPACING.SIZE_15,
  },
  selectorWrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_10,
    position: 'relative',
    [MQ.M]: {
      marginBottom: SPACING.SIZE_10,
    },
    [MQ.L]: {
      marginBottom: SPACING.SIZE_20,
      marginTop: 0,
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
  topPart: {
    display: 'flex',
    justifyContent: 'space-between',
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
