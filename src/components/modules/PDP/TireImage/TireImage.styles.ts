import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { ratioToPercentage } from '~/lib/utils/number';

const videoRatio = ratioToPercentage('9/16') / 100;

export const MAX_HEIGHT = {
  S: 200,
  M: 350,
  L: 460,
};

const THUMB_SIZE = 60;

const styles: StylesMap = {
  container: {
    height: MAX_HEIGHT.S,

    [MQ.M]: {
      height: MAX_HEIGHT.M,
    },

    [MQ.L]: {
      height: MAX_HEIGHT.L,
    },

    '.swiper-wrapper': {
      [MQ.L]: {
        marginBottom: SPACING.SIZE_50,
      },
    },
  },
  imageContainer: {
    margin: '0 auto',
  },
  imageThumb: {
    img: {
      maxHeight: THUMB_SIZE,
      maxWidth: THUMB_SIZE,
    },
  },
  thumb: {
    '&:not(:last-of-type)': {
      marginRight: SPACING.SIZE_20,
    },

    alignItems: 'center',
    borderBottom: BORDERS.SOLID_TRANSPARENT_1PX,
    display: 'flex',
    height: THUMB_SIZE,
    paddingBottom: SPACING.SIZE_15,
    width: THUMB_SIZE,
  },
  thumbActive: {
    borderColor: COLORS.ORANGE.SHADE_30,
  },
  thumbsContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  videoStyles: {
    [MQ.L]: {
      margin: '0 auto',
      maxWidth: MAX_HEIGHT.L * videoRatio,
    },
  },
  videoWrap: {
    '&.swiper-slide': {
      margin: '0 auto',
      maxWidth: MAX_HEIGHT.S * videoRatio,

      [MQ.M]: {
        maxWidth: MAX_HEIGHT.M * videoRatio,
      },

      [MQ.L]: {
        maxWidth: '100%',
      },
    },
  },
};

export default styles;
