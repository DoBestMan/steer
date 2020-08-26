import { FULLSCREEN_PADDINGS } from '~/components/global/Modal/Modal.styles';
import {
  BORDERS,
  COLORS,
  GRID_MARGIN,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  Z_INDEX,
} from '~/lib/constants';
import { getColumnsCalc } from '~/lib/utils/grid';
import { ratioToPercentage } from '~/lib/utils/number';

import { OUTER_PADDING } from './TireImageZoom.styles';

export const CONSTANTS = {
  CONTAINER_FULL_SCREEN: {
    S: 25,
    M: 60,
    L: {
      BOTTOM: 60,
      TOP: 20,
    },
  },
  HEADER_HEIGHT: {
    S: 40,
    L: 60,
  },
  THUMB_INNER_PADDINGS: {
    S: SPACING.SIZE_05,
    M: SPACING.SIZE_10,
    L: SPACING.SIZE_15,
  },
  THUMB_MARGIN: SPACING.SIZE_50,
  THUMB_SIZES: {
    S: 40,
    M: 50,
    L: 60,
  },
  VIDEO_MAX_WIDTH: '75vw',
  VIDEO_RATIO: ratioToPercentage('9/16') / 100,
};

export const MAX_HEIGHT = {
  S: 200,
  M: 350,
  L: 460,
};

const styles: StylesMap = {
  container: {
    /* eslint-disable sort-keys */
    position: 'relative',

    '.swiper-wrapper': {
      alignItems: 'center',
      height: MAX_HEIGHT.S,
      maxHeight: '100vh',

      [MQ.M]: {
        height: MAX_HEIGHT.M,
      },

      [MQ.L]: {
        height: MAX_HEIGHT.L,
        maxHeight: `calc(100vh - ${
          CONSTANTS.THUMB_MARGIN +
          CONSTANTS.THUMB_SIZES.L +
          CONSTANTS.THUMB_INNER_PADDINGS.L +
          1 // 1px border
        }px)`,
        marginBottom: CONSTANTS.THUMB_MARGIN,
      },
    },

    '.tire-image-pagination': {
      marginLeft: GRID_MARGIN.S,
      marginTop: SPACING.SIZE_10,

      [MQ.M]: {
        marginLeft: GRID_MARGIN.M,
      },

      [MQ.L]: {
        display: 'none',
      },

      '.swiper-pagination-bullet': {
        background: COLORS.LIGHT.GRAY_20,
        borderRadius: RADIUS.RADIUS_5,
        height: 2,
        margin: `0 ${SPACING.SIZE_02}px 0 0`,
        opacity: 1,
        width: 8,
      },
      '.swiper-pagination-bullet-active': {
        background: COLORS.LIGHT.GRAY_70,
      },
    },
    /* eslint-enable sort-keys */
  },
  containerFullScreen: {
    /* eslint-disable sort-keys */
    marginBottom: OUTER_PADDING.S.VERTICAL,

    [MQ.M]: {
      marginBottom: OUTER_PADDING.M,
    },

    [MQ.L]: {
      marginBottom: OUTER_PADDING.L,
    },

    '.swiper-container': {
      height: `calc(100% - ${CONSTANTS.THUMB_INNER_PADDINGS.S}px - ${CONSTANTS.THUMB_SIZES.S}px)`,
      padding: `${CONSTANTS.CONTAINER_FULL_SCREEN.S}px 0`,

      [MQ.M]: {
        height: `calc(100% - ${CONSTANTS.THUMB_INNER_PADDINGS.M}px - ${CONSTANTS.THUMB_SIZES.M}px)`,
        padding: `${CONSTANTS.CONTAINER_FULL_SCREEN.M}px 0`,
      },

      [MQ.L]: {
        border: 'none',
        height: `calc(100% - ${CONSTANTS.THUMB_INNER_PADDINGS.L}px - ${CONSTANTS.THUMB_SIZES.L}px)`,
        paddingBottom: CONSTANTS.CONTAINER_FULL_SCREEN.L.BOTTOM,
        paddingTop: CONSTANTS.CONTAINER_FULL_SCREEN.L.TOP,
      },
    },

    '.swiper-wrapper': {
      height: '100%',
    },
    /* eslint-enable sort-keys */
  },
  containerInline: {
    marginBottom: SPACING.SIZE_15,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_20,
    },

    [MQ.L]: {
      marginBottom: 0,
    },
  },
  fullscreenContainer: {
    display: 'flex',
    margin: '0 auto',
    maxHeight: '100%',
    maxWidth: '100%',

    [MQ.M]: {
      maxWidth: getColumnsCalc({
        breakpoint: 'M',
        columns: 1, // half column on each side
        customOperation: `100vw - ${FULLSCREEN_PADDINGS.RIGHT * 2}px - `,
        includeContainerMargin: false,
        includeExtraGutter: false,
      }),
    },
    [MQ.L]: {
      maxWidth: '100%',
    },
  },
  imageComponentContainer: {
    display: 'flex',
    maxWidth: '100%',
  },
  imageStyles: {
    maxHeight: '100%',
    maxWidth: '100%',
  },
  imageThumb: {
    img: {
      maxHeight: CONSTANTS.THUMB_SIZES.S,
      maxWidth: CONSTANTS.THUMB_SIZES.S,

      [MQ.M]: {
        maxHeight: CONSTANTS.THUMB_SIZES.M,
        maxWidth: CONSTANTS.THUMB_SIZES.M,
      },

      [MQ.L]: {
        maxHeight: CONSTANTS.THUMB_SIZES.L,
        maxWidth: CONSTANTS.THUMB_SIZES.L,
      },
    },
  },
  navigation: {
    alignItems: 'center',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,

    [MQ.L]: {
      display: 'none',
    },
  },
  navigationButton: {
    marginTop: -SPACING.SIZE_40,
    padding: SPACING.SIZE_20,
    position: 'absolute',
    top: '50%',
    zIndex: Z_INDEX.FRONT,

    [MQ.M]: {
      marginTop: -SPACING.SIZE_40,
    },

    // eslint-disable-next-line
    svg: {
      color: COLORS.LIGHT.GRAY_70,
    },

    // eslint-disable-next-line
    '&:hover svg': {
      color: COLORS.GLOBAL.BLACK,
    },

    // eslint-disable-next-line
    '&:disabled ': {
      pointerEvents: 'none',

      svg: {
        color: COLORS.LIGHT.GRAY_20,
      },
    },
  },
  navigationNext: {
    right: 0,
    padding: SPACING.SIZE_20,

    [MQ.M]: {
      right: SPACING.SIZE_20,
    },
  },
  navigationPrev: {
    left: 0,
    padding: SPACING.SIZE_20,

    [MQ.M]: {
      left: SPACING.SIZE_20,
    },
  },
  slide: {
    textAlign: 'center',
  },
  thumb: {
    '&:not(:last-of-type)': {
      marginRight: SPACING.SIZE_20,
    },

    alignItems: 'center',
    borderBottom: BORDERS.SOLID_TRANSPARENT_1PX,
    display: 'flex',
    height: CONSTANTS.THUMB_SIZES.S,
    paddingBottom: CONSTANTS.THUMB_INNER_PADDINGS.S,
    width: CONSTANTS.THUMB_SIZES.S,

    [MQ.M]: {
      height: CONSTANTS.THUMB_SIZES.M,
      paddingBottom: CONSTANTS.THUMB_INNER_PADDINGS.M,
      width: CONSTANTS.THUMB_SIZES.M,
    },

    [MQ.L]: {
      height: CONSTANTS.THUMB_SIZES.L,
      paddingBottom: CONSTANTS.THUMB_INNER_PADDINGS.L,
      width: CONSTANTS.THUMB_SIZES.L,
    },

    // eslint-disable-next-line sort-keys
    img: {
      borderRadius: RADIUS.RADIUS_5,
    },
  },
  thumbActive: {
    borderColor: COLORS.ORANGE.SHADE_30,
  },
  thumbsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  thumbsContainerFullScreen: {
    bottom: 0,
    left: '0',
    margin: '0 auto',
    position: 'absolute',
    right: '0',
  },
  videoContainerStyles: {
    boxSizing: 'border-box',
    margin: '0 auto',
    maxWidth: '75vw',
    paddingBottom: 0,

    [MQ.L]: {
      maxWidth: '100%',
    },

    /* eslint-disable sort-keys */
    'button div': {
      height: 'inherit',
      padding: 0,
      width: 'inherit',
    },
  },
};

export default styles;
