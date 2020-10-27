import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    [MQ.L]: {
      transform: `translate(-${SPACING.SIZE_30}px, ${SPACING.SIZE_05}px)`,
    },
    [MQ.XL]: {
      transform: 'translateY(0px)',
    },
  },
  title: [
    typography.eyebrow,
    {
      color: COLORS.GLOBAL.BLACK,
      whiteSpace: 'nowrap',
      marginRight: SPACING.SIZE_25,
      [MQ.M]: {
        marginRight: SPACING.SIZE_20,
      },
    },
  ],
  iconWithTitles: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
  },
};

export default styles;
