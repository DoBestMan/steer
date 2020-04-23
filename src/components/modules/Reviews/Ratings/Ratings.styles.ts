import { css } from '@emotion/core';

import { COLORS, MQ } from '~/lib/constants';

const iconMargin = {
  span: {
    display: 'inline-block',
    height: 20,
    marginLeft: 4,
  },
};

const styles = {
  container: css({
    margin: '40px 0',
    width: '100%',

    [MQ.M]: {
      margin: '20px 0',
    },
  }),
  greyStars: css({
    ...iconMargin,
    color: COLORS.DARK.GRAY_40,
    display: 'flex',
  }),
  orangeStars: css({
    ...iconMargin,
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
  }),
  rating: css({
    color: COLORS.GLOBAL.ORANGE,
    marginLeft: 10,
  }),
  ratingContainer: css({
    alignItems: 'center',
    display: 'flex',
    position: 'relative',
  }),
  ratingCopy: css({
    ...iconMargin,
    alignItems: 'center',
    color: COLORS.DARK.GRAY_40,
    display: 'flex',
  }),
  starContainer: css({
    marginLeft: -4,
    position: 'relative',
  }),
  title: css({
    color: COLORS.GLOBAL.WHITE,
  }),
};

export default styles;
