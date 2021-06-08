import { SPACING, StylesMap, TIME, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

import { COLORS, PRODUCT_WIDTH } from '../Compare.constants';
import { removingProduct } from '../ProductToCompare/ProductToCompare.styles';

export const fontBase = {
  color: COLORS.fontBase,
  lineHeight: '15px',
  fontSize: 12,
};

const styles: StylesMap = {
  borderNone: {
    '& div': { borderBottom: 'none' },
  },
  caption: [
    typography.eyebrow,
    {
      background: COLORS.bgColor,
      padding: SPACING.SIZE_20,
      paddingLeft: SPACING.SIZE_20,
      position: 'sticky',
      top: 0,
      width: '100%',
      zIndex: Z_INDEX.FRONT - 1,
    },
  ],
  cellsWrapper: {
    display: 'flex',
  },
  isRemoving: {
    animation: `${removingProduct} ${TIME.MS1000}ms linear forwards`,
  },
  noScrollbar: {
    width: '100%',
  },
  paddingBottom: { paddingBottom: 55 },
  root: { width: 'auto', position: 'relative' },
  singleAccordion: {
    display: 'inline-flex',
    flexDirection: 'column',
    width: 'calc(100vw - 40px)',
  },
  table: {
    padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_05}px`,
    paddingTop: 0,
    width: '100%',
  },
  tcell: [
    fontBase,
    {
      display: 'flex',
      fontWeight: 450,
      maxWidth: PRODUCT_WIDTH.BIG + SPACING.SIZE_30,
      overflow: 'hidden',
      width: PRODUCT_WIDTH.BIG + SPACING.SIZE_30,
    },
  ],
  tcellContent: {
    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    display: 'flex',
    margin: 'auto',
    maxWidth: PRODUCT_WIDTH.BIG,
    paddingBottom: SPACING.SIZE_20,
    width: PRODUCT_WIDTH.BIG,
  },
  thead: [
    fontBase,
    {
      flexBasis: '100%',
      fontWeight: 700,
      marginBottom: SPACING.SIZE_10,
      marginLeft: SPACING.SIZE_15,
      position: 'relative',
      textAlign: 'left',
    },
  ],
  trow: {
    marginTop: SPACING.SIZE_20,
    display: 'flex',
    flexDirection: 'column',
    width: 'min-content',
  },
  xSticky: {
    position: 'sticky',
    left: SPACING.SIZE_20,
    display: 'inline',
  },
  ySticky: {
    position: 'fixed',
    zIndex: Z_INDEX.FRONT - 1,
    top: 433,
  },
};

export default styles;
