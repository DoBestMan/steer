import { COLORS, GRID_MARGIN, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
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
    [MQ.M]: { width: 200 },
    [MQ.XL]: { width: 300 },

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
    '.product-carousel': {
      display: 'flex',
    },
  },
};

export default styles;
