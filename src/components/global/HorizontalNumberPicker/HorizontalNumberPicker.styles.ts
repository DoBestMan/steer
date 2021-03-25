import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const ITEM_SIZE = {
  S: 50,
  M: 60,
  L: 75,
};

const styles: StylesMap = {
  header: {
    alignItems: 'baseline',
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_15,
  },
  innerItem: {
    alignItems: 'center',
    border: BORDERS.SOLID_GRAY_20_1PX,
    borderRadius: RADIUS.CIRCLE,
    color: COLORS.LIGHT.GRAY_70,
    display: 'flex',
    height: 'inherit',
    justifyContent: 'center',
    padding: SPACING.SIZE_02,
    width: 'inherit',
  },
  numberItem: [
    typography.secondaryHeadline,
    {
      '&.swiper-slide': {
        boxSizing: 'border-box',
        height: ITEM_SIZE.L,
        margin: SPACING.SIZE_01,
        width: ITEM_SIZE.L,

        /* eslint-disable sort-keys */
        ':not(:last-child)': {
          marginRight: SPACING.SIZE_10,
        },
        /* eslint-enable sort-keys */
      },
    },
  ],
  numberItemNoCarousel: {
    [MQ.S]: [
      typography.bodyCopy,
      {
        ':not(:last-child)': {
          marginRight: 4,
        },
        boxSizing: 'border-box',
        height: ITEM_SIZE.S,
        width: ITEM_SIZE.S,
      },
    ],
    [MQ.M]: {
      height: ITEM_SIZE.M,
      width: ITEM_SIZE.M,
      ':not(:last-child)': {
        marginRight: SPACING.SIZE_10,
      },
    },
    [MQ.L]: [
      typography.secondaryHeadline,
      {
        height: ITEM_SIZE.L,
        width: ITEM_SIZE.L,
      },
    ],
  },
  quantityButton: [
    typography.secondaryHeadline,
    {
      alignItems: 'center',
      border: BORDERS.SOLID_GRAY_20_1PX,
      borderRadius: RADIUS.CIRCLE,
      color: COLORS.LIGHT.GRAY_70,
      display: 'inline-flex',
      fontSize: '26px',
      fontWeight: 700,
      height: ITEM_SIZE.L,
      justifyContent: 'center',
      marginLeft: SPACING.SIZE_35,
      marginRight: SPACING.SIZE_35,
      width: ITEM_SIZE.L,
    },
  ],
  quantityNumber: [
    typography.secondaryHeadline,
    {
      display: 'inline-flex',
      color: COLORS.GLOBAL.ORANGE,
    },
  ],
  selectedItem: {
    border: `3px solid ${COLORS.GLOBAL.ORANGE}`,
    color: COLORS.GLOBAL.ORANGE,
    padding: 0,
  },
  subTitle: typography.smallCopy,
  title: typography.eyebrow,
};

export default styles;
