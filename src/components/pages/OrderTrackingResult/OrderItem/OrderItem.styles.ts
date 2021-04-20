import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';
const CONSTANTS = {
  IMAGE_MAX_WIDTH: 120,
};
const styles: StylesMap = {
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  content: {
    gridColumn: '2 / 5',
    marginLeft: SPACING.SIZE_20,
  },
  dropdownIcon: {
    height: 5,
    marginLeft: SPACING.SIZE_05,
    marginTop: SPACING.SIZE_02,
    width: 8,
  },
  image: {
    maxWidth: CONSTANTS.IMAGE_MAX_WIDTH,
  },
  imageWrapper: {
    gridColumn: '1 / 2',
  },
  name: [typography.primarySubhead, { color: COLORS.LIGHT.GRAY_70 }],
  quantity: [typography.bodyCopyTight, { color: COLORS.LIGHT.GRAY_70 }],
  reorderButton: {
    backgroundColor: COLORS.GLOBAL.WHITE,
    marginRight: SPACING.SIZE_05,
  },
  reorderButtonWrapper: {
    display: 'flex',
    paddingTop: SPACING.SIZE_10,
  },
  submitLoader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: SPACING.SIZE_02,
  },
  wrapper: {
    alignItems: 'center',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
  },
};
export default styles;
