import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  RETURN_ICON_SIZE: 20,
  CANCELLATION_CONTAINER_MAX_WIDTH: 400,
};
const styles: StylesMap = {
  backIcon: {
    height: CONSTANTS.RETURN_ICON_SIZE,
    width: CONSTANTS.RETURN_ICON_SIZE,
  },
  cancellationContainer: {
    alignSelf: 'center',
    marginTop: SPACING.SIZE_20,
    maxWidth: CONSTANTS.CANCELLATION_CONTAINER_MAX_WIDTH,
  },
  cancellationText: [
    typography.smallCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      textAlign: 'center',
    },
  ],
  description: {
    color: COLORS.LIGHT.GRAY_70,
  },
  header: {
    [MQ.M]: {
      padding: `${SPACING.SIZE_120}px 0 ${SPACING.SIZE_60}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_150}px 0 ${SPACING.SIZE_80}px`,
    },
    [MQ.XL]: {
      padding: `${SPACING.SIZE_150}px 0 ${SPACING.SIZE_80}px`,
    },
    display: 'flex',
    flexDirection: 'column',
    justifyItems: 'center',
    padding: `${SPACING.SIZE_90}px 0 ${SPACING.SIZE_40}px`,
  },
  paddingForNotification: {
    paddingTop: '200px',
    [MQ.M]: {
      paddingTop: '220px',
    },
    [MQ.L]: {
      paddingTop: '220px',
    },
    [MQ.XL]: {
      paddingTop: '220px',
    },
  },
  returnHomeContainer: {
    [MQ.S]: {
      paddingBottom: SPACING.SIZE_20,
    },
    alignItems: 'center',
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subTitleText: [
    typography.largeCopy,
    {
      '> a': [
        typography.largeCopy,
        {
          display: 'inline-flex',
        },
      ],
      textAlign: 'center',
    },
  ],
  title: [
    typography.jumboHeadline,
    {
      paddingBottom: SPACING.SIZE_20,
      textAlign: 'center',
    },
  ],
};

export default styles;
