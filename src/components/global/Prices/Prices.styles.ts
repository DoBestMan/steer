import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  currentBlock: {
    display: 'block',
  },
  label: {
    fontWeight: 'normal',
  },
  noPrice: {
    fontWeight: 'normal',
  },
  originalValue: [
    typography.smallCopyTight,
    {
      marginLeft: SPACING.SIZE_05,
      textDecoration: 'line-through',
      color: COLORS.LIGHT.GRAY_70,

      [MQ.XL]: typography.bodyCopyTight,
    },
  ],
  originalValuePrefixed: {
    display: 'block',
    marginLeft: 0,
    textDecoration: 'none',
  },
};

export default styles;
