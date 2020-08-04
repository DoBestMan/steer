import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  article: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: `${SPACING.SIZE_10}px 0`,
    position: 'relative',
    width: '100%',
    [MQ.M]: {
      padding: `${SPACING.SIZE_20}px 0`,
    },
  },
  byline: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_02,
    },
  ],
  description: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_10,
      fontWeight: 'normal',
    },
  ],
  hasBorder: {
    borderBottom: BORDERS.SOLID_GRAY_10_1PX,
  },
  header: [
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_02,
    },
    ...typography.secondaryHeadline,
  ],
  headerText: {
    '&::after': {
      content: '""',
      height: '100%',
      left: 0,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
  },
  imageContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    width: '100%',
  },
  textWrapper: {
    [MQ.S]: { marginTop: SPACING.SIZE_10 },
    [MQ.M]: { marginTop: SPACING.SIZE_20 },
  },
};

export default styles;
