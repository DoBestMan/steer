import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { layout } from '~/styles/layout.styles';
import { typography } from '~/styles/typography.styles';

const GEOLOCATION_ICON_SIZE = {
  S: 16,
  M: 26,
  XL: 24,
};

export const styles: StylesMap = {
  container: {
    width: '100%',
  },
  content: {
    background: COLORS.GLOBAL.WHITE,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    paddingBottom: SPACING.SIZE_60,
    [MQ.S]: {
      padding: `0 ${SPACING.SIZE_20}px ${SPACING.SIZE_50}px ${SPACING.SIZE_20}px`,
    },
    [MQ.M]: {
      padding: `0 0 ${SPACING.SIZE_50}px 0`,
    },
  },
  currentLocation: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'block',
      marginTop: SPACING.SIZE_10,
      [MQ.M]: [
        typography.bodyCopy,
        {
          marginTop: SPACING.SIZE_20,
        },
      ],
      [MQ.XL]: typography.bodyCopyTight,
    },
  ],
  infoContainer: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginTop: 'auto',
      [MQ.M]: typography.bodyCopy,
      [MQ.XL]: typography.bodyCopyTight,
    },
  ],
  infoLink: [
    typography.smallCopyTight,
    {
      '&:hover span, &:focus span': {
        color: COLORS.GLOBAL.BLACK,
      },
      color: COLORS.LIGHT.GRAY_70,
      [MQ.M]: typography.bodyCopy,
      [MQ.XL]: typography.bodyCopyTight,
    },
  ],
  toast: {
    marginTop: 'auto',
  },
  useCurrentLocationButton: [
    typography.labelHeadlineLarge,
    layout.container,
    {
      alignItems: 'baseline',
    },
  ],
  useCurrentLocationContainer: {
    marginTop: SPACING.SIZE_40,
  },
  useCurrentLocationIcon: {
    marginLeft: SPACING.SIZE_10,
    svg: {
      height: GEOLOCATION_ICON_SIZE.S,
      width: GEOLOCATION_ICON_SIZE.S,
    },
    [MQ.M]: {
      svg: {
        height: GEOLOCATION_ICON_SIZE.M,
        width: GEOLOCATION_ICON_SIZE.M,
      },
    },
    [MQ.XL]: {
      svg: {
        height: GEOLOCATION_ICON_SIZE.XL,
        width: GEOLOCATION_ICON_SIZE.XL,
      },
    },
  },
  userCurrentLocationLoader: {
    paddingTop: 12,
    [MQ.M]: {
      paddingTop: 17,
    },
  },
};
