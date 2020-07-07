import {
  BORDERS,
  COLORS,
  GAP_COLUMNS,
  MQ,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  additionalInfo: [
    typography.bodyCopy,
    {
      a: {
        borderBottom: `2px dotted ${COLORS.LIGHT.GRAY_70}`,
        ':hover': {
          borderColor: COLORS.GLOBAL.BLACK,
        },
      },
      color: COLORS.LIGHT.GRAY_70,
      display: 'block',
    },
  ],
  additionalInfoWrapper: {
    paddingBottom: SPACING.SIZE_80,
    [MQ.M]: {
      '> span': {
        gridColumn: '2/5',
      },
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      paddingBottom: SPACING.SIZE_100,
    },
    [MQ.L]: {
      '> span': {
        gridColumn: '2/6',
      },
      gridColumnGap: GAP_COLUMNS.L,
      gridTemplateColumns: 'repeat(5, 1fr)',
    },
    [MQ.XL]: {
      '> span': {
        gridColumn: '2/5',
      },
      gridColumnGap: GAP_COLUMNS.XL,
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  address: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      [MQ.M]: {
        paddingBottom: SPACING.SIZE_60,
      },
    },
  ],
  inTransitStep: {
    '> span': {
      display: 'block',
    },
    display: 'block',
    paddingTop: SPACING.SIZE_20,
  },
  orderInfoWrapper: {
    paddingBottom: SPACING.SIZE_40,
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_60,
    },
  },
  orderItem: {
    paddingBottom: SPACING.SIZE_30,
  },
  orderItemsList: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    padding: `${SPACING.SIZE_10}px 0`,
    [MQ.M]: {
      borderBottom: 'none',
    },
  },
  orderStatusWrapper: {
    padding: `${SPACING.SIZE_110}px 0 ${SPACING.SIZE_60}px`,
    [MQ.M]: {
      padding: `${SPACING.SIZE_160}px 0 ${SPACING.SIZE_90}px`,
    },
    [MQ.L]: {
      padding: `200px 0 ${SPACING.SIZE_100}px`,
    },
    [MQ.XL]: {
      padding: `230px 0 ${SPACING.SIZE_110}px`,
    },
  },
  orderTimelineWrapper: {
    paddingTop: SPACING.SIZE_40,
    [MQ.M]: {
      paddingTop: 0,
    },
  },
  sectionHeader: [
    typography.tertiaryHeadline,
    {
      paddingBottom: SPACING.SIZE_10,
    },
  ],
};

export default styles;
