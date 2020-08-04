import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  article: {
    borderBottom: BORDERS.SOLID_GRAY_10_1PX,
    display: 'flex',
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
  image: {
    img: {
      objectFit: 'cover',
      height: '100%',
    },
    [MQ.S]: {
      height: 69,
      width: 69,
    },
    [MQ.M]: {
      height: 114,
      width: 205,
    },
    [MQ.XL]: {
      height: 110,
      width: 197,
    },
  },
  imageContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    right: 0,
    top: 0,
    [MQ.S]: {
      height: 69,
      width: 69,
    },
    [MQ.M]: {
      height: 114,
      width: 205,
    },
    [MQ.XL]: {
      height: 110,
      width: 197,
    },
  },
  textWrapper: {
    [MQ.S]: { marginRight: SPACING.SIZE_20 },
    [MQ.M]: { marginRight: SPACING.SIZE_40 },
    [MQ.XL]: { marginRight: SPACING.SIZE_120 },
  },
};

export default styles;
