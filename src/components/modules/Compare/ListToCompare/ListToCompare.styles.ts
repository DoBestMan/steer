import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const carouselNavBtn = {
  '& > span': {
    height: '7px',
    width: '4px',
  },
  '&.swiper-button-disabled': {
    display: 'none',
  },
  '&:hover': {
    background: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
  },
  background: COLORS.GLOBAL.WHITE,
  boxShadow: `0px 0 20px ${COLORS.GLOBAL.GRAY_50}`,
  color: COLORS.GLOBAL.BLACK,
  display: 'flex',
  height: SPACING.SIZE_40,
  svg: {
    height: '18px',
    width: '11px',
  },
  top: '50%',
  width: SPACING.SIZE_40,
};

const styles: StylesMap = {
  background: {
    '&:after': {
      background: COLORS.GLOBAL.ORANGE,
      bottom: 0,
      content: '""',
      height: '60%',
      position: 'absolute',
      width: '100%',
    },
    '&:before': {
      background: COLORS.GLOBAL.WHITE,
      content: '""',
      height: '40%',
      position: 'absolute',
      top: 0,
      width: '100%',
    },
  },
  bigItem: {
    ':first-of-type': {
      marginLeft: SPACING.SIZE_60,
    },
    ':last-of-type': {
      marginRight: SPACING.SIZE_60,
    },
    marginRight: SPACING.SIZE_30,
    // width: PRODUCT_WIDTH.BIG,
  },
  brand: {
    alignSelf: 'center',
    marginLeft: SPACING.SIZE_10,
    maxWidth: 25,
    [MQ.M]: {
      maxWidth: 45,
    },
  },
  description: [
    typography.labelHeadline,
    {
      color: COLORS.LIGHT.GRAY_70,
      fontWeight: 'normal',
      marginTop: SPACING.SIZE_10,
    },
  ],
  item: {
    ':first-of-type': {
      marginLeft: SPACING.SIZE_20,
    },
    ':last-of-type': {
      marginRight: SPACING.SIZE_20,
    },
    height: 'auto',
    marginRight: SPACING.SIZE_15,
    width: 'auto',
    // width: PRODUCT_WIDTH.SMALL,
  },
  link: {
    alignItems: 'center',
    display: 'inline-flex',
  },
  linkIcon: {
    marginLeft: SPACING.SIZE_10,
    marginTop: 1,
    svg: {
      width: 10,
      height: 15,
    },
    [MQ.M]: {
      marginTop: 6,
    },
  },
  title: [
    typography.primaryHeadline,
    {
      display: 'flex',
      alignItems: 'center',
      textTransform: 'capitalize',
    },
  ],
  wrapper: {
    '.list-to-compare-carousel': {
      display: 'flex',
    },
    '.swiper-button-next': {
      '::after': {
        display: 'none',
      },
      borderRadius: '50% 0 0 50%',
      display: 'none',
      right: 0,
      [MQ.XL]: [carouselNavBtn],
    },
    '.swiper-button-prev': {
      '::after': {
        display: 'none',
      },
      borderRadius: '0 50% 50% 0',
      display: 'none',
      left: 0,
      [MQ.XL]: [carouselNavBtn],
    },
    '.swiper-slide': {
      display: 'flex',
      width: 'fit-content',
    },
    position: 'relative',
  },
};

export default styles;
