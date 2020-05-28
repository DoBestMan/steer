import { CSSObject } from '@emotion/core';

import { COLORS, RADIUS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  cardContainer: {
    '&:not(:last-of-type)': {
      marginRight: SPACING.SIZE_15,
    },
    backgroundColor: COLORS.LIGHT.OFF_WHITE,
    borderRadius: RADIUS.RADIUS_15,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 240,
    minWidth: 250,
    padding: SPACING.SIZE_25,
    width: 250,
  },
  cardIcon: {
    alignItems: 'flex-start',
    color: COLORS.GLOBAL.ORANGE,
    display: 'flex',
    height: 34,
  },
  cardLink: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  cardTitle: [
    typography.primarySubhead,
    {
      marginBottom: SPACING.SIZE_10,
    },
  ],
  title: [
    typography.primaryHeadline,
    {
      marginBottom: SPACING.SIZE_30,
    },
  ],
};

export default styles;
