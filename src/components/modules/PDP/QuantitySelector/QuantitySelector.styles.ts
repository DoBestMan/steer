import { CSSObject } from '@emotion/core';

import { BORDERS, COLORS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { getResponsiveModalStyles } from './QuantitySelector.utils';

const styles: CSSObject = {
  carouselStyles: getResponsiveModalStyles(),
  container: {
    paddingTop: SPACING.SIZE_30,
    textAlign: 'center',
  },
  copy: [typography.smallCopy],
  copyConfirmation: {
    marginBottom: SPACING.SIZE_50,
  },
  cta: {
    display: 'flex',
    justifyContent: 'center',

    '> :only-child': {
      padding: `0 ${SPACING.SIZE_70}px`,
    },
    '> :not(:only-child):first-of-type': {
      marginRight: SPACING.SIZE_10,
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
  pickerContainer: {
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    marginTop: SPACING.SIZE_30,
    padding: `${SPACING.SIZE_30}px 0 ${SPACING.SIZE_40}px`,
  },
  subtitle: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_05,
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
