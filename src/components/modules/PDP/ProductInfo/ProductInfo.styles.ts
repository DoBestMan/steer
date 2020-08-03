import { BORDERS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  HEADER_MAX_WIDTH: 140,
};

const styles: StylesMap = {
  actionBar: {
    display: 'none',

    [MQ.L]: {
      display: 'block',
    },
  },
  actionBarMultiple: {
    button: {
      flex: 'none',
      marginLeft: 0,
      marginRight: 'auto',
      marginTop: SPACING.SIZE_20,
      paddingLeft: SPACING.SIZE_80,
      paddingRight: SPACING.SIZE_80,
    },
  },
  crossSellWrapper: [
    typography.bodyCopy,
    {
      borderTop: BORDERS.SOLID_GRAY_20_1PX,
      marginTop: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_25,
      textAlign: 'center',

      [MQ.M]: {
        marginTop: SPACING.SIZE_25,
      },

      [MQ.L]: {
        marginTop: SPACING.SIZE_40,
        paddingTop: SPACING.SIZE_40,
      },
    },
  ],
  loadIndex: {
    fontWeight: 'normal',
  },
  name: {
    display: 'block',
  },
  nameWrapper: {
    [MQ.L]: {
      flexBasis: '100%',
    },
  },
  nameWrapperTireLine: {
    [MQ.L]: {
      flexBasis: 'auto',
    },
  },
  pricesWrapper: {
    textAlign: 'right',
    marginBottom: SPACING.SIZE_02,
    maxWidth: CONSTANTS.HEADER_MAX_WIDTH,

    [MQ.L]: {
      textAlign: 'left',
      marginBottom: 0,
      marginTop: SPACING.SIZE_40,
      maxWidth: '100%',
    },
  },
  promoTags: {
    marginBottom: -SPACING.SIZE_05,
    marginTop: SPACING.SIZE_25,

    [MQ.L]: {
      marginTop: SPACING.SIZE_20,
    },
  },
  sizeButton: [
    typography.primaryHeadline,
    {
      alignItems: 'center',
      display: 'flex',
    },
  ],
  sizeButtonIcon: {
    marginLeft: SPACING.SIZE_05,
  },
  sizeNoRating: {
    marginBottom: SPACING.SIZE_20,

    [MQ.L]: {
      marginBottom: 0,
    },
  },
  wrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

    [MQ.L]: {
      flexFlow: 'row wrap',
    },
  },
};

export default styles;
