import { WHEEL_WIDTH } from '~/components/global/Car/Car.constants';
import { NAV_HEIGHT } from '~/components/modules/Nav/Nav.styles';
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
      maxWidth: 350,
      width: '55.33854167%',
    },

    [MQ.L]: {
      opacity: 0,
      width: '100%',
    },
  },
  asset: {
    display: 'block',
    opacity: 0,
    transform: 'translate3d(50px, 0, 0) rotate(45deg)',
    transition: `all ${TIME.MS400}ms ${EASING.CUBIC_EASE_OUT}`,
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
  assetShow: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) rotate(0deg)',
  },
  bottomContent: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    minHeight: `calc(40vh - ${NAV_HEIGHT.S}px)`,
    paddingBottom: SPACING.SIZE_25,
    paddingTop: SPACING.SIZE_25,

    [MQ.M]: {
      minHeight: `calc(35vh - ${NAV_HEIGHT.S}px)`,
      paddingBottom: SPACING.SIZE_40,
      paddingTop: SPACING.SIZE_40,
    },

    [MQ.L]: {
      minHeight: `calc(33.333333vh - ${NAV_HEIGHT.S}px)`,
      paddingBottom: SPACING.SIZE_25,
      paddingTop: SPACING.SIZE_25,
    },
  },
  brand: {
    color: COLORS.GLOBAL.WHITE,
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
    visibility: 'hidden',
  },
  ctaItem: {
    pointerEvents: 'all',
  },
  ctaShow: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    transitionDelay: '100ms',
    visibility: 'visible',
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
    pointerEvents: 'all',
    transform: `translate3d(0, calc(50% - ${HEIGHT_BUTTON / 2}px), 0)`,
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
    visibility: 'hidden',

    [MQ.L]: {
      opacity: 0,
      visibility: 'visible',
    },
  },
  linkContainerIsCurrent: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
    visibility: 'visible',

    [MQ.L]: {
      opacity: 1,
    },
  },
  linkContainerShow: {
    [MQ.L]: {
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      visibility: 'visible',
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
  root: {
    margin: '0 auto',
    width: 250,

    [MQ.M]: {
      width: 400,
    },

    [MQ.L]: {
      width: 500,
    },

    [MQ.XL]: {
      width: 350,
    },
  },
  rootHovered: {
    opacity: 1,
  },
  rootNotHovered: {
    opacity: 0.3,
  },
  sticker: {
    left: -SPACING.SIZE_15,
    opacity: 0,
    position: 'absolute',
    top: -SPACING.SIZE_15,
    transform: 'scale3d(1.1, 1.1, 1.1)',
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,

    [MQ.L]: {
      left: -SPACING.SIZE_10,
      top: -SPACING.SIZE_10,
    },
  },
  stickerShow: {
    opacity: 1,
    transform: 'scale3d(1, 1, 1)',
    transitionDelay: '100ms',
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
    pointerEvents: 'none',
    position: 'relative',
    width: '100%',
  },
  titleContainerInner: {
    bottom: 0,
    display: 'block',
    left: 0,
    position: 'absolute',
    width: '100%',

    // more room, no need to fix to the bottom
    // also extending so the title takes the whole screen
    [MQ.M]: {
      bottom: 'auto',
      top: '50%',
      transform: 'translate3d(0, -50%, 0)',
    },

    [MQ.L]: {
      left: '50%',
      transform: 'translate3d(-50%, -50%, 0)',
      width: '100vw',
    },
  },
  titleContainerIsCurrent: {
    pointerEvents: 'all',
  },
  titleShow: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  topContent: {
    display: 'block',
    height: `calc(60vh - ${NAV_HEIGHT.S}px)`,
    minHeight: 385,
    paddingTop: NAV_HEIGHT.S,
    width: '100%',

    [MQ.M]: {
      height: `calc(65vh - ${NAV_HEIGHT.M}px)`,
      minHeight: 517,
      paddingTop: NAV_HEIGHT.M,
    },

    [MQ.L]: {
      height: `calc(66.6666666vh - ${NAV_HEIGHT.L}px)`,
      minHeight: 538,
      paddingTop: NAV_HEIGHT.L,
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
    marginTop: SPACING.SIZE_20,

    [MQ.L]: {
      marginTop: SPACING.SIZE_25,
    },

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
