import {
  COLORS,
  EASING,
  HEADER_SIZE,
  SPACING,
  StylesMap,
  TIME,
} from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  description: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,
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
    marginTop: SPACING.SIZE_02,
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

export const sizeStyles = {
  [HEADER_SIZE.JUMBO]: {
    header: [
      typography.jumboHeadline,
      {
        marginBottom: SPACING.SIZE_15,
      },
    ],
  },
  [HEADER_SIZE.PRIMARY]: {
    header: [
      typography.primaryHeadline,
      {
        marginBottom: SPACING.SIZE_20,
      },
    ],
  },
};

export default styles;
