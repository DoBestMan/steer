import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { getResponsiveModalStyles } from './QuantitySelector.utils';

const styles: CSSObject = {
  button: {
    [MQ.L]: {
      width: '100%',
      display: 'block',
    },
  },
  carouselStyles: getResponsiveModalStyles(),
  container: {
    paddingTop: SPACING.SIZE_30,
    textAlign: 'center',

    [MQ.L]: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingBottom: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_60,
    },
  },
  copy: [
    typography.smallCopy,
    {
      [MQ.L]: {
        br: {
          display: 'none',
        },
      },
    },
  ],
  copyConfirmation: {
    marginBottom: SPACING.SIZE_50,
  },
  cta: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',

    /* eslint-disable sort-keys */
    '> :only-child': {
      width: '100%',
      display: 'block',
    },
    '> :not(:only-child):first-of-type': {
      marginLeft: SPACING.SIZE_10,

      [MQ.L]: {
        marginLeft: 0,
        marginBottom: SPACING.SIZE_10,
      },
    },
    /* eslint-enable sort-keys */

    [MQ.L]: {
      display: 'block',
      marginTop: 'auto',
    },
  },
  decorator: {
    ':before': {
      padding: `0 ${SPACING.SIZE_02}px`,
      content: '"•"',
      fontSize: 8,
    },
  },
  icon: {
    color: COLORS.GLOBAL.ORANGE,
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_10,
  },
  modalContentStyles: {
    height: '100%',
  },
  pickerContainer: {
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    marginTop: SPACING.SIZE_30,
    padding: `${SPACING.SIZE_30}px 0 ${SPACING.SIZE_40}px`,
  },
  subtitle: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_05,

      [MQ.L]: {
        br: {
          display: 'none',
        },
      },
    },
  ],
  title: [
    typography.secondaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
      marginBottom: SPACING.SIZE_30,
    },
  ],
};

export default styles;
