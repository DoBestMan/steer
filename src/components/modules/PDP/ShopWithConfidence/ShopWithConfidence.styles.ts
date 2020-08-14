import {
  COLORS,
  GRID_MARGIN,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
} from '~/lib/constants';
import { getColumnsCalc } from '~/lib/utils/grid';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  carouselContainer: {
    '.swiper-slide': {
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
        marginRight: GRID_MARGIN.S,

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
            includeExtraGutter: true,
            includeContainerMargin: true,
          }),
        },
      },

      marginRight: SPACING.SIZE_30,
      maxWidth: 100,
      width: 'unset',

      [MQ.M]: {
        marginRight: SPACING.SIZE_60,
        maxWidth: 180,
      },

      [MQ.XL]: {
        marginRight: SPACING.SIZE_80,
      },
    },
  },
  checkmark: {
    background: COLORS.GLOBAL.BLACK,
    borderRadius: RADIUS.CIRCLE,
    color: COLORS.GLOBAL.WHITE,
    height: 12,
    marginLeft: SPACING.SIZE_05,
    padding: 3,
    width: 12,
  },
  heading: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: SPACING.SIZE_20,

    [MQ.L]: {
      display: 'block',
      marginBottom: SPACING.SIZE_30,
    },
  },
  learnMoreButton: [
    typography.labelCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,

      span: {
        borderColor: COLORS.LIGHT.GRAY_70,
      },

      ':hover, :focus': {
        span: {
          borderColor: COLORS.GLOBAL.BLACK,
        },
      },
    },
  ],
  statDetail: [
    typography.labelCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'block',
      lineHeight: 1.25,

      [MQ.L]: typography.bodyCopyTight,
    },
  ],
  statHeading: [
    typography.primaryHeadline,
    {
      display: 'block',
      marginBottom: SPACING.SIZE_05,
      whiteSpace: 'nowrap',
      [MQ.L]: {
        marginBottom: SPACING.SIZE_05,
      },
    },
  ],
  title: [
    typography.tertiaryHeadline,
    {
      alignItems: 'center',
      display: 'flex',

      [MQ.L]: {
        marginBottom: SPACING.SIZE_05,
      },
    },
  ],
};

export default styles;
