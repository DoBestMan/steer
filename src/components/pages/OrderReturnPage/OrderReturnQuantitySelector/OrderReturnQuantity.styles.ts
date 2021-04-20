import { BORDERS, MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  button: {
    [MQ.L]: {
      width: '100%',
      display: 'block',
    },
  },
  container: {
    paddingBottom: SPACING.SIZE_10,

    [MQ.M]: {
      paddingBottom: 0,
    },
  },
  modalContent: {
    [MQ.L]: {
      height: '100%',
    },
  },
  numberControlsWrapper: {
    marginTop: SPACING.SIZE_30,
    textAlign: 'center',
  },
  pickerContainer: {
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    marginTop: SPACING.SIZE_30,
    padding: `${SPACING.SIZE_30}px 0 ${SPACING.SIZE_40}px`,

    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
      padding: `${SPACING.SIZE_40}px 0 ${SPACING.SIZE_40}px`,
    },
  },
};

export default styles;
