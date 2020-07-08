import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { ratioToPercentage } from '~/lib/utils/number';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  dataContainer: {
    marginTop: SPACING.SIZE_40,

    [MQ.L]: {
      marginTop: 0,
    },
  },
  description: [
    typography.bodyCopy,
    {
      color: COLORS.DARK.GRAY_40,
    },
  ],
  findMyTireSizeLabel: [
    typography.smallCopyTight,
    {
      marginTop: SPACING.SIZE_20,
    },
  ],
  imageContainer: {
    alignItems: 'center',
    display: 'flex',
    height: 0,
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_40,
    overflow: 'hidden',
    paddingBottom: `${ratioToPercentage('16/9')}%`,
    position: 'relative',
    width: '100%',

    [MQ.L]: {
      borderRadius: 15,
    },

    // eslint-disable-next-line sort-keys
    '> div': {
      left: 0,
      position: 'absolute',
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
    },
  },
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      marginBottom: SPACING.SIZE_40,

      [MQ.L]: {
        marginBottom: SPACING.SIZE_15,
      },
    },
  ],
  titleContainer: {
    marginBottom: SPACING.SIZE_40,

    [MQ.L]: {
      marginBottom: SPACING.SIZE_15,
    },
  },
};

export default styles;
