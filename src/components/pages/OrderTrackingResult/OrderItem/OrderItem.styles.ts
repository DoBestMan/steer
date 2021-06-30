import { MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  dropdownIcon: {
    height: 5,
    marginLeft: SPACING.SIZE_05,
    marginTop: SPACING.SIZE_02,
    width: 8,
  },
  reorderButton: {
    [MQ.M]: {
      width: '60%',
    },
    [MQ.L]: {
      width: '90%',
    },
    [MQ.XL]: {
      width: '90%',
    },
    display: 'flex',
    justifyContent: 'center',
    marginTop: SPACING.SIZE_10,
    width: '90%',
  },
  submitLoader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    padding: `${SPACING.SIZE_20}px 0px`,
  },
};
export default styles;
