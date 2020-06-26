import {
  BORDERS,
  COLORS,
  EASING,
  MQ,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: [
    typography.bodyCopyTight,
    {
      '&:hover, &:focus, &:active': {
        color: COLORS.GLOBAL.WHITE,
      },

      '&[aria-expanded="true"]': [
        typography.primarySubhead,
        {
          color: COLORS.GLOBAL.WHITE,
        },
      ],
      alignItems: 'flex-start',
      color: COLORS.DARK.GRAY_40,
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'hidden',
      paddingBottom: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_20,
      transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
      width: '100%',
    },
  ],
  buttonIcon: {
    marginTop: SPACING.SIZE_02,
    transition: `transform ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,

    svg: {
      display: 'block',
      height: SPACING.SIZE_05,
      padding: SPACING.SIZE_05,
    },
  },
  buttonIconExpanded: {
    transform: 'rotate(-180deg)',
  },
  buttonLabel: {
    flexGrow: 1,
    textAlign: 'left',
    whiteSpace: 'pre-line',
  },
  buttonValue: {
    fontWeight: 'bold',
    marginLeft: SPACING.SIZE_05,
    marginRight: SPACING.SIZE_15,
    textAlign: 'right',
    whiteSpace: 'pre',

    [MQ.M]: {
      marginRight: SPACING.SIZE_25,
    },
  },
  contentContainer: [
    typography.bodyCopyTight,
    {
      '&[aria-hidden="false"]': {
        opacity: 1,
        paddingBottom: SPACING.SIZE_20,
        visibility: 'visible',
      },
      color: COLORS.DARK.GRAY_40,
      maxHeight: 0,
      opacity: 0,
      overflow: 'hidden',
      paddingBottom: 0,
      transition: `opacity ${TIME.MS200}ms ${EASING.CIRC_EASE_OUT}, max-height ${TIME.MS400}ms ${EASING.CIRC_EASE_OUT}`,
      visibility: 'hidden',
    },
  ],
  contentInnerContent: {
    paddingBottom: 2,
  },
  markdown: {
    a: {
      borderBottom: BORDERS.DOTTED_GRAY_40_2PX,
      transition: `all ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,

      '&:hover': {
        color: COLORS.GLOBAL.WHITE,
        borderColor: COLORS.GLOBAL.WHITE,
      },
    },

    p: {
      '&:not(:last-child)': {
        marginBottom: '1em',
      },
    },
  },
};

export default styles;
