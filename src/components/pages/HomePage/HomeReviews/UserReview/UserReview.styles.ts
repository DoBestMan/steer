import {
  COLORS,
  GAP_COLUMNS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';

const avatarSize = {
  large: 60,
  standard: 50,
};

const styles: StylesMap = {
  avatar: {
    borderRadius: RADIUS.CIRCLE,
    height: avatarSize.standard,
    width: avatarSize.standard,

    [MQ.XL]: {
      height: avatarSize.large,
      width: avatarSize.large,
    },
  },
  avatarContainer: {
    marginLeft: 'auto',
  },
  container: {
    alignItems: 'flex-start',
    marginBottom: SPACING.SIZE_40,
  },
  review: {
    color: COLORS.DARK.GRAY_40,

    [MQ.M]: {
      marginRight: GAP_COLUMNS.M * -1,
    },

    [MQ.L]: {
      marginRight: 0,
    },
  },
  title: {
    color: COLORS.GLOBAL.WHITE,
  },
};

export default styles;
