import {
  COLORS,
  EASING,
  HEADER_SIZE,
  SPACING,
  StylesMap,
  THEME,
  TIME,
} from '~/lib/constants';
import { links } from '~/styles/links.styles';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  Body: {
    a: links.light,
  },
  container: typography.bodyCopy,
  imageContainer: {
    marginBottom: SPACING.SIZE_40,
  },
  moreBody: {
    display: 'none',
    marginTop: '1em',
    '&[aria-hidden="false"]': {
      display: 'block',
    },
    a: links.light,
  },
  showFullBody: [
    typography.primarySubhead,
    {
      alignItems: 'center',
      display: 'flex',
      marginTop: SPACING.SIZE_05,
      transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
    },
  ],
  showFullBodyIcon: {
    marginTop: SPACING.SIZE_02,
    svg: {
      display: 'block',
      height: 5,
      padding: SPACING.SIZE_05,
    },
  },
  subTitle: [
    typography.largeCopy,
    {
      marginBottom: SPACING.SIZE_40,
    },
  ],
};

export const sizeStyles = {
  [HEADER_SIZE.JUMBO]: {
    title: [
      typography.jumboHeadline,
      {
        marginBottom: SPACING.SIZE_15,
      },
    ],
  },
  [HEADER_SIZE.PRIMARY]: {
    title: [
      typography.primaryHeadline,
      {
        marginBottom: SPACING.SIZE_10,
      },
    ],
  },
};

export const themeStyles = {
  [THEME.LIGHT]: {
    buttonHover: {
      '&:hover, &:focus:not(:active)': {
        color: COLORS.GLOBAL.BLACK,
      },
    },
    container: {
      color: COLORS.LIGHT.GRAY_70,
    },
    links: {
      a: links.LIGHT,
    },
    subTitle: {
      color: COLORS.GLOBAL.BLACK,
    },
    title: {
      color: COLORS.GLOBAL.BLACK,
    },
  },
  [THEME.DARK]: {
    buttonHover: {
      '&:hover, &:focus:not(:active)': {
        color: COLORS.GLOBAL.WHITE,
      },
    },
    container: {
      color: COLORS.DARK.GRAY_40,
    },
    links: {
      a: links.DARK,
    },
    subTitle: {
      color: COLORS.GLOBAL.WHITE,
    },
    title: {
      color: COLORS.GLOBAL.WHITE,
    },
  },
  [THEME.ORANGE]: {
    buttonHover: {
      '&:hover, &:focus:not(:active)': {
        color: COLORS.GLOBAL.BLACK,
      },
    },
    container: {
      color: COLORS.ORANGE.SHADE_85,
    },
    links: {
      a: links.DARK,
    },
    subTitle: {
      color: COLORS.GLOBAL.BLACK,
    },
    title: {
      color: COLORS.GLOBAL.WHITE,
    },
  },
};

export default styles;
