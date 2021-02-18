import { SitePromotionStyleEnum } from '~/data/models/SitePromotion';
import { COLORS, RADIUS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const ICON_SIZE = 10;

const styles: StylesMap = {
  icon: {
    height: ICON_SIZE,
    width: ICON_SIZE,
    marginLeft: SPACING.SIZE_05,
  },
  root: [
    typography.secondarySubhead,
    {
      alignItems: 'center',
      border: '1px solid',
      borderRadius: RADIUS.RADIUS_5,
      color: COLORS.GLOBAL.ORANGE,
      display: 'inline-flex',
      marginBottom: 7,
    },
  ],
  [SitePromotionStyleEnum.SitePromotionItemDefault]: {
    border: 'none',
  },
  [SitePromotionStyleEnum.SitePromotionItemBlackPill]: {
    backgroundColor: COLORS.GLOBAL.BLACK,
    borderColor: COLORS.GLOBAL.BLACK,
    color: COLORS.GLOBAL.WHITE,
    padding: `${SPACING.SIZE_05}px 7px`,
  },
  [SitePromotionStyleEnum.SitePromotionItemWhitePill]: {
    borderColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.ORANGE,
    padding: `${SPACING.SIZE_05}px 7px`,
  },
  [SitePromotionStyleEnum.SitePromotionItemOrangePill]: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderColor: COLORS.GLOBAL.ORANGE,
    color: COLORS.GLOBAL.WHITE,
    padding: `${SPACING.SIZE_05}px 7px`,
  },
  uppercase: {
    textTransform: 'uppercase',
  },
};

export const clickableStyles = {
  [SitePromotionStyleEnum.SitePromotionItemDefault]: {
    ':hover, :focus:not(:active)': {
      color: COLORS.ORANGE.SHADE_15_SOLID,
    },
    ':active': {
      color: COLORS.GLOBAL.ORANGE,
    },
  },
  [SitePromotionStyleEnum.SitePromotionItemBlackPill]: {
    ':hover, :focus:not(:active)': {
      backgroundColor: COLORS.LIGHT.GRAY_70,
    },
    ':active': {
      backgroundColor: COLORS.GLOBAL.BLACK,
    },
  },
  [SitePromotionStyleEnum.SitePromotionItemWhitePill]: {
    ':hover, :focus:not(:active)': {
      borderColor: COLORS.ORANGE.SHADE_30_SOLID,
    },
    ':active': {
      backgroundColor: COLORS.LIGHT.GRAY_10,
    },
  },
  [SitePromotionStyleEnum.SitePromotionItemOrangePill]: {
    ':hover, :focus:not(:active)': {
      borderColor: COLORS.ORANGE.SHADE_30_SOLID,
    },
    ':active': {
      borderColor: COLORS.ORANGE.TINT_30_SOLID,
    },
  },
};

export default styles;
