import { COLORS, MQ, RADIUS, SPACING, StylesMap } from '~/lib/constants';

const carouselNavBtn = {
  '&.swiper-button-disabled': {
    display: 'none',
  },
  '&:hover': {
    background: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
  },
  background: COLORS.GLOBAL.WHITE,
  borderRadius: '100%',
  boxShadow: `0px 0 20px ${COLORS.GLOBAL.GRAY_50}`,
  color: COLORS.GLOBAL.ORANGE,
  display: 'flex',
  height: '93px',
  right: '4%',
  svg: {
    height: '18px',
    width: '11px',
  },
  top: '40%',
  width: '93px',
};

const styles: StylesMap = {
  container: {
    '.carousel-pagination': {
      '&.swiper-pagination-bullets-dynamic': {
        transform: 'translateX(30%)',

        [MQ.L]: {
          transform: 'translateX(-10%)',
        },
        [MQ.XL]: {
          transform: 'translateX(-28%)',
        },
      },
      '.swiper-pagination-bullet': {
        background: COLORS.GLOBAL.ORANGE,
        width: '20px',
        height: '2px',
        borderRadius: '0',
      },
      height: '10px',
      margin: `${SPACING.SIZE_40}px auto ${SPACING.SIZE_20}px`,
      textAlign: 'center',
    },
    '.product-card-carousel': {
      display: 'flex',

      ['[data-component="promotion-card-body"]']: {
        height: '434px',
      },
      ['[data-component="promotion-card-image"]']: {
        backgroundColor: COLORS.LIGHT.GRAY_10,
        borderTopLeftRadius: RADIUS.RADIUS_15,
        borderTopRightRadius: RADIUS.RADIUS_15,
        height: '113px',
        overflow: 'hidden',
        [MQ.M]: {
          height: '125px',
        },
      },
    },
    '.swiper-button-next': {
      '::after': {
        display: 'none',
      },
      display: 'none',
      [MQ.L]: [carouselNavBtn],
    },
    '.swiper-button-prev': {
      '::after': {
        display: 'none',
      },
      display: 'none',
      [MQ.L]: [carouselNavBtn],
    },
  },
  '[data-component="promotion-card"]': {
    width: '345px',
  },
  item: {
    '&:first-of-type': {
      marginLeft: SPACING.SIZE_10,
      [MQ.M]: {
        marginLeft: SPACING.SIZE_20,
      },
      [MQ.L]: {
        marginLeft: SPACING.SIZE_40,
      },
    },
    width: '310px',
    [MQ.M]: {
      width: '345px',
    },
  },
};

export default styles;
