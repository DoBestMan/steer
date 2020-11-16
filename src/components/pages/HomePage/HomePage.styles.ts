import {
  COLORS,
  EASING,
  MQ,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';

export const CONTENT_PADDING = {
  S: SPACING.SIZE_80,
  M: SPACING.SIZE_100,
  XL: SPACING.SIZE_120,
};

export const CONTENT_TRANSITION = TIME.MS600;

const styles: StylesMap = {
  contentContainer: {
    opacity: 0.3,
    paddingBottom: CONTENT_PADDING.S,
    transition: `opacity ${CONTENT_TRANSITION}ms ${EASING.CUBIC_EASE_OUT}`,
    willChange: 'opacity',
    [MQ.M]: {
      paddingBottom: CONTENT_PADDING.M,
    },

    [MQ.XL]: {
      paddingBottom: CONTENT_PADDING.XL,
    },
  },
  contentFull: {
    opacity: 1,
  },
  contentHidden: {
    opacity: 0,
  },
  contentSpacer: {
    display: 'block',
    paddingBottom: 40,
    position: 'relative',

    [MQ.M]: {
      paddingBottom: 60,
    },
  },
  promotionSection: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    paddingTop: SPACING.SIZE_10,
    [MQ.L]: {
      paddingTop: SPACING.SIZE_20,
    },
    ['[data-component="promotion-card-carousel"]']: {
      ['.carousel-pagination']: {
        margin: `${SPACING.SIZE_30}px auto ${SPACING.SIZE_40}px`,
      },
      ['.product-card-carousel']: {
        ['.swiper-slide:first-of-type']: {
          marginLeft: 0,
          [MQ.M]: {
            marginLeft: SPACING.SIZE_40,
          },
          [MQ.L]: {
            marginLeft: SPACING.SIZE_60,
          },
        },
      },
    },
  },
  promotionSectionHeader: {
    padding: `${SPACING.SIZE_20}px 0px`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_20}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_40}px`,
    },
  },
  root: {
    background: COLORS.LIGHT.OFF_WHITE,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '50vh',
    overflow: 'hidden',
    [MQ.L]: {
      minHeight: '56vh',
    },
  },
  scrollColorContainer: {
    position: 'relative',
    transition: `background-color ${TIME.MS300}ms ease-in-out`,
  },
  searchButtonContainer: {
    position: 'sticky',
    top: '-1px',
    transition: `background-color ${TIME.MS300}ms ease-in-out`,
    width: '100%',
    zIndex: Z_INDEX.FRONT,
  },
  searchButtonStickyFallback: {
    position: 'absolute',
  },
  searchButtonStickyFallbackFixed: {
    position: 'fixed',
  },
  searchButtonStickySupport: {
    position: 'sticky',
  },
};

export default styles;
