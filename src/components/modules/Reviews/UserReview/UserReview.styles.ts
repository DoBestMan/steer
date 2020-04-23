import { css } from '@emotion/core';

import { COLORS, MQ, GRID_MARGIN } from '~/lib/constants';

const avatarSize = {
  large: 60,
  standard: 50,
};

const styles = {
  avatar: css({
    backgroundPosition: 'center',
    borderRadius: '50%',
    height: avatarSize.standard,
    marginLeft: 'auto',
    width: avatarSize.standard,

    [MQ.XL]: {
      height: avatarSize.large,
      width: avatarSize.large,
    },
  }),
  container: css({
    alignItems: 'flex-start',
    marginBottom: 40,
    width: '100%',
  }),
  review: css({
    color: COLORS.DARK.GRAY_40,

    [MQ.M]: {
      marginRight: GRID_MARGIN.M * -1,
    },

    [MQ.L]: {
      marginRight: 0,
    },
  }),
  title: css({
    color: COLORS.GLOBAL.WHITE,
  }),
};

export default styles;
