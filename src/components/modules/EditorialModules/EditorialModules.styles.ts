import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';

const containerSpacing = {
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
  breadcrumbContainer: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_70,
    },
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
  spacingTopS40XL60: [containerSpacing.spacingTopS40XL60],
  spacingTopS60XL80: [containerSpacing.spacingTopS60XL80],
};
