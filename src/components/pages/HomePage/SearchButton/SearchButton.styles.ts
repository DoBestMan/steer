import { css } from '@emotion/core';

import { CONTENT_PADDING } from '~/components/pages/HomePage/HomePage.styles';
import { COLORS, GRID_MARGIN, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  ICON_SIZE_L: 34,
  PADDING: {
    /* eslint-disable sort-keys */
    S: `25px ${GRID_MARGIN.S}px`,
    M: `30px ${GRID_MARGIN.M}px`,
    L: `30px ${GRID_MARGIN.L}px 30px 86px`,
    /* eslint-enable sort-keys */
  },
};

const styles = {
  button: [
    typography.primaryHeadline,
    css({
      alignItems: 'center',
      boxSizing: 'border-box',
      color: COLORS.GLOBAL.WHITE,
      display: 'flex',
      justifyContent: 'space-between',
      padding: CONSTANTS.PADDING.S,
      position: 'relative',
      width: '100%',

      [MQ.M]: {
        padding: CONSTANTS.PADDING.M,
      },

      [MQ.L]: {
        flexDirection: 'row-reverse',
        justifyContent: 'flex-end',
        padding: CONSTANTS.PADDING.L,
      },

      // eslint-disable-next-line sort-keys
      '&:after': {
        backgroundColor: COLORS.DARK.GRAY_40,
        bottom: 0,
        content: '""',
        display: 'inline',
        height: 1,
        left: 0,
        position: 'absolute',
        width: '100%',
      },
    }),
  ],
  container: css({
    paddingBottom: 160 + CONTENT_PADDING.S,

    [MQ.M]: {
      paddingBottom: 240 + CONTENT_PADDING.M,
    },
    [MQ.L]: {
      paddingBottom: 190 + CONTENT_PADDING.M,
    },
    [MQ.L]: {
      paddingBottom: 190 + CONTENT_PADDING.XL,
    },
  }),
  icon: css({
    svg: {
      display: 'block',
      fill: COLORS.GLOBAL.WHITE,

      [MQ.M]: {
        height: CONSTANTS.ICON_SIZE_L,
        width: CONSTANTS.ICON_SIZE_L,
      },

      [MQ.L]: {
        marginRight: SPACING.SIZE_60,
      },
    },
  }),
};

export default styles;
