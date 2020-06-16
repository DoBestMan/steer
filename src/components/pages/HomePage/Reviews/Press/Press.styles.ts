import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    borderTop: BORDERS.SOLID_GRAY_80_1PX,
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: SPACING.SIZE_10,
    paddingTop: SPACING.SIZE_40,
  },
  copy: [
    typography.smallCopy,
    {
      '&::after': {
        content: 'close-quote',
      },
      '&::before': {
        content: 'open-quote',
      },
      color: COLORS.DARK.GRAY_40,
      marginTop: SPACING.SIZE_20,
      quotes: '"“" "”" "‘" "’"',
      whiteSpace: 'nowrap',

      [MQ.L]: typography.bodyCopy,
    },
  ],
  item: {
    '&:not(last-child)': {
      marginRight: SPACING.SIZE_15,
    },
    textAlign: 'center',
  },
  logo: {
    height: 20,
    margin: 'auto',
    width: 'auto',

    [MQ.L]: {
      height: 25,
    },
  },
};

export default styles;
