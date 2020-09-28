import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
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
  relative: {
    position: 'relative',
  },
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
      paddingTop: SPACING.SIZE_40,
      paddingBottom: SPACING.SIZE_20,
    },
  ],
};

export default styles;
