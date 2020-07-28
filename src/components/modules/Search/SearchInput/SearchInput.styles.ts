import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography, typographyStyles } from '~/styles/typography.styles';

const styles: StylesMap = {
  comboboxWrapper: {
    flexGrow: 1,
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
      [MQ.XL]: {
        paddingTop: SPACING.SIZE_05,
      },
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
      [MQ.M]: [
        typographyStyles.primaryHeadline.M,
        {
          height: 40,
        },
      ],
      [MQ.XL]: typographyStyles.primaryHeadline.XL,
    },
  ],
  label: [
    typography.secondaryHeadline,
    {
      color: COLORS.ORANGE.TINT_70,
      height: '100%',
      left: 0,
      opacity: 1,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      [MQ.M]: typography.primaryHeadline,
    },
  ],
  labelHidden: {
    opacity: 0,
  },
  searchState: {
    flexShrink: 0,
    paddingRight: SPACING.SIZE_05,
    [MQ.M]: {
      paddingRight: SPACING.SIZE_10,
    },
  },
};

export default styles;
