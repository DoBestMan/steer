import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

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
        height: '350px',
      },
    },
    '.swiper-button-next': {
      '::after': {
        display: 'none',
      },
      display: 'none',
      [MQ.L]: {
        color: COLORS.GLOBAL.ORANGE,
        display: 'block',
        right: '39%',
        top: '530px',
      },
      [MQ.XL]: {
        right: '44%',
        top: '530px',
      },
      // disabling sort-key rule, as this needs to be below other media queries to properly override css
      // eslint-disable-next-line
      ['@media (min-width: 1500px)']: {
        right: '45%',
      },
    },
    '.swiper-button-prev': {
      '::after': {
        display: 'none',
      },
      display: 'none',
      [MQ.L]: {
        color: COLORS.GLOBAL.ORANGE,
        display: 'block',
        left: '42%',
        top: '530px',
      },
      [MQ.XL]: {
        left: '43%',
        top: '530px',
      },
      // disabling sort-key rule, as this needs to be below other media queries to properly override css
      // eslint-disable-next-line
      ['@media (min-width: 1500px)']: {
        left: '44%',
      },
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
