import { css } from '@emotion/core';

import { BORDERS, COLORS, MQ, SPACING, Z_INDEX } from '~/lib/constants';
import { typography, typographyStyles } from '~/styles/typography.styles';

const styles = {
  actionIcon: css({
    [MQ.S]: {
      display: 'none',
    },
    [MQ.M]: {
      display: 'inherit',
      svg: {
        display: 'block',
        height: SPACING.SIZE_20,
        width: SPACING.SIZE_20,
      },
    },
  }),
  clearSearch: [
    typography.smallCopyTight,
    css({
      color: COLORS.LIGHT.GRAY_70,
      [MQ.M]: typography.bodyCopy,
      [MQ.XL]: typography.largeCopy,
    }),
  ],
  comboboxWrapper: css({
    width: '100%',
  }),
  errorMessage: typography.primaryHeadline,
  input: [
    typography.secondaryHeadline,
    css({
      backgroundColor: 'inherit',
      border: 'none',
      padding: 0,
      width: '100%',

      [MQ.M]: typography.primaryHeadline,
      [MQ.XL]: typography.secondaryHeadline,
    }),
  ],
  inputContainer: css({
    alignItems: 'center',
    borderBottom: BORDERS.SOLID_BLACK_1PX,
    display: 'flex',
    paddingBottom: SPACING.SIZE_15,
    position: 'relative',
    [MQ.M]: {
      borderBottom: BORDERS.SOLID_BLACK_1PX,
      paddingBottom: SPACING.SIZE_15,
    },
  }),
  label: [
    typography.secondaryHeadline,
    css({
      color: COLORS.LIGHT.GRAY_70,
      left: 0,
      opacity: 1,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      [MQ.M]: typographyStyles.primaryHeadline.M,
      [MQ.XL]: typographyStyles.secondaryHeadline.XL,
    }),
  ],
  labelHidden: css({
    opacity: 0,
  }),
  listbox: css({
    listStyle: 'none',
    zIndex: Z_INDEX.FRONT,
  }),
};

export default styles;
