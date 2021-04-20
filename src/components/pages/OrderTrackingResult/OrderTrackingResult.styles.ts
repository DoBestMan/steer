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
      [MQ.L]: {
        gridColumn: '1/4',
      },
      [MQ.XL]: {
        gridColumn: '1/5',
      },
      a: {
        display: 'inline-flex',
      },
      color: COLORS.GLOBAL.BLACK,
      display: 'block',
      gridColumn: '1/5',
    },
  ],
  additionalInfoWrapper: {
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
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    paddingBottom: SPACING.SIZE_80,
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
      [MQ.M]: {
        paddingBottom: SPACING.SIZE_60,
      },
      color: COLORS.LIGHT.GRAY_LIGHT_SOLID,
      paddingBottom: SPACING.SIZE_40,
      paddingTop: SPACING.SIZE_10,
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
    alignItems: 'center',
    display: 'flex',
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
  errorContainer: {
    paddingBottom: SPACING.SIZE_20,
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
    [MQ.M]: {
      padding: `0px ${SPACING.SIZE_90}px`,
      paddingTop: SPACING.SIZE_160,
    },
    [MQ.L]: {
      padding: `0px ${SPACING.SIZE_100}px`,
      paddingTop: '200px',
    },
    [MQ.XL]: {
      padding: `0px ${SPACING.SIZE_110}px`,
      paddingTop: '200px',
    },
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: `0px ${SPACING.SIZE_50}px`,
    paddingTop: SPACING.SIZE_110,
  },
  orderTimelineWrapper: {
    [MQ.M]: {
      borderBottom: 'none',
      paddingTop: 0,
    },
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
    padding: `${SPACING.SIZE_10}px 0`,
  },
  returnContainer: {
    [MQ.M]: {
      paddingBottom: SPACING.SIZE_70,
    },
    [MQ.L]: {
      paddingBottom: SPACING.SIZE_80,
    },
    [MQ.XL]: {
      paddingBottom: SPACING.SIZE_100,
    },
    paddingBottom: SPACING.SIZE_90,
    paddingTop: SPACING.SIZE_50,
  },
  returnInitiateEmailDescription: [
    typography.bodyCopyTight,
    {
      color: COLORS.GLOBAL.GRAY_50,
      paddingBottom: SPACING.SIZE_15,
    },
  ],
  returnInitiateStepDescription: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      paddingBottom: SPACING.SIZE_15,
    },
  ],
  returnInitiateStepTitle: [
    typography.bodyCopyTight,
    {
      color: COLORS.GLOBAL.BLACK,
      paddingBottom: SPACING.SIZE_15,
    },
  ],
  returnInitiateTitle: [
    typography.labelCopy,
    {
      color: COLORS.GLOBAL.BLACK,
      paddingBottom: SPACING.SIZE_15,
    },
  ],
  returnRequestContainer: {
    [MQ.S]: {
      width: '100%',
    },
    alignSelf: 'center',
    textAlign: 'center',
    width: '60%',
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
      [MQ.M]: {
        paddingBottom: SPACING.SIZE_60,
      },
      color: COLORS.LIGHT.GRAY_70,
      paddingBottom: SPACING.SIZE_40,
    },
  ],
  specialLabel: [
    typography.labelHeadline,
    {
      color: COLORS.GLOBAL.BLACK,
    },
  ],
};
export default styles;
