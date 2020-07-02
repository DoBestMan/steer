import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  dataContainer: [
    typography.bodyCopy,
    {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: SPACING.SIZE_40,
      width: '50%',
    },
  ],
  height100: {
    height: '100%',
  },
  page: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  root: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    minHeight: '100vh',
    paddingBottom: SPACING.SIZE_40,
  },
  textArea: {
    marginTop: SPACING.SIZE_10,
    padding: SPACING.SIZE_10,
    width: '100%',
  },
};

export default styles;
