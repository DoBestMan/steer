import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const ICON_SIZE = {
  S: 25,
  M: 30,
  XL: 60,
};

const styles: StylesMap = {
  description: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  icon: {
    '> svg': {
      height: '100%',
      width: '100%',
    },

    height: ICON_SIZE.S,
    marginRight: SPACING.SIZE_05,
    width: ICON_SIZE.S,

    [MQ.M]: {
      height: ICON_SIZE.M,
      width: ICON_SIZE.M,
    },

    [MQ.XL]: {
      height: ICON_SIZE.XL,
      marginRight: SPACING.SIZE_10,
      width: ICON_SIZE.XL,
    },
  },
  item: {
    ':first-of-type button': {
      paddingTop: 0,
      borderTop: 0,
    },
  },
  link: {
    ':hover': {
      color: COLORS.GLOBAL.ORANGE,
    },

    alignItems: 'center',
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_20}px 0`,
    textAlign: 'left',
    width: '100%',

    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px 0`,
    },

    [MQ.XL]: {
      padding: `${SPACING.SIZE_40}px 0`,
    },
  },
  title: [
    typography.secondaryHeadline,
    {
      marginBottom: 3,
    },
  ],
};

export default styles;
