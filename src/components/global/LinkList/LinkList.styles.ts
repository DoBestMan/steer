import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  title: [
    typography.bodyCopy,
    {
      fontWeight: 'bold',
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_10,
    },
  ],
  list: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  link: {
    marginBottom: SPACING.SIZE_10,
    marginRight: SPACING.SIZE_20,
  },
};

export default styles;
