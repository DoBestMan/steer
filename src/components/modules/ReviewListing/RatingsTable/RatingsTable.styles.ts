import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { borderTopWithGap } from '~/styles/borders.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  bordered: [
    borderTopWithGap,
    {
      // No border into gutter for the last column
      ':last-of-type': {
        marginRight: 0,
      },
    },
  ],
  buttonContainer: {
    textAlign: 'center',
  },
  column: {
    padding: `${SPACING.SIZE_20}px 0`,
  },
  container: [
    typography.bodyCopy,
    {
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
  ],
  headingText: typography.labelHeadline,
  lastColumn: {
    marginRight: 0,
    textAlign: 'right',
  },
  link: {
    display: 'block',
    '&:after': {
      bottom: 0,
      content: '""',
      left: 0,
      position: 'absolute',
      right: 0,
      top: 0,
    },
  },
  row: {
    color: COLORS.LIGHT.GRAY_70,
    position: 'relative',
    ':hover': {
      color: COLORS.GLOBAL.BLACK,
      td: {
        borderColor: COLORS.GLOBAL.BLACK,
      },
    },
  },
};

export default styles;
