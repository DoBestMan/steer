import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  filterGroup: {
    ':not(:last-of-type)': {
      marginBottom: SPACING.SIZE_40,
    },
  },
  item: {
    ':not(:last-child)': {
      marginBottom: SPACING.SIZE_20,
    },
  },
  label: [
    typography.eyebrow,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_20,
    },
  ],
  link: {
    display: 'inline-block',
    width: '100%',
  },
  linkSelected: {
    color: COLORS.GLOBAL.ORANGE,
  },
  title: [
    typography.eyebrow,
    {
      display: 'inline-block',
      marginBottom: SPACING.SIZE_40,

      [MQ.L]: {
        display: 'none',
      },
    },
  ],
};

export default styles;
