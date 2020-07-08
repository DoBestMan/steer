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
    margin: SPACING.SIZE_01, // Helps make the focus state visible
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
          marginRight: SPACING.SIZE_05,
        },
        boxSizing: 'border-box',
        height: ITEM_SIZE.S,
        margin: SPACING.SIZE_01,
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
  selectedItem: {
    border: `3px solid ${COLORS.GLOBAL.ORANGE}`,
    color: COLORS.GLOBAL.ORANGE,
    padding: 0,
  },
  subTitle: typography.smallCopy,
  title: typography.eyebrow,
};

export default styles;
