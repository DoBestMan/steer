import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { borderBottomWithGap } from '~/styles/borders.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  buttonContainer: {
    textAlign: 'center',
  },
  column: [
    borderBottomWithGap,
    {
      padding: `${SPACING.SIZE_20}px 0`,
    },
  ],
  container: {
    paddingBottom: `${SPACING.SIZE_40}px`,
    textAlign: 'left',
    width: '100%',
    [MQ.S]: {
      paddingTop: SPACING.SIZE_20,
    },
    [MQ.L]: {
      paddingTop: SPACING.SIZE_60,
    },
  },
  headingText: typography.labelHeadline,
  lastColumn: {
    marginRight: 0,
    textAlign: 'right',
  },
  row: {
    ':last-child': {
      td: {
        border: 'none',
      },
    },
    opacity: 1,
  },
  text: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
};

export default styles;
