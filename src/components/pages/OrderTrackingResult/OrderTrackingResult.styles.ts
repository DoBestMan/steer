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
        display: 'inline-flex',
      },
      color: COLORS.GLOBAL.BLACK,
      display: 'block',
      gridColumn: '1/5',
      [MQ.L]: {
        gridColumn: '1/4',
      },
      [MQ.XL]: {
        gridColumn: '1/5',
      },
    },
  ],
  additionalInfoWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    paddingBottom: SPACING.SIZE_80,
    [MQ.M]: {
      '> span': {
        gridColumn: '1/5',
      },
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      paddingBottom: SPACING.SIZE_100,
    },
    [MQ.L]: {
      '> span': {
        gridColumn: '1/6',
      },
      gridColumnGap: GAP_COLUMNS.L,
      gridTemplateColumns: 'repeat(5, 1fr)',
    },
    [MQ.XL]: {
      '> span': {
        gridColumn: '1/5',
      },
      gridColumnGap: GAP_COLUMNS.XL,
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
  addressText: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  addressTextContainer: {
    alignItems: 'center',
    display: 'grid',
  },
  appointmentAddress: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  appointmentNote: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_LIGHT_SOLID,
      paddingBottom: SPACING.SIZE_40,
      paddingTop: SPACING.SIZE_10,
      [MQ.M]: {
        paddingBottom: SPACING.SIZE_60,
      },
    },
  ],

  appointmentWrapper: {
    paddingBottom: SPACING.SIZE_40,
  },
  emailButtonWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  emailLoader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: SPACING.SIZE_10,
  },
  emailText: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingTop: SPACING.SIZE_15,
    },
  ],
  emailWrapper: {
    paddingBottom: SPACING.SIZE_50,
  },
  orderInfoWrapper: {
    [MQ.S]: {
      paddingTop: SPACING.SIZE_60,
    },
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_60,
      paddingTop: 0,
    },
  },
  orderItem: {
    paddingBottom: SPACING.SIZE_30,
  },
  orderItemsList: {
    paddingBottom: SPACING.SIZE_50,
  },
  orderStatusWrapper: {
    padding: `${SPACING.SIZE_110}px 0 ${SPACING.SIZE_50}px`,
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
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    padding: `${SPACING.SIZE_10}px 0`,
    [MQ.M]: {
      paddingTop: 0,
      borderBottom: 'none',
    },
  },
  sectionHeader: [
    typography.tertiaryHeadline,
    {
      paddingBottom: SPACING.SIZE_10,
    },
  ],
  shippingAddress: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingBottom: SPACING.SIZE_40,
      [MQ.M]: {
        paddingBottom: SPACING.SIZE_60,
      },
    },
  ],
};
export default styles;
