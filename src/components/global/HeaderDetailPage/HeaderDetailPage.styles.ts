import { COLORS, EASING, SPACING, StylesMap, TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  description: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  header: [
    typography.jumboHeadline,
    {
      marginBottom: SPACING.SIZE_15,
    },
  ],
  markdown: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  moreDescription: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
      display: 'none',
      marginTop: '1em',

      '&[aria-hidden="false"]': {
        display: 'block',
      },
    },
  ],
  showFullDescription: [
    typography.primarySubhead,
    {
      '&:hover, &:focus:not(:active)': {
        color: COLORS.GLOBAL.BLACK,
      },
      alignItems: 'center',
      color: COLORS.LIGHT.GRAY_70,
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
  subHeader: [
    typography.largeCopy,
    {
      color: COLORS.GLOBAL.BLACK,
      marginBottom: SPACING.SIZE_40,
    },
  ],
};

export default styles;
