import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  label: typography.primarySubhead,
  option: {
    '&:not(:first-child)': {
      marginTop: SPACING.SIZE_30,
    },
  },
  optionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  price: [
    typography.bodyCopyTight,
    {
      color: COLORS.GLOBAL.WHITE,
    },
  ],
  screenReadersVisibleOnly: {
    display: 'block',
    height: 0,
    lineHeight: 0,
    opacity: 0,
    overflow: 'hidden',
  },
  specHeaderCell: {
    minWidth: SPACING.SIZE_90,
    paddingRight: SPACING.SIZE_20,
  },
  specsTable: typography.smallCopyTight,
  specsTableHeader: {
    minHeight: 0,
    visibility: 'hidden',
  },
};

export default styles;
