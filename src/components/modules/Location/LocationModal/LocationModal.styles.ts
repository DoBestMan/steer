import { CSSObjectType, SPACING, StylesMap, TIME } from '~/lib/constants';
import { slideFadeInLeft, slideFadeOutLeft } from '~/styles/animations.styles';

export const SLIDE_LEFT: CSSObjectType = {
  default: {
    animation: `${slideFadeOutLeft} ${TIME.MS350}ms ease-in`,
  },
  open: {
    animation: `${slideFadeInLeft} ${TIME.MS350}ms ease-in`,
  },
};

const styles: StylesMap = {
  closeButton: {
    marginLeft: 'auto',
    marginRight: -SPACING.SIZE_10,
    padding: SPACING.SIZE_10,
  },
  container: {
    height: '100%',
    paddingTop: SPACING.SIZE_120,
  },
  header: {
    display: 'flex',
    marginBottom: SPACING.SIZE_80,
  },
};

export default styles;
