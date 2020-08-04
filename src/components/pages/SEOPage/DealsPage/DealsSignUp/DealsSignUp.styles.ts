import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  SUBMIT_ICON_HEIGHT: 12,
  SUBMIT_ICON_WIDTH: 15,
};

const styles: StylesMap = {
  // TODO: build mailing list component
  container: {},
  emailInput: {
    paddingRight: SPACING.SIZE_40,
    [MQ.M]: {
      paddingRight: SPACING.SIZE_40,
    },
  },
  heading: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_10,
      [MQ.L]: typography.tertiaryHeadline,
    },
  ],
  inputContainer: {
    position: 'relative',
  },
  submitButton: {
    padding: SPACING.SIZE_05,
    position: 'absolute',
    right: SPACING.SIZE_15,
    svg: {
      height: CONSTANTS.SUBMIT_ICON_HEIGHT,
      width: CONSTANTS.SUBMIT_ICON_WIDTH,
    },
    top: SPACING.SIZE_25,
  },
  text: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_20,
    },
  ],
  toast: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_20,
    },
  },
};

export default styles;
