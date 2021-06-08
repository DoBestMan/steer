import { keyframes } from '@emotion/core';

import {
  COLORS,
  EASING,
  MQ,
  SPACING,
  StylesMap,
  THEME,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const hideAnimation = keyframes({
  '0%': {},
  '100%': {
    transform: 'translateY(85px)',
  },
});

const styles: StylesMap = {
  bigScreen: {
    left: 'auto',
    right: SPACING.SIZE_60,
    width: '375px',
  },
  button: [
    typography.smallCopyTight,
    {
      '& > span': {
        paddingLeft: SPACING.SIZE_05,
      },
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      height: 'fit-content',
      justifyContent: 'center',
    },
  ],
  buttonWrapper: {
    padding: `0px ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px`,
    [MQ.M]: {
      display: 'flex',
      alignItems: 'flex-end',
      paddingBottom: SPACING.SIZE_40,
      paddingRight: SPACING.SIZE_40,
    },
    [MQ.XL]: {
      padding: `0px ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px`,
    },
  },
  carousel: {
    marginBottom: SPACING.SIZE_20,
    [MQ.M]: {
      width: '76%',
    },
    [MQ.XL]: {
      width: '100%',
    },
  },
  compareButton: {
    width: '100%',
    justifyContent: 'center',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    [MQ.M]: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    [MQ.XL]: {
      flexDirection: 'column',
    },
  },
  drawer: {
    borderRadius: `${SPACING.SIZE_15}px  ${SPACING.SIZE_15}px 0 0`,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_30}px  ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px`,
    transition: `color ${TIME.MS500}ms ${EASING.LINEAR}`,

    [MQ.M]: {
      padding: `${SPACING.SIZE_30}px  ${SPACING.SIZE_40}px ${SPACING.SIZE_20}px ${SPACING.SIZE_40}px`,
    },
    [MQ.XL]: {
      padding: `${SPACING.SIZE_30}px  ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px`,
    },
  },
  hideAnimation: {
    ['& [id="compare-drawer"]']: {
      animation: `${hideAnimation} ${TIME.MS750}ms linear forwards`,
    },
  },
  notification: {
    padding: `0px  ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px`,
    [MQ.M]: {
      padding: `0px  ${SPACING.SIZE_40}px ${SPACING.SIZE_20}px ${SPACING.SIZE_40}px`,
    },
    [MQ.XL]: {
      padding: `0px  ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px ${SPACING.SIZE_20}px`,
    },
  },
  subtitle: [typography.smallCopy],
  title: [typography.eyebrow],
};

export const tStyles = {
  [THEME.LIGHT]: {
    header: {
      color: COLORS.GLOBAL.BLACK,
    },
    drawer: {
      background: COLORS.GLOBAL.WHITE,
    },
  },
  [THEME.ORANGE]: {
    header: {
      color: COLORS.GLOBAL.WHITE,
    },
    drawer: {
      background: COLORS.GLOBAL.ORANGE,
    },
  },
};

export default styles;
