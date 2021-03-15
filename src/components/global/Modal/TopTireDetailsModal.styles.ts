import { WHEEL_WIDTH } from '~/components/global/Car/Car.constants';
import {
  SIZES,
  STICKER_SIZES,
} from '~/components/global/Sticker/Sticker.styles';
import {
  COLORS,
  EASING,
  MQ,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  asset: {
    display: 'block',
    opacity: 0,
    transform: 'translate3d(50px, 0, 0) rotate(45deg)',
    transition: `all ${TIME.MS400}ms ${EASING.CUBIC_EASE_OUT}`,
  },
  assetContainer: {
    display: 'block',
    height: WHEEL_WIDTH.S,
    left: '50%',
    position: 'relative',
    transform: 'translate3d(-50%, 0, 0)',
    width: WHEEL_WIDTH.S,

    [MQ.M]: {
      height: WHEEL_WIDTH.M,
      width: WHEEL_WIDTH.M,
    },

    [MQ.L]: {
      height: WHEEL_WIDTH.L,
      width: WHEEL_WIDTH.L,
    },
  },
  assetHovered: {
    cursor: 'pointer',
  },
  assetShow: {
    opacity: 1,
    transform: 'translate3d(0, 0, 0) rotate(0deg)',
  },
  container: {
    paddingTop: SPACING.SIZE_70,
    [MQ.M]: {
      padding: `${SPACING.SIZE_110}px ${SPACING.SIZE_20}px 0`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_80}px 0 0`,
    },
  },
  imageContainer: {
    margin: `0 ${-SPACING.SIZE_20}px ${SPACING.SIZE_40}px`,
    [MQ.M]: {
      margin: `0 ${-SPACING.SIZE_40}px ${SPACING.SIZE_60}px`,
    },
    [MQ.L]: {
      margin: `0 ${-SPACING.SIZE_60}px ${SPACING.SIZE_60}px`,
    },
  },
  link: {
    '& > span': {
      borderColor: COLORS.GLOBAL.ORANGE,
      color: COLORS.GLOBAL.ORANGE,
    },
    '& > span:hover': {
      borderColor: COLORS.GLOBAL.ORANGE,
      color: COLORS.GLOBAL.ORANGE,
    },
  },
  noSubtitle: {
    marginBottom: SPACING.SIZE_40,
    [MQ.M]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  spec: [
    typography.primarySubhead,
    {
      '&:not(:last-child)': {
        paddingBottom: SPACING.SIZE_10,
      },
      color: COLORS.LIGHT.GRAY_70,
      listStyleType: 'inherit',
    },
  ],
  specList: {
    padding: `${SPACING.SIZE_40}px 0 ${SPACING.SIZE_60}px ${SPACING.SIZE_25}px`,
  },
  sticker: {
    left: -SPACING.SIZE_15,
    opacity: 0,
    position: 'absolute',
    top: -SPACING.SIZE_15,
    transform: 'scale3d(1.1, 1.1, 1.1)',
    transition: `all ${TIME.MS300}ms ${EASING.CUBIC_EASE_OUT}`,
    zIndex: Z_INDEX.TOP,

    [MQ.XL]: {
      left: -SPACING.SIZE_10,
      top: -SPACING.SIZE_10,
    },
  },
  stickerCustom: {
    [MQ.M]: {
      height: 75,
      width: 75,
    },
    [MQ.XL]: {
      height: SIZES[STICKER_SIZES.LARGE].XL,
      width: SIZES[STICKER_SIZES.LARGE].XL,
    },
  },
  stickerShow: {
    opacity: 1,
    transform: 'scale3d(1, 1, 1)',
    transitionDelay: '100ms',
  },
  subtitle: [
    typography.largeCopy,
    {
      marginBottom: SPACING.SIZE_40,
      [MQ.M]: {
        marginBottom: SPACING.SIZE_60,
      },
    },
  ],
  title1: [typography.modalHeadline],
  title2: [
    typography.modalHeadline,
    {
      marginBottom: SPACING.SIZE_10,
    },
  ],
};

export default styles;
