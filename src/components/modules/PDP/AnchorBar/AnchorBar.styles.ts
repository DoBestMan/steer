import {
  COLORS,
  GAP_COLUMNS,
  MQ,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    '> a': {
      ':not(:last-child)': {
        marginRight: SPACING.SIZE_20,
      },
    },
    alignItems: 'center',
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    display: 'flex',
    height: 50,
    padding: `0 ${GAP_COLUMNS.S}px`,

    [MQ.M]: {
      padding: `0 ${GAP_COLUMNS.M}px`,
    },

    [MQ.L]: {
      backgroundColor: 'transparent',
      height: 'auto',
      padding: `0 ${SPACING.SIZE_40}px`,
    },
  },
  label: [
    typography.smallCopyTight,
    {
      ':hover': {
        color: COLORS.GLOBAL.BLACK,
      },

      color: COLORS.LIGHT.GRAY_70,
      transition: `color ${TIME.MS150}ms ease`,

      [MQ.L]: [
        typography.largeCopy,
        {
          borderBottom: '2px dotted',
        },
      ],
    },
  ],
};

export default styles;
