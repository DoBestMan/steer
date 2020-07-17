import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  root: {
    flexGrow: 1,
    padding: `0 ${SPACING.SIZE_20}px`,
    [MQ.M]: {
      padding: `0 ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `0 ${SPACING.SIZE_60}px`,
    },
  },
  text: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      [MQ.M]: typography.bodyCopyTight,
      [MQ.L]: typography.largeCopy,
    },
  ],
  title: [
    typography.primaryHeadline,
    {
      paddingTop: SPACING.SIZE_40,
      marginBottom: SPACING.SIZE_05,
    },
  ],
};

export default styles;
