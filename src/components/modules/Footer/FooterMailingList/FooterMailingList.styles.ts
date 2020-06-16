import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  // TODO: build mailing list component
  container: {},
  heading: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,
      [MQ.L]: typography.tertiaryHeadline,
    },
  ],
  text: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
};

export default styles;
