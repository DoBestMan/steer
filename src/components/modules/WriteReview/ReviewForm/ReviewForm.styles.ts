import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const PICKER_MAX_WIDTH = {
  M: 420,
  L: 510,
};

const styles: StylesMap = {
  group: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    paddingBottom: SPACING.SIZE_80,
    paddingTop: SPACING.SIZE_80,
  },
  groupDescription: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingBottom: SPACING.SIZE_40,
    },
  ],
  groupTitle: [
    typography.primaryHeadline,
    {
      paddingBottom: SPACING.SIZE_20,
    },
  ],

  input: {
    marginBottom: SPACING.SIZE_20,
  },
  label: [
    typography.tertiaryHeadline,
    {
      paddingBottom: SPACING.SIZE_20,
      display: 'block',
    },
  ],
  picker: {
    ':first-of-type': {
      marginTop: SPACING.SIZE_20,
    },
    ':not(:last-of-type)': {
      marginBottom: SPACING.SIZE_40,
    },
  },
  pickerContainer: {
    [MQ.M]: {
      maxWidth: PICKER_MAX_WIDTH.M,
    },
    [MQ.L]: {
      maxWidth: PICKER_MAX_WIDTH.L,
    },
  },
  radioGroup: {
    marginTop: SPACING.SIZE_40,
    'label:not(:last-of-type)': {
      marginBottom: SPACING.SIZE_20,
    },
  },
  subTitle: {
    marginRight: SPACING.SIZE_05,
  },
  title: [
    typography.primaryHeadline,
    {
      paddingBottom: SPACING.SIZE_80,
    },
  ],
  titleTire: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'block',
  },
};

export default styles;
