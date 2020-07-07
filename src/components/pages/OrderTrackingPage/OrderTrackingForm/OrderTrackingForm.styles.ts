import { MQ, SPACING, StylesMap } from '~/lib/constants';

const CONSTANTS = {
  ROOT_MAX_WIDTH: 420,
  SUBMIT_BUTTON_WIDTH: 140,
};

const styles: StylesMap = {
  input: {
    paddingBottom: SPACING.SIZE_10,
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_20,
    },
  },
  root: {
    margin: '0 auto',
    maxWidth: CONSTANTS.ROOT_MAX_WIDTH,
    paddingBottom: SPACING.SIZE_50,
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_110,
    },
  },
  submitButton: {
    justifyContent: 'center',
    minWidth: CONSTANTS.SUBMIT_BUTTON_WIDTH,
  },
  submitButtonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: SPACING.SIZE_30,
  },
};

export default styles;
