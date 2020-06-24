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
    typography.largeCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
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
    width: 150,
  },
  link: {
    display: 'inline-flex',
  },
  linkIcon: {
    marginLeft: SPACING.SIZE_10,
    marginTop: SPACING.SIZE_10,
    svg: {
      width: 10,
      height: 15,
    },
  },
  title: [
    typography.primaryHeadline,
    {
      display: 'flex',
      alignItems: 'center',
    },
  ],
};

export default styles;
