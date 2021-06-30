import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  buttonContainer: {
    width: '100%',
  },
  container: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'left',
  },
  description: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  hoveredText: {
    color: COLORS.GLOBAL.ORANGE,
  },
  icon: {
    height: SPACING.SIZE_50,
    maxWidth: SPACING.SIZE_30,
  },
  iconContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    marginRight: SPACING.SIZE_20,
    width: 30,
  },
  linebreaker: {
    backgroundColor: COLORS.LIGHT.GRAY_20,
    height: SPACING.SIZE_01,
    width: '100%',
  },
  title: [
    typography.labelCopy,
    {
      color: COLORS.GLOBAL.BLACK,
    },
  ],
  titleContainer: {
    padding: SPACING.SIZE_20,
  },
};

export default styles;
