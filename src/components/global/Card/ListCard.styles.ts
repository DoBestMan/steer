import {
  BORDERS,
  COLORS,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const ITEM_HEIGHT = 60;

const styles: StylesMap = {
  content: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  cta: {
    [MQ.S]: {
      padding: `${SPACING.SIZE_40}px ${SPACING.SIZE_40}px 0 ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_40}px ${SPACING.SIZE_40}px 0 0`,
    },
  },
  icon: {
    display: 'inline-flex',
  },
  image: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    span: {
      maxWidth: 30, // targets svg icon
    },
  },
  imageContainer: {
    alignItems: 'flex-end',
    bottom: 0,
    display: 'flex',
    height: '100%',
    right: 0,
  },
  imageVehicle: {
    span: {
      bottom: 0,
      display: 'inline-flex',
      maxWidth: 'unset',
      pointerEvents: 'none',
      position: 'absolute',
      right: SPACING.SIZE_30,
    },
  },
  list: {
    marginTop: -SPACING.SIZE_20, // offset padding of first item
  },
  listItem: [
    typography.smallCopy,
    {
      borderBottom: BORDERS.SOLID_GRAY_90_1PX,
      color: COLORS.GLOBAL.WHITE,
      display: 'flex',
      height: ITEM_HEIGHT,
      justifyContent: 'space-between',
      padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_40}px`,
      position: 'relative',
      span: {
        borderColor: 'transparent',
        color: COLORS.GLOBAL.WHITE,
      },
      width: '100%',
      [MQ.L]: {
        padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_40}px ${SPACING.SIZE_20}px 0`,
      },
    },
  ],
  root: [
    typography.jumboHeadline,
    {
      backgroundColor: COLORS.DARK.GRAY_95,
      borderRadius: RADIUS.RADIUS_15,
      padding: `${SPACING.SIZE_40}px 0`,
      [MQ.XL]: {
        padding: `${SPACING.SIZE_60}px 0`,
      },
    },
  ],
  title: [
    typography.primaryHeadline,
    {
      color: COLORS.GLOBAL.ORANGE,
      display: 'flex',
      marginBottom: SPACING.SIZE_25,
      padding: `0 ${SPACING.SIZE_40}px`,
      [MQ.M]: typography.secondaryHeadline,
      [MQ.L]: {
        marginBottom: 0,
        marginTop: -SPACING.SIZE_05, // line height causes misalignment to right column content
        paddingLeft: SPACING.SIZE_50,
        paddingRight: 'unset',
      },
    },
  ],
};

export default styles;
