import { COLORS, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  attachFile: {
    opacity: 0,
    position: 'absolute',
    zIndex: Z_INDEX.BEHIND,
  },
  buttonSection: {
    display: 'flex',
    justifyContent: 'center',
  },
  group: {
    paddingBottom: SPACING.SIZE_20,
    paddingTop: SPACING.SIZE_20,
  },
  input: {
    marginBottom: SPACING.SIZE_20,
  },
  label: [
    typography.tertiaryHeadline,
    {
      paddingBottom: SPACING.SIZE_20,
      display: 'block',
      '& span': {
        borderBottom: `2px dotted ${COLORS.LIGHT.GRAY_70}`,
      },
    },
  ],
  link: {
    display: 'inline-block',
    color: COLORS.GLOBAL.BLACK,
  },
  radioGroup: {
    marginTop: SPACING.SIZE_40,
    'label:not(:last-of-type)': {
      marginBottom: SPACING.SIZE_20,
    },
  },
  relative: {
    position: 'relative',
  },
  subjectOptional: [
    typography.bodyCopy,
    {
      fontWeight: 450,
      color: COLORS.GLOBAL.BLACK,
    },
  ],
  subjectTitle: [
    typography.tertiaryHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_20,
    },
  ],
  submitButton: {
    display: 'flex',
    flex: '1 1 auto',
    justifyContent: 'center',
  },
  subTitle: {
    marginRight: SPACING.SIZE_05,
  },
  title: [
    typography.primaryHeadline,
    {
      paddingBottom: SPACING.SIZE_20,
    },
  ],
};

export default styles;