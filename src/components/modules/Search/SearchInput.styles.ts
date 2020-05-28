import { css, CSSObject } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography, typographyStyles } from '~/styles/typography.styles';

const styles: CSSObject = {
  comboboxWrapper: {
    flexGrow: 1,
    flexShrink: 0,
  },
  inactive: {
    color: COLORS.ORANGE.TINT_70,
    input: {
      color: COLORS.ORANGE.TINT_70,
    },
  },
  input: [
    disableGlobalFocus,
    {
      width: '100%',
    },
  ],
  inputContainer: {
    alignItems: 'center',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    input: {
      color: COLORS.GLOBAL.WHITE,
    },
    position: 'relative',
  },
  inputText: [
    typography.secondaryHeadline,
    {
      backgroundColor: 'inherit',
      border: 'none',
      padding: 0,
      [MQ.M]: typographyStyles.primaryHeadline.M,
      [MQ.XL]: typographyStyles.primaryHeadline.XL,
    },
  ],
  label: [
    typography.secondaryHeadline,
    css({
      color: COLORS.ORANGE.TINT_70,
      left: 0,
      opacity: 1,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      [MQ.M]: typography.primaryHeadline,
    }),
  ],
  labelHidden: {
    opacity: 0,
  },
  searchState: {
    flexShrink: 0,
    paddingRight: SPACING.SIZE_05,
  },
};

export default styles;
