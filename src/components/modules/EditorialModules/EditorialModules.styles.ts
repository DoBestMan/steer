import { BORDERS, COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

export const containerSpacing = {
  spacingTopS20XL40: {
    marginTop: SPACING.SIZE_20,
    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
    },
  },
  spacingBottomS50XL60: {
    marginBottom: SPACING.SIZE_50,
    [MQ.L]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  spacingTopS40XL60: {
    marginTop: SPACING.SIZE_40,
    [MQ.L]: {
      marginTop: SPACING.SIZE_60,
    },
  },
  spacingTopS60XL80: {
    marginTop: SPACING.SIZE_60,
    [MQ.L]: {
      marginTop: SPACING.SIZE_80,
    },
  },
};

export const styles: StylesMap = {
  bottomBorder: {
    borderBottom: BORDERS.SOLID_GRAY_20_1PX,
  },
  breadcrumbContainer: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_70,
    },
  },
  carouselHeader: {
    backgroundColor: COLORS.LIGHT.GRAY_10,
  },
  reviewContainer: [
    containerSpacing.spacingTopS40XL60,
    {
      backgroundColor: COLORS.GLOBAL.BLACK,
    },
  ],
  spacingBottom20: {
    marginBottom: SPACING.SIZE_20,
  },
  spacingBottomS50XL60: [containerSpacing.spacingBottomS50XL60],
  spacingTop20: {
    marginTop: SPACING.SIZE_20,
  },
  spacingTop40: {
    marginTop: SPACING.SIZE_40,
  },
  spacingTopS20XL40: [containerSpacing.spacingTopS20XL40],
  spacingTopS40XL60: [containerSpacing.spacingTopS40XL60],
  spacingTopS60XL80: [containerSpacing.spacingTopS60XL80],
};
