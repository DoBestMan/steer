import { css } from '@emotion/core';

import { COLORS, MQ, SPACING } from '~/lib/constants';
import { layout } from '~/styles/layout.styles';
import { typography, typographyStyles } from '~/styles/typography.styles';

export const styles = {
  container: css({
    width: '100%',
  }),
  content: css({
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
  }),
  currentLocation: [
    typography.smallCopyTight,
    css({
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
    }),
  ],
  infoContainer: [
    typography.smallCopyTight,
    css({
      color: COLORS.LIGHT.GRAY_70,
      marginTop: 'auto',
      [MQ.M]: typography.bodyCopy,
      [MQ.XL]: typography.bodyCopyTight,
    }),
  ],
  infoLink: [
    typography.smallCopyTight,
    css({
      '&:hover span, &:focus span': {
        color: COLORS.GLOBAL.BLACK,
      },
      color: COLORS.LIGHT.GRAY_70,
      [MQ.M]: typography.bodyCopy,
      [MQ.XL]: typography.bodyCopyTight,
    }),
  ],
  toast: css({
    marginTop: 'auto',
  }),
  useCurrentLocationButton: [
    typography.secondaryHeadline,
    layout.container,
    css({
      alignItems: 'baseline',
      [MQ.M]: typographyStyles.primaryHeadline.M,
      [MQ.XL]: typographyStyles.secondaryHeadline.XL,
    }),
  ],
  useCurrentLocationContainer: css({
    marginTop: SPACING.SIZE_40,
  }),
  useCurrentLocationIcon: css({
    marginLeft: SPACING.SIZE_10,
    svg: {
      height: 18,
      width: 18,
    },
    [MQ.M]: {
      svg: {
        height: 25,
        width: 25,
      },
    },
  }),
  userCurrentLocationLoader: css({
    paddingTop: 12,
    [MQ.M]: {
      paddingTop: 17,
    },
  }),
};
