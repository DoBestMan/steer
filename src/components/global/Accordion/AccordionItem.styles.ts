import {
  COLORS,
  EASING,
  MQ,
  SPACING,
  StylesMap,
  THEME,
  TIME,
} from '~/lib/constants';
import { links } from '~/styles/links.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: [
    typography.bodyCopyTight,
    {
      alignItems: 'flex-start',
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
    width: 22,

    svg: {
      display: 'block',
      height: 5,
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
  buttonNoContent: {
    pointerEvents: 'none',
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
    a: links.dark,
    p: {
      '&:not(:last-of-type)': {
        marginBottom: '1em',
      },
    },
  },
};

export const tStyles = {
  [THEME.LIGHT]: {
    button: {
      color: COLORS.LIGHT.GRAY_70,
      '&:hover, &:focus, &:active': {
        color: COLORS.GLOBAL.BLACK,
      },

      '&[aria-expanded="true"]': [
        typography.primarySubhead,
        {
          color: COLORS.GLOBAL.BLACK,
        },
      ],
    },
    markdown: {
      a: links.light,
    },
    contentContainer: {
      color: COLORS.LIGHT.GRAY_70,
    },
  },
  [THEME.DARK]: {
    button: {
      color: COLORS.DARK.GRAY_40,
      '&:hover, &:focus, &:active': {
        color: COLORS.GLOBAL.WHITE,
      },

      '&[aria-expanded="true"]': [
        typography.primarySubhead,
        {
          color: COLORS.GLOBAL.WHITE,
        },
      ],
    },
    markdown: {
      a: links.dark,
    },
    contentContainer: {
      color: COLORS.DARK.GRAY_40,
    },
  },
};

export default styles;
