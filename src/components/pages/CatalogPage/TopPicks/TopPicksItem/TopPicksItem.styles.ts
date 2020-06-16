import { WHEEL_WIDTH } from '~/components/global/Car/Car.constants';
import { COLORS, EASING, MQ, SPACING, StylesMap, TIME } from '~/lib/constants';

const ASSET_MARGIN_TOP = {
  /* eslint-disable sort-keys */
  S: 40,
  M: 50,
  L: 30,
  /* eslint-enable sort-keys */
};

const HEIGHT_BUTTON = 50;

export const styles: StylesMap = {
  addVehicleContainer: {
    color: COLORS.GLOBAL.WHITE,
    fontWeight: 'normal',
    maxWidth: 295,
    textAlign: 'center',

    // Based on design, 295/375
    width: '78.66666667%',

    [MQ.M]: {
      maxWidth: 425,
      width: '55.33854167%',
    },

    [MQ.L]: {
      opacity: 0,
    },
  },
  assetContainer: {
    display: 'block',
    flex: '0 1 auto',
    height: WHEEL_WIDTH.S,
    marginTop: ASSET_MARGIN_TOP.S,
    position: 'relative',
    width: WHEEL_WIDTH.S,

    [MQ.M]: {
      height: WHEEL_WIDTH.M,
      marginTop: ASSET_MARGIN_TOP.M,
      width: WHEEL_WIDTH.M,
    },

    [MQ.L]: {
      height: WHEEL_WIDTH.L,
      marginTop: ASSET_MARGIN_TOP.L,
      width: WHEEL_WIDTH.L,
    },
  },
  bottomContent: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '40vh',
    paddingBottom: SPACING.SIZE_25,
    paddingTop: SPACING.SIZE_25,

    [MQ.M]: {
      minHeight: '35vh',
      paddingBottom: SPACING.SIZE_40,
      paddingTop: SPACING.SIZE_40,
    },

    [MQ.L]: {
      minHeight: '33.333333vh',
      paddingBottom: SPACING.SIZE_25,
      paddingTop: SPACING.SIZE_25,
    },
  },
  brand: {
    display: 'block',
  },
  brandWithImage: {
    maxWidth: WHEEL_WIDTH.S,

    [MQ.M]: {
      maxWidth: WHEEL_WIDTH.M,
    },

    [MQ.L]: {
      maxWidth: WHEEL_WIDTH.L,
    },

    [MQ.XL]: {
      maxWidth: WHEEL_WIDTH.XL,
    },
  },
  cta: {
    display: 'block',
    marginTop: SPACING.SIZE_15,
    opacity: 0,
    transform: `translate3d(0, ${SPACING.SIZE_20}px, 0)`,
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  ctaShow: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transitionDelay: '100ms',
  },
  description: {
    display: 'block',
    marginTop: SPACING.SIZE_10,
    opacity: 0,
    transform: 'translate3d(0, 10px, 0)',
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  descriptionShow: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transitionDelay: `${TIME.MS50}ms`,
  },
  infoContainer: {
    display: 'block',
    marginTop: SPACING.SIZE_10,
    textAlign: 'center',
  },
  linkContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    opacity: 0,
    transform: `translate3d(0, calc(50% - ${HEIGHT_BUTTON / 2}px), 0)`,
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,

    [MQ.L]: {
      opacity: 0.5,
    },
  },
  linkContainerShow: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',

    [MQ.L]: {
      opacity: 1,
    },
  },
  modalButton: {
    display: 'inline-block',
    verticalAlign: 'text-bottom',

    [MQ.L]: {
      verticalAlign: 'inherit',
    },
  },
  pricesContainer: {
    display: 'block',
    marginTop: SPACING.SIZE_05,
    textAlign: 'center',
  },
  productIcon: {
    display: 'inline-flex',
    height: 10,
    marginRight: 8,

    svg: {
      height: '100%',
      width: 'auto',
    },
  },
  productNameContainer: {
    display: 'block',
    marginTop: SPACING.SIZE_02,
  },
  productPerk: {
    fontWeight: 'bold',
  },
  productPerkContainer: {
    display: 'block',
  },
  rating: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginTop: SPACING.SIZE_02,
  },
  sticker: {
    left: -SPACING.SIZE_15,
    position: 'absolute',
    top: -SPACING.SIZE_15,

    [MQ.L]: {
      left: -SPACING.SIZE_10,
      top: -SPACING.SIZE_10,
    },
  },
  subcopy: {
    color: COLORS.LIGHT.GRAY_70,
  },
  title: {
    display: 'block',
    opacity: 0,
    transform: `translate3d(0, ${SPACING.SIZE_15}px, 0)`,
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  titleBottom: {
    display: 'block',

    [MQ.L]: {
      display: 'inline',
    },
  },
  // Take whatever space's left
  titleContainer: {
    display: 'block',
    flex: '1 1 auto',
    position: 'relative',
    width: '100%',
  },
  titleContainerInner: {
    bottom: 0,
    display: 'block',
    left: 0,
    position: 'absolute',
    width: '100%',

    // moe room, no need to fix to the bottom
    [MQ.M]: {
      bottom: 'auto',
      top: '50%',
      transform: 'translate3d(0, -50%, 0)',
    },
  },
  titleShow: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  topContent: {
    display: 'block',
    height: '60vh',
    minHeight: 385,
    width: '100%',

    [MQ.M]: {
      height: '65vh',
      minHeight: 517,
    },

    [MQ.L]: {
      height: '66.6666666vh',
      minHeight: 538,
    },
  },
  topContentInner: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
    position: 'relative',
    textAlign: 'center',
    width: '100%',
  },
  viewMoreContainer: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.BLACK,
    borderRadius: '100%',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    textAlign: 'center',
    width: '100%',
  },
  viewMoreContentContainer: {
    marginTop: SPACING.SIZE_35,

    [MQ.L]: {
      transform: 'translate3d(0, 0, 0)',
    },
  },
  viewMoreContentSubtitle: {
    color: COLORS.ORANGE.SHADE_85,
    display: 'block',
  },
  viewMoreContentTitle: {
    color: COLORS.GLOBAL.WHITE,
    display: 'block',
    fontWeight: 'normal',
    marginBottom: SPACING.SIZE_10,
  },
  viewMoreSubtitle: {
    color: COLORS.DARK.GRAY_40,
    display: 'block',
  },
  viewMoreTitle: {
    color: COLORS.GLOBAL.WHITE,
    display: 'block',
  },
};
