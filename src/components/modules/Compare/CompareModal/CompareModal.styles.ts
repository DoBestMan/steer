import { keyframes } from '@emotion/core';

import { COLORS, SPACING, StylesMap, TIME, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { COLORS as COMPARE_COLORS } from '../Compare.constants';

export const contentCss = {
  overflow: 'auto',
  padding: '0px',
};

const animation = keyframes({
  '0%': {
    width: '100%',
  },
  '100%': {
    width: 'calc(100% - 152px)',
  },
});

const styles: StylesMap = {
  animation: {
    animation: `${animation} ${TIME.MS750}ms linear forwards`,
  },
  caption: [
    typography.eyebrow,
    {
      background: COMPARE_COLORS.bgColor,
      padding: SPACING.SIZE_20,
      paddingLeft: SPACING.SIZE_20,
      position: 'sticky',
      top: 271,
      width: '100%',
      zIndex: Z_INDEX.FRONT - 1,
    },
  ],
  close: {
    position: 'fixed',
    right: SPACING.SIZE_10,
    top: SPACING.SIZE_25,
    zIndex: Z_INDEX.FRONT + 1,
  },
  compareTable: {
    display: 'flex',
    flexDirection: 'column',
  },
  ctaListWrapper: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    background: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    overflowX: 'scroll',
  },
  description: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  header: {
    padding: `${SPACING.SIZE_60}px ${SPACING.SIZE_20}px 0 ${SPACING.SIZE_20}px`,
    width: 'fit-content',
  },
  loadingDots: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  root: {
    overflow: 'hidden auto',
    width: '100%',
    height: '100vh',
  },
  tableListWrapper: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    display: 'flex',
    overflowX: 'scroll',
  },
  tireWithInfoList: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    background: `linear-gradient(360deg, ${COLORS.GLOBAL.ORANGE} 30%, hsla(18, 16%, 53%, 0) 30%)`,
    display: 'flex',
    overflowX: 'scroll',
    position: 'sticky',
    top: 0,
    zIndex: Z_INDEX.FRONT,
  },
  title: [
    typography.secondaryHeadline,
    {
      fontWeight: 'bold',
    },
  ],
};

export default styles;
