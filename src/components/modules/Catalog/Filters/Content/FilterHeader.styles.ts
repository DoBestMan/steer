import { BORDERS, COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  infoLink: [
    typography.smallCopyTight,
    {
      borderBottom: BORDERS.DOTTED_GRAY_40_2PX,
      borderColor: COLORS.LIGHT.GRAY_70,
      color: COLORS.LIGHT.GRAY_70,
      cursor: 'pointer',
      width: 'fit-content',
    },
  ],
  roomForModalCloseButton: {
    marginRight: SPACING.SIZE_30,
  },
};

export default styles;
