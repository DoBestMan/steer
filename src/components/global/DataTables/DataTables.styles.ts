import { COLORS, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

export const styles: StylesMap = {
  column: [
    typography.labelCopyTight,
    {
      padding: 12,
      flexGrow: 0,
      flexShrink: 0,
      verticalAlign: 'top',
    },
  ],
  fixedCol: {
    left: 0,
    position: 'sticky',
    backgroundColor: 'white',
  },
  link: [
    {
      color: COLORS.GLOBAL.BLACK,
    },
  ],
  tableRow: {
    borderBottom: `1px solid ${COLORS.LIGHT.GRAY_20}`,
    boxSizing: 'border-box',
    display: 'table',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
  },
  tableRowHeaderColumn: [typography.secondarySubhead, {}],
  tableRowWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  tableWrapper: {
    position: 'relative',
    overflow: 'auto',
    whiteSpace: 'nowrap',
  },
};
