import {
  BORDERS,
  COLORS,
  EASING,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  markdown: [
    typography.bodyCopy,
    {
      a: {
        borderBottom: BORDERS.DOTTED_GRAY_40_2PX,
        transition: `border-bottom ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,

        '&:hover': {
          color: COLORS.GLOBAL.WHITE,
          borderColor: COLORS.GLOBAL.WHITE,
        },
      },

      p: {
        '&:not(:last-of-type)': {
          marginBottom: '1em',
        },
      },
    },
  ],
  moreDescription: {
    display: 'none',
    marginTop: '1em',

    '&[aria-hidden="false"]': {
      display: 'block',
    },
  },
  showFullDescription: [
    typography.primarySubhead,
    {
      '&:hover, &:focus:not(:active)': {
        color: COLORS.GLOBAL.WHITE,
      },

      alignItems: 'center',
      color: COLORS.DARK.GRAY_40,
      display: 'flex',
      marginTop: SPACING.SIZE_05,
      transition: `color ${TIME.MS100}ms ${EASING.CIRC_EASE_OUT}`,
    },
  ],
  showFullDescriptionIcon: {
    marginTop: 2,

    svg: {
      display: 'block',
      height: 5,
      padding: SPACING.SIZE_05,
    },
  },
};

export default styles;