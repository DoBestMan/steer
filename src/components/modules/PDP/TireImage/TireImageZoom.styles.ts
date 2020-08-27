import { MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const OUTER_PADDING = {
  S: {
    HORIZONTAL: SPACING.SIZE_20,
    VERTICAL: SPACING.SIZE_30,
  },
  M: SPACING.SIZE_40,
  L: SPACING.SIZE_60,
};

const styles: StylesMap = {
  brandContainer: {
    left: OUTER_PADDING.S.HORIZONTAL,
    position: 'absolute',
    top: OUTER_PADDING.S.VERTICAL,

    [MQ.M]: {
      left: OUTER_PADDING.M,
      top: OUTER_PADDING.M,
    },
    [MQ.L]: {
      left: OUTER_PADDING.L,
      top: OUTER_PADDING.L,
    },
  },
  brandLabel: typography.tertiaryHeadline,
  brandLogo: {
    height: 15,
    marginBottom: SPACING.SIZE_05,
    width: 'auto',

    [MQ.M]: {
      height: 18,
    },
    [MQ.L]: {
      height: 25,
      marginBottom: SPACING.SIZE_10,
    },
  },
  closeButton: {
    position: 'absolute',
    right: OUTER_PADDING.S.HORIZONTAL,
    top: OUTER_PADDING.S.VERTICAL,

    [MQ.M]: {
      right: SPACING.SIZE_30,
      top: SPACING.SIZE_30,
    },
    [MQ.L]: {
      right: SPACING.SIZE_50,
      top: SPACING.SIZE_50,
    },
  },
  imageWrap: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
};

export default styles;
