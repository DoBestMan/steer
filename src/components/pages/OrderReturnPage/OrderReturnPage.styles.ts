import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';
const styles: StylesMap = {
  checkBox: {
    paddingTop: SPACING.SIZE_50,
  },
  checkboxContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  copyLabel: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginLeft: SPACING.SIZE_10,
    },
  ],
  gridWrapper: {
    [MQ.S]: {
      paddingTop: SPACING.SIZE_60,
    },
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_60,
      paddingTop: 0,
    },
  },
  inputTag: {
    display: 'none',
  },
  orderStatusWrapper: {
    [MQ.M]: {
      padding: `${SPACING.SIZE_160}px 0 ${SPACING.SIZE_90}px`,
    },
    [MQ.L]: {
      padding: `200px 0 ${SPACING.SIZE_100}px`,
    },
    [MQ.XL]: {
      padding: `230px 0 ${SPACING.SIZE_110}px`,
    },
    padding: `${SPACING.SIZE_110}px 0 ${SPACING.SIZE_50}px`,
  },
  radio: {
    marginBottom: SPACING.SIZE_20,
    width: '100%',
  },
  returnOptions: {
    paddingBottom: SPACING.SIZE_25,
  },
  returnOptionsContainer: {
    paddingTop: SPACING.SIZE_20,
  },
  sectionHeader: [
    typography.tertiaryHeadline,
    {
      paddingBottom: SPACING.SIZE_10,
    },
  ],
  sendRequestButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
    paddingBottom: SPACING.SIZE_50,
  },
  submitLoader: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    paddingLeft: SPACING.SIZE_10,
  },
};
export default styles;
