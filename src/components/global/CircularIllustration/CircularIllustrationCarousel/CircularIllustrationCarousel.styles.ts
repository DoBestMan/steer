import { COLORS, GRID_MARGIN, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const ITEM_SIZES = {
  SMALL: 155,
  MEDIUM: 215,
  XLARGE: 220,
};
const styles: StylesMap = {
  carousel: {
    '.illustration-carousel': {
      display: 'flex',
    },
  },
  item: {
    [MQ.S]: { width: ITEM_SIZES.SMALL },
    [MQ.M]: { width: ITEM_SIZES.MEDIUM },
    [MQ.XL]: { width: ITEM_SIZES.XLARGE },

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
    height: 'auto',
    width: 150,
  },
  removeBackground: {
    background: 'none',
  },
  root: {
    padding: `${SPACING.SIZE_60}px 0`,
    backgroundColor: COLORS.LIGHT.GRAY_10,
  },
  subTitle: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginTop: SPACING.SIZE_20,
    },
  ],
  title: [typography.primaryHeadline],
};
export const customStyles: StylesMap = {
  carouselItem: {
    marginBottom: SPACING.SIZE_20,
  },
};
export default styles;
