import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: {
    '&:not(:last-child)': {
      marginRight: SPACING.SIZE_10,
    },
    backgroundColor: 'transparent',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    padding: `66px 0 ${SPACING.SIZE_60}px`,
    textAlign: 'center',

    [MQ.M]: {
      padding: `${SPACING.SIZE_60}px 0 ${SPACING.SIZE_80}px`,
    },
    [MQ.S]: {
      marginTop: SPACING.SIZE_60,
    },
    [MQ.XL]: {
      marginTop: SPACING.SIZE_80,
    },
  },
  icon: {
    alignItems: 'center',
    background: 'transparent',
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_15,
  },
  label: [
    typography.secondaryHeadline,
    {
      marginBottom: SPACING.SIZE_20,
      [MQ.M]: {
        br: {
          display: 'none',
        },
      },
    },
  ],
};

export default styles;
