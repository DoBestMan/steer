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
  imageButton: {
    display: 'block',
    margin: '0 auto',
    maxHeight: '100%',
  },
  imageCustomStyles: {
    height: '100%',
    margin: '0 auto',
  },
  imageFullscreen: {
    alignItems: 'center',
    display: 'flex',
    maxWidth: '90%',
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
    height: MAX_HEIGHT.S,
    maxHeight: '100%',
    paddingBottom: '0',

    [MQ.M]: {
      height: MAX_HEIGHT.M,
    },

    [MQ.L]: {
      height: MAX_HEIGHT.L,
      margin: '0 auto',
      maxWidth: MAX_HEIGHT.L * CONSTANTS.VIDEO_RATIO,
    },

    /* eslint-disable sort-keys */
    img: {
      height: '100%',
      margin: '0 auto',
      maxWidth: CONSTANTS.VIDEO_MAX_WIDTH, // Adds drag area to move to another slide
      width: '100%',
    },
    /* eslint-enable sort-keys */
  },
  videoStyles: {
    margin: '0 auto',
    maxHeight: '100vh',
    maxWidth: CONSTANTS.VIDEO_MAX_WIDTH, // Adds drag area to move to another slide
    width: '100%',

    [MQ.L]: {
      maxHeight: `calc(100vh - ${
        CONSTANTS.THUMB_MARGIN +
        CONSTANTS.THUMB_SIZES.L +
        CONSTANTS.THUMB_INNER_PADDINGS.L +
        1 // 1px border
      }px)`,
    },
  },
};

export default styles;
