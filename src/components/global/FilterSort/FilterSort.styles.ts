import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: {
    padding: `${SPACING.SIZE_10}px 0`,
    textAlign: 'left',
  },
  flair: [
    typography.smallCopyTight,
    {
      ':before': {
        color: COLORS.GLOBAL.BLACK,
        padding: `0 ${SPACING.SIZE_05}px`,
        content: '"•"',
        fontSize: 8,
      },
      color: COLORS.GLOBAL.ORANGE,
    },
  ],
  listItem: {
    ':not(:last-of-type)': {
      marginBottom: SPACING.SIZE_15,
    },
  },
  radio: {
    marginBottom: SPACING.SIZE_20,
    width: '100%',
  },
  selected: {
    color: COLORS.GLOBAL.ORANGE,
  },
  title: [
    typography.eyebrow,
    {
      marginBottom: SPACING.SIZE_40,
      [MQ.L]: {
        display: 'none',
      },
    },
  ],
};

export default styles;
