import { COLORS, MQ, SPACING, StylesMap, TIME, Z_INDEX } from '~/lib/constants';
import { getColumnsCalc } from '~/lib/utils/grid';
import { typography } from '~/styles/typography.styles';

function defaultSpacing(rule: string, offset = 0) {
  return {
    [rule]: SPACING.SIZE_60 + offset,

    [MQ.M]: {
      [rule]: SPACING.SIZE_80 + offset,
    },

    [MQ.L]: {
      [rule]: SPACING.SIZE_120 + offset,
    },
  };
}

const styles: StylesMap = {
  breadcrumbs: {
    marginBottom: SPACING.SIZE_20,

    [MQ.M]: {
      marginBottom: SPACING.SIZE_40,
    },

    [MQ.L]: {
      marginBottom: SPACING.SIZE_60,
    },
  },
  detailsSection: [
    defaultSpacing('marginTop'),
    defaultSpacing('paddingBottom', -SPACING.SIZE_20),
    defaultSpacing('paddingTop'),
    {
      backgroundColor: COLORS.GLOBAL.BLACK,

      // eslint-disable-next-line sort-keys
      '> div:not(:first-of-type)': defaultSpacing('marginTop'),
    },
  ],
  featuredRecirculation: defaultSpacing('marginTop'),
  insights: {
    marginTop: SPACING.SIZE_25,

    [MQ.M]: {
      marginTop: SPACING.SIZE_40,
    },

    [MQ.L]: {
      marginTop: SPACING.SIZE_60,
    },
  },
  installation: [
    defaultSpacing('marginTop'),
    {
      [MQ.L]: {
        marginTop: SPACING.SIZE_90,
      },
    },
  ],
  productInfo: {
    [MQ.L]: {
      marginTop: SPACING.SIZE_05,
    },
  },
  purchaseIncludes: [
    defaultSpacing('marginTop'),
    {
      [MQ.L]: {
        marginTop: SPACING.SIZE_80,
      },
    },
  ],
  recirculation: defaultSpacing('marginTop'),
  recirculationContainer: defaultSpacing('marginBottom'),
  recirculationHeader: {
    [MQ.L]: {
      marginLeft: getColumnsCalc({
        breakpoint: 'L',
        columns: 1,
        includeExtraGutter: true,
      }),
    },

    [MQ.XL]: {
      marginLeft: getColumnsCalc({
        breakpoint: 'XL',
        columns: 1,
        includeExtraGutter: true,
      }),
    },
  },
  recirculationItem: {
    ':first-of-type': {
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

    ':last-of-type': {
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
  },
  recirculationSize: {
    marginTop: SPACING.SIZE_40,

    [MQ.L]: {
      marginTop: SPACING.SIZE_60,
    },
  },
  recirculationSizeLink: typography.primarySubhead,
  root: {
    opacity: 1,
    transition: `opacity ${TIME.MS300}ms ease`,
  },
  rootLoading: {
    opacity: 1,
  },
  shopWithConfidence: defaultSpacing('marginTop'),
  stickyBar: {
    bottom: 0,
    position: 'sticky',
    zIndex: Z_INDEX.FRONT,
  },
  tireImage: {
    marginBottom: SPACING.SIZE_10,
    width: '100%',

    [MQ.M]: {
      marginBottom: SPACING.SIZE_15,
    },

    [MQ.L]: {
      marginBottom: 0,
    },
  },
};

export default styles;
