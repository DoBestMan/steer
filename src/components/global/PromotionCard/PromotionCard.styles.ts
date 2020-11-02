import {
  COLORS,
  EASING,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  TIME,
  Z_INDEX,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const ICON_SIZE = {
  H: 50,
  W: 50,
};
const styles: StylesMap = {
  decorator: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    div: {
      // overlap brand images
      ':nth-of-type(1)': {
        left: 0,
        zIndex: Z_INDEX.TOP,
      },
      ':nth-of-type(2)': {
        left: -SPACING.SIZE_25,
        zIndex: Z_INDEX.FRONT,
      },
      ':nth-of-type(3)': {
        left: -SPACING.SIZE_50,
        zIndex: Z_INDEX.ZERO,
      },
      height: ICON_SIZE.H,
      position: 'relative',
      width: ICON_SIZE.W,
    },
    height: ICON_SIZE.H,
    justifyContent: 'left',
    marginBottom: SPACING.SIZE_40,
    position: 'relative',
    width: '100%',
    zIndex: Z_INDEX.ZERO,

    [MQ.L]: {
      p: {
        marginTop: -5, // line height causes misalignemnt to right column content
      },
    },
    [MQ.XL]: {
      // exception for jumbo headline, should be 60px on XL for card decorator
      fontSize: '6.0rem',
      letterSpacing: '-0.04em',
      lineHeight: 60 / 60, // '60px',
    },
  },
  description: {
    color: COLORS.LIGHT.GRAY_70,
    marginBottom: SPACING.SIZE_40,
  },
  eyebrow: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
  },
  eyebrowIcon: {
    paddingLeft: 8,
    svg: {
      height: '17px',
      width: '20px',
      [MQ.M]: {
        height: '20px',
        width: '20px',
      },
      [MQ.L]: {
        height: '25px',
        width: '32px',
      },
    },
  },
  links: {
    ':not(:last-child)': {
      marginBottom: SPACING.SIZE_20,
    },
  },
  moreBody: {
    display: 'none',
    '&[aria-hidden="false"]': {
      display: 'block',
    },
  },
  promoImage: {
    img: {
      borderTopLeftRadius: RADIUS.RADIUS_15,
      borderTopRightRadius: RADIUS.RADIUS_15,
    },
  },
  removeTopRadius: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  root: {
    backgroundColor: COLORS.LIGHT.GRAY_10,
    borderRadius: RADIUS.RADIUS_15,
    [MQ.S]: {
      padding: SPACING.SIZE_40,
    },
    [MQ.M]: {
      padding: `${SPACING.SIZE_40}px ${SPACING.SIZE_30}px`,
    },
  },
  showFullBody: [
    typography.primarySubhead,
    {
      alignItems: 'center',
      display: 'flex',
      marginTop: SPACING.SIZE_05,
      transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
    },
  ],
  showFullBodyIcon: {
    marginTop: SPACING.SIZE_02,
    svg: {
      display: 'block',
      height: 5,
      padding: SPACING.SIZE_05,
    },
  },
  title: {
    color: COLORS.GLOBAL.BLACK,
    marginBottom: SPACING.SIZE_10,
  },
};

export default styles;
