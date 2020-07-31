import { SPACING, StylesMap } from '~/lib/constants';
import { links } from '~/styles/links.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  infoLink: [
    typography.smallCopyTight,
    links.light,
    {
      cursor: 'pointer',
      width: 'fit-content',
    },
  ],
  roomForModalCloseButton: {
    marginRight: SPACING.SIZE_30,
  },
};

export default styles;
