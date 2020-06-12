import { CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { hideScrollbar } from '~/styles/document/accessibility.styles';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  button: {
    marginRight: SPACING.SIZE_05,
    position: 'relative',
    whiteSpace: 'nowrap',
  },
  disableScroll: {
    overflowX: 'hidden',
  },
  filterLabel: [
    typography.labelCopyTight,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_15,
    },
  ],
  filterList: {
    display: 'flex',
    width: 'fit-content',
    [MQ.S]: {
      padding: `0 ${SPACING.SIZE_20}px`,
    },
    [MQ.M]: {
      padding: `0 ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `0 ${SPACING.SIZE_60}px`,
    },
  },
  listContainer: [
    hideScrollbar,
    {
      boxSizing: 'content-box',
      overflowX: 'auto',
      [MQ.S]: {
        margin: `0 ${-SPACING.SIZE_20}px`,
      },
      [MQ.M]: {
        margin: `0 ${-SPACING.SIZE_40}px`,
      },
      [MQ.L]: {
        margin: `0 ${-SPACING.SIZE_60}px`,
      },
    },
  ],
};

export default styles;
