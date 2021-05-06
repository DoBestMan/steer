import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  article: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'relative',
    width: '100%',
  },
  byline: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  eyebrow: [
    typography.eyebrow,
    {
      marginBottom: SPACING.SIZE_10,
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  imageContainer: {
    alignItems: 'flex-start',
    display: 'flex',
    marginBottom: SPACING.SIZE_40,
  },
  subTitle: [
    typography.largeCopy,
    {
      marginBottom: SPACING.SIZE_20,
      fontWeight: 'normal',
      textAlign: 'center',
    },
  ],
  textWrapper: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    [MQ.S]: { marginTop: SPACING.SIZE_10, padding: `0 ${SPACING.SIZE_20}px` },
    [MQ.M]: { marginTop: SPACING.SIZE_20 },
  },
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_20,
      textAlign: 'center',
    },
  ],
};

export default styles;
