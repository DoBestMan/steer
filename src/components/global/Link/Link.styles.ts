import {
  COLORS,
  CSSStyles,
  LINK_ICON_POSITION,
  LINK_THEME,
  MQ,
  RADIUS,
  SPACING,
  StylesMap,
  THEME,
  TIME,
} from '~/lib/constants';
import { links } from '~/styles/links.styles';
import { typography } from '~/styles/typography.styles';

const CONSTANTS = {
  OPACITY_ACTIVE: 0.8,
  OPACITY_DISABLED: 0.4,
  SIZE: 50,
};

const helpers: StylesMap = {
  inheritBorder: {
    borderBottom: '2px dotted',
    borderBottomColor: 'inherit',
  },
  inheritFocusBorder: {
    border: '2px dotted transparent',

    '&:hover, &:focus, &:active': {
      borderBottomColor: 'inherit',
    },
  },
  inheritLastSpanFocusBorder: {
    'span:last-of-type': {
      borderBottom: '2px dotted transparent',
    },

    '&:hover span:last-of-type, &:focus span:last-of-type, &:active span:last-of-type': {
      borderBottomColor: 'inherit',
    },
  },
};

const styles: StylesMap = {
  disabled: {
    opacity: CONSTANTS.OPACITY_DISABLED,
    pointerEvents: 'none',
  },
  iconOnly: {
    display: 'flex',
    justifyContent: 'center',
    minHeight: 30,
    minWidth: 30,
  },
  link: helpers.inheritBorder,
  linkBorderless: helpers.inheritFocusBorder,
  root: {
    alignItems: 'center',
    display: 'flex',
    borderBottomWidth: 0,
  },

  // conditional styles
  [LINK_ICON_POSITION.LEFT]: {
    paddingRight: SPACING.SIZE_10,
  },
  [LINK_ICON_POSITION.RIGHT]: {
    paddingLeft: 5,
  },
};

export const themedStyles: StylesMap = {
  [THEME.DARK]: links.dark,

  [LINK_THEME.DARK_HIGHLIGHTED]: [links.dark, links.darkHighlighted],

  [LINK_THEME.LIGHT_HIGHLIGHTED]: [links.light, links.lightHighlighted],

  [THEME.LIGHT]: links.light,
};

export const iconCTA = {
  container: {
    alignItems: 'center',
    display: 'flex',
    borderBottomWidth: 0,
  },
  icon: {
    alignItems: 'center',
    backgroundColor: COLORS.GLOBAL.ORANGE,
    borderRadius: RADIUS.CIRCLE,
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    height: CONSTANTS.SIZE,
    justifyContent: 'center',
    marginRight: SPACING.SIZE_15,
    width: CONSTANTS.SIZE,
  },
  root: {
    display: 'flex',
    svg: {
      color: COLORS.GLOBAL.WHITE,
    },
  },
};

export const themedIconCTA: Record<THEME | LINK_THEME, CSSStyles[] | null> = {
  [THEME.DARK]: [
    {
      'span:last-of-type': links.dark,
    },
    helpers.inheritLastSpanFocusBorder,
  ],

  [LINK_THEME.DARK_HIGHLIGHTED]: [
    {
      'span:last-of-type': [links.dark, links.darkHighlighted],
    },
    helpers.inheritLastSpanFocusBorder,
  ],

  [THEME.LIGHT]: [
    {
      'span:last-of-type': links.light,
    },
    helpers.inheritLastSpanFocusBorder,
  ],

  [LINK_THEME.LIGHT_HIGHLIGHTED]: [
    {
      'span:last-of-type': [links.light, links.lightHighlighted],
    },
    helpers.inheritLastSpanFocusBorder,
  ],

  [THEME.ORANGE]: null,
};

export const footerLink = {
  '&:hover:not(:active), &:focus:not(:active)': {
    borderColor: 'inherit',
    color: COLORS.GLOBAL.BLACK,
  },
  'span svg': {
    color: COLORS.GLOBAL.BLACK,
  },
  // eslint-disable-next-line sort-keys
  color: COLORS.LIGHT.GRAY_70,
  display: 'inline-flex',
  span: {
    borderColor: 'transparent',
  },
  svg: {
    color: COLORS.GLOBAL.BLACK,
  },
  [MQ.XL]: typography.bodyCopyTight,
};

export const navLink = {
  [THEME.LIGHT]: {
    root: {
      '&:hover:not(:active), &:focus:not(:active)': {
        span: {
          borderColor: COLORS.GLOBAL.BLACK,
          color: COLORS.GLOBAL.BLACK,
        },
      },
      // eslint-disable-next-line sort-keys
      '&:active': {
        span: {
          color: COLORS.LIGHT.GRAY_70,
        },
      },
      color: COLORS.LIGHT.GRAY_70,
      span: {
        borderColor: 'transparent',
        transition: `border-color ${TIME.MS100}ms ease, color ${TIME.MS100}ms ease`,
      },
      [MQ.M]: typography.tertiaryHeadline,
      [MQ.L]: typography.primarySubhead,
    },
    selected: {
      '&:hover:not(:active), &:focus:not(:active)': {
        span: {
          borderColor: COLORS.ORANGE.SHADE_15_SOLID,
          color: COLORS.ORANGE.SHADE_15_SOLID,
        },
      },
      '&:active': {
        span: {
          color: COLORS.GLOBAL.ORANGE,
        },
      },
      color: COLORS.GLOBAL.ORANGE,
      span: {
        borderColor: COLORS.GLOBAL.ORANGE,
        transition: `border-color ${TIME.MS100}ms ease, color ${TIME.MS100}ms ease`,
      },
    },
  },
  [THEME.ORANGE]: {
    root: {
      '&:hover': { color: COLORS.GLOBAL.WHITE },
      // eslint-disable-next-line sort-keys
      '&:active, &:focus': { color: COLORS.ORANGE.TINT_70 },
      color: COLORS.GLOBAL.WHITE,
      span: {
        borderColor: 'transparent',
      },
      [MQ.M]: typography.tertiaryHeadline,
      [MQ.L]: typography.primarySubhead,
    },
    selected: {
      '&:hover, &:focus, &:active': {
        span: { color: COLORS.GLOBAL.ORANGE },
      },
      color: COLORS.GLOBAL.WHITE,
      span: {
        borderColor: COLORS.GLOBAL.ORANGE,
        transition: `border-color ${TIME.MS100}ms ease`,
      },
    },
  },
};

export default styles;
