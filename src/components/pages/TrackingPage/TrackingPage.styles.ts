import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  car: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    transform: `translate3D(0, ${SPACING.SIZE_20}, 0)`,
    width: '100%',
  },
  description: [
    typography.largeCopy,
    {
      '> a': {
        borderBottom: `2px dotted ${COLORS.LIGHT.GRAY_70}`,
        transition: 'border-color 100ms ease',
        '&:hover': {
          borderColor: COLORS.GLOBAL.BLACK,
        },
      },
      textAlign: 'center',
    },
  ],
  header: {
    padding: `${SPACING.SIZE_110}px 0 ${SPACING.SIZE_40}px`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_160}px 0 ${SPACING.SIZE_90}px`,
    },
    [MQ.L]: {
      padding: `200px 0 ${SPACING.SIZE_100}px`,
    },
    [MQ.XL]: {
      padding: `230px 0 ${SPACING.SIZE_110}px`,
    },
  },
  illustration: {
    position: 'relative',
  },
  scenery: {
    marginBottom: SPACING.SIZE_20,
    opacity: 0.5,
  },
  title: [
    typography.jumboHeadline,
    {
      paddingBottom: SPACING.SIZE_20,
      textAlign: 'center',
    },
  ],
};

export default styles;
