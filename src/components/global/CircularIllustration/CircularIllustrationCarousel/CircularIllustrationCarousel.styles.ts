import { COLORS, GRID_MARGIN, MQ, SPACING, StylesMap } from '~/lib/constants';
import { getColumnsCalc } from '~/lib/utils/grid';
import { typography } from '~/styles/typography.styles';

const ITEM_WIDTH = {
  SMALL: 152,
  MEDIMUM: 203,
  LARGE: 195,
};

const styles: StylesMap = {
  carContainer: {
    width: ITEM_WIDTH.SMALL,
    [MQ.M]: {
      width: ITEM_WIDTH.MEDIMUM,
    },
    [MQ.L]: {
      width: ITEM_WIDTH.LARGE,
    },
    '&.swiper-slide': {
      '&:first-of-type': {
        marginLeft: GRID_MARGIN.S,

        [MQ.M]: {
          marginLeft: GRID_MARGIN.M,
        },

        [MQ.L]: {
          marginLeft: getColumnsCalc({
            breakpoint: 'L',
            columns: 1,
            includeExtraGutter: true,
            includeContainerMargin: true,
          }),
        },

        [MQ.XL]: {
          marginLeft: getColumnsCalc({
            breakpoint: 'XL',
            columns: 1,
            includeExtraGutter: true,
            includeContainerMargin: true,
          }),
        },
      },

      '&:last-of-type': {
        marginLeft: GRID_MARGIN.S,

        [MQ.M]: {
          marginRight: GRID_MARGIN.M,
        },

        [MQ.L]: {
          marginRight: getColumnsCalc({
            breakpoint: 'L',
            columns: 1,
            includeExtraGutter: true,
            includeContainerMargin: true,
          }),
        },

        [MQ.XL]: {
          marginRight: getColumnsCalc({
            breakpoint: 'XL',
            columns: 1,
            includeContainerMargin: true,
            includeExtraGutter: true,
          }),
        },
      },

      '&:not(:last-of-type)': {
        marginRight: SPACING.SIZE_15,

        [MQ.L]: {
          marginRight: SPACING.SIZE_30,
        },
      },
    },
  },
  carousel: {
    paddingTop: SPACING.SIZE_40,
  },
  root: {
    backgroundColor: COLORS.LIGHT.GRAY_10,
    padding: `${SPACING.SIZE_40}px 0`,
  },
  subTitle: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginTop: SPACING.SIZE_20,
    },
  ],
  title: [typography.primaryHeadline],
};

export default styles;
