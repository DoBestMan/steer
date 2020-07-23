import { FULLSCREEN_PADDINGS as MODAL_PADDINGS } from '~/components/global/Modal/Modal.styles';
import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { ratioToPercentage } from '~/lib/utils/number';

const CONSTANTS = {
  HEADER_HEIGHT: 75,
  THUMB_INNER_PADDINGS: {
    S: SPACING.SIZE_05,
    M: SPACING.SIZE_10,
    L: SPACING.SIZE_15,
  },
  THUMB_MARGIN: SPACING.SIZE_50,
  THUMB_POSITIONS: {
    S: SPACING.SIZE_20,
    M: SPACING.SIZE_40,
    L: SPACING.SIZE_60,
  },
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
    marginBottom: SPACING.SIZE_15,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_20,
    },

    [MQ.L]: {
      marginBottom: 0,
    },

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
      [MQ.L]: {
        display: 'none',
      },

      '.swiper-pagination-bullet': {
        background: COLORS.LIGHT.GRAY_20,
        borderRadius: 5,
        height: 2,
        margin: `0 ${SPACING.SIZE_02}px 0 0`,
        opacity: 1,
        width: 8,
      },
      '.swiper-pagination-bullet-active': {
        background: COLORS.LIGHT.GRAY_70,
      },
    },

    '.swiper-button-prev, .swiper-button-next': {
      '&.swiper-button-disabled': {
        opacity: 0,
      },

      ':after': {
        content: 'none',
      },

      ':hover svg': {
        color: COLORS.GLOBAL.BLACK,
      },

      svg: {
        color: COLORS.GLOBAL.GRAY_50,
      },

      [MQ.L]: {
        display: 'none',
      },
    },
    /* eslint-enable sort-keys */
  },
  containerFullScreen: {
    height: `calc(100vh -  ${CONSTANTS.HEADER_HEIGHT}px - ${MODAL_PADDINGS.BOTTOM}px - ${MODAL_PADDINGS.TOP}px)`,

    /* eslint-disable sort-keys */
    '.swiper-container': {
      height: `calc(100% - ${CONSTANTS.THUMB_MARGIN}px - ${CONSTANTS.THUMB_SIZES.S}px)`,

      [MQ.M]: {
        height: `calc(100% - ${CONSTANTS.THUMB_MARGIN}px - ${CONSTANTS.THUMB_SIZES.M}px)`,
      },

      [MQ.L]: {
        height: `calc(100% - ${CONSTANTS.THUMB_MARGIN}px - ${CONSTANTS.THUMB_SIZES.L}px)`,
      },
    },

    '.swiper-wrapper': {
      height: '100%',
    },
    /* eslint-enable sort-keys */
  },
  fullscreenContainer: {
    display: 'flex',
    margin: '0 auto',
    maxHeight: '100%',
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
  },
  thumbActive: {
    borderColor: COLORS.ORANGE.SHADE_30,
  },
  thumbsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  thumbsContainerFullScreen: {
    bottom: CONSTANTS.THUMB_POSITIONS.S,
    left: '0',
    margin: '0 auto',
    position: 'absolute',
    right: '0',

    [MQ.M]: {
      bottom: CONSTANTS.THUMB_POSITIONS.M,
    },

    [MQ.L]: {
      bottom: CONSTANTS.THUMB_POSITIONS.L,
    },
  },
  videoContainerStyles: {
    boxSizing: 'border-box',
    margin: '0 auto',
    maxWidth: '75vw',
    paddingBottom: 0,

    /* eslint-disable sort-keys */
    'button div': {
      height: 'inherit',
      padding: 0,
      width: 'inherit',
    },
  },
};

export default styles;
