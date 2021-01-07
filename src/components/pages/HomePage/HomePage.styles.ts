import { DATA_ATTRIBUTES } from '~/components/global/SearchByBoard/SearchByBoard';
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
  stickySearchBar: {
    [`[data-component="${DATA_ATTRIBUTES.COMPONENT_NAME}"]`]: {
      display: 'flex',
      [`[data-component-class="${DATA_ATTRIBUTES.COMPONENT_TITLE}"]`]: {
        flexBasis: '10%',
        [MQ.XL]: {
          flexBasis: '8%',
        },
      },
      [`[data-component-class="${DATA_ATTRIBUTES.COMPONENT_MENU}"]`]: {
        flexBasis: '100%',

        [`[data-component-class="${DATA_ATTRIBUTES.COMPONENT_MENU_ITEM}"]`]: {
          ':last-of-type': {
            margin: 0,
          },
          ['[data-icon-type="brand"]']: {
            svg: {
              width: '60px',
              [MQ.M]: {
                width: '120px',
              },
            },
          },
          ['[data-icon-type="tireSize"]']: {
            svg: {
              height: '18px',
              width: '18px',
              [MQ.M]: {
                height: '30px',
                width: '30px',
              },
            },
          },
          ['[data-icon-type="vehicle"]']: {
            ['.SVGInline-svg']: {
              left: '-64%',
              position: 'absolute',
              top: '26%',
              [MQ.M]: {
                left: '10%',
                position: 'absolute',
                top: '36%',
                width: '72px',
              },
            },
          },
          marginRight: SPACING.SIZE_30,
          [MQ.M]: {
            display: 'flex',
            flexFlow: 'wrap',
            justifyContent: 'space-between',
          },
          [`[data-component-class="${DATA_ATTRIBUTES.COMPONENT_ICON_SECTION}"]`]: {
            height: '50px',
            marginBottom: SPACING.SIZE_10,
            width: '50px',
            [MQ.M]: {
              height: '90px',
              marginBottom: 0,
              marginRight: SPACING.SIZE_10,
              width: '90px',
            },
          },
        },
      },
      [`[data-component-class="${DATA_ATTRIBUTES.COMPONENT_HEADER_SECTION}"]`]: {
        flexFlow: 'column',
        [MQ.M]: {
          flexFlow: 'row',
          marginBottom: SPACING.SIZE_20,
        },
        [MQ.L]: {
          marginBottom: 0,
        },
      },
    },
  },
};

export default styles;
