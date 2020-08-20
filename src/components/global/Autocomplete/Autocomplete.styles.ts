import {
  BORDERS,
  COLORS,
  MQ,
  SPACING,
  StylesMap,
  Z_INDEX,
} from '~/lib/constants';
import { disableGlobalFocus } from '~/styles/document/accessibility.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  actionIcon: {
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
  },
  clearSearch: [
    typography.labelCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  comboboxWrapper: {
    width: '100%',
  },
  errorMessage: typography.labelHeadlineLarge,
  input: [
    typography.secondaryHeadline,
    disableGlobalFocus,
    {
      backgroundColor: 'inherit',
      border: 'none',
      padding: 0,
      width: '100%',
    },
  ],
  inputContainer: {
    alignItems: 'center',
    borderBottom: BORDERS.SOLID_BLACK_1PX,
    display: 'flex',
    paddingBottom: SPACING.SIZE_15,
    position: 'relative',
    [MQ.M]: {
      borderBottom: BORDERS.SOLID_BLACK_1PX,
      paddingBottom: SPACING.SIZE_15,
    },
  },
  label: [
    typography.secondaryHeadline,
    {
      color: COLORS.LIGHT.GRAY_70,
      left: 0,
      opacity: 1,
      pointerEvents: 'none',
      position: 'absolute',
      top: 0,
    },
  ],
  labelHidden: {
    opacity: 0,
  },
  listbox: {
    listStyle: 'none',
    zIndex: Z_INDEX.FRONT,
  },
};

export default styles;
