import {
  BORDERS,
  COLORS,
  GRID_MARGIN,
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
  pageItem: [
    typography.bodyCopy,
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
        ':first-of-type': {
          marginLeft: GRID_MARGIN.S,
          [MQ.M]: { marginLeft: GRID_MARGIN.M },
          [MQ.L]: { marginLeft: GRID_MARGIN.L },
          [MQ.XL]: { marginLeft: GRID_MARGIN.XL },
        },

        ':last-of-type': {
          marginRight: GRID_MARGIN.S,
          [MQ.M]: { marginRight: GRID_MARGIN.M },
          [MQ.L]: { marginRight: GRID_MARGIN.L },
          [MQ.XL]: { marginRight: GRID_MARGIN.XL },
        },
        /* eslint-enable sort-keys */
      },
      '&:hover:not([aria-current="true"]) span': {
        border: `2px solid ${COLORS.LIGHT.GRAY_70}`,
        color: COLORS.GLOBAL.BLACK,
        fontWeight: 'bold',
      },
      '&:focus:not([aria-current="true"]) span': {
        border: `2px solid ${COLORS.GLOBAL.BLACK}`,
        color: COLORS.GLOBAL.BLACK,
        fontWeight: 'bold',
      },
    },
  ],
  selectedItem: {
    border: `3px solid ${COLORS.GLOBAL.ORANGE}`,
    color: COLORS.GLOBAL.ORANGE,
    fontWeight: 'bold',
    padding: 0,
  },
};

export default styles;
