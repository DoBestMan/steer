import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography, typographyStyles } from '~/styles/typography.styles';

const DIMENTION_ICON = {
  S: {
    width: 14,
    height: 12,
  },
  M: {
    width: 20,
    height: 17,
  },
};

const styles: StylesMap = {
  backButton: {
    '& svg': {
      color: COLORS.GLOBAL.WHITE,
      width: DIMENTION_ICON.S.width,
      height: DIMENTION_ICON.S.height,
      [MQ.M]: {
        width: DIMENTION_ICON.M.width,
        height: DIMENTION_ICON.M.height,
      },
    },
    marginRight: SPACING.SIZE_20,
    minWidth: 'unset',
    [MQ.M]: {
      marginRight: SPACING.SIZE_30,
    },
    [MQ.L]: {
      marginRight: SPACING.SIZE_40,
    },
  },
  clearButton: [
    typography.smallCopy,
    {
      color: COLORS.GLOBAL.BLACK,
      [MQ.L]: [typography.bodyCopy],
      '&:hover': {
        borderBottom: `2px dotted ${COLORS.GLOBAL.BLACK}`,
      },
    },
  ],
  comboboxWrapper: {
    flex: 1,
    height: SPACING.SIZE_30,
    [MQ.M]: {
      height: 'auto',
    },
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
    borderBottom: '1px solid rgba(255, 255, 255, 0.5)',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    input: {
      color: COLORS.GLOBAL.WHITE,
    },
    paddingBottom: SPACING.SIZE_10,
    position: 'relative',
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_15,
    },
    [MQ.L]: {
      paddingBottom: SPACING.SIZE_40,
    },
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
    {
      color: COLORS.ORANGE.TINT_70,
      height: '100%',
      left: 0,
      opacity: 1,
      paddingBottom: SPACING.SIZE_10,
      paddingLeft: SPACING.SIZE_20,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
      [MQ.M]: [
        typography.primaryHeadline,
        {
          paddingBottom: SPACING.SIZE_15,
          paddingLeft: SPACING.SIZE_30,
        },
      ],
      [MQ.L]: {
        paddingLeft: SPACING.SIZE_20,
      },
    },
  ],
  labelHidden: {
    opacity: 0,
  },
  labelWrapper: {
    display: 'flex',
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
