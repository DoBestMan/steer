import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const PICKER_MAX_WIDTH = {
  M: 420,
  L: 510,
};

// These height and widths need to subtract the border to
// prevent some whitespace from showing through
const VEHICLE_BUTTON = {
  HEIGHT: `calc(100% - ${SPACING.SIZE_02}px)`,
  WIDTH: `calc(100% - ${SPACING.SIZE_20}px - ${SPACING.SIZE_02}px)`,
};

const styles: StylesMap = {
  buttonGroup: {
    border: 'none',
    textAlign: 'center',
    [MQ.L]: {
      textAlign: 'left',
    },
  },
  group: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    paddingBottom: SPACING.SIZE_40,
    paddingTop: SPACING.SIZE_40,
    [MQ.L]: {
      paddingBottom: SPACING.SIZE_80,
      paddingTop: SPACING.SIZE_80,
    },
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
    marginTop: SPACING.SIZE_20,
    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
    },
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
      paddingBottom: SPACING.SIZE_40,
      [MQ.L]: {
        paddingBottom: SPACING.SIZE_80,
      },
    },
  ],

  titleTire: {
    color: COLORS.GLOBAL.ORANGE,
    display: 'block',
  },
  vehicleClearSearch: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginTop: SPACING.SIZE_15,
    },
  ],
  vehicleInput: {
    position: 'relative',
  },
  vehicleSearchButton: {
    alignItems: 'center',
    border: BORDERS.SOLID_TRANSPARENT_2PX,
    borderRadius: RADIUS.RADIUS_15,
    display: 'flex',
    height: VEHICLE_BUTTON.HEIGHT,
    justifyContent: 'flex-end',
    outline: 0,
    paddingRight: SPACING.SIZE_20,
    position: 'absolute',
    textAlign: 'right',
    top: 0,
    width: VEHICLE_BUTTON.WIDTH,
    // eslint-disable-next-line sort-keys
    '&:focus': {
      borderColor: COLORS.GLOBAL.ORANGE,
    },
  },
};

export default styles;
