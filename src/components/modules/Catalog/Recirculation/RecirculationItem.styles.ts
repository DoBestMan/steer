import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const ICON_SIZE = {
  S: 25,
  M: 32,
  L: 50,
};

const styles: StylesMap = {
  description: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  icon: {
    width: ICON_SIZE.S,

    [MQ.M]: {
      width: ICON_SIZE.M,
    },

    [MQ.L]: {
      width: ICON_SIZE.L,
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
  },
  title: [typography.secondaryHeadline],
};

export default styles;
