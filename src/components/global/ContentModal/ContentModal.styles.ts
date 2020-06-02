import { CSSObject } from '@emotion/core';

import { FULLSCREEN_LATERAL_PADDING } from '~/components/global/Modal/Modal.styles';
import { BORDERS, COLORS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  container: {
    paddingTop: SPACING.SIZE_70,
  },
  contentContainer: [
    typography.bodyCopy,
    {
      color: COLORS.LIGHT.GRAY_70,

      '> * ': {
        marginBottom: 22, // bodyCopy's line height
      },

      ul: {
        paddingInlineStart: '1.75rem',
      },
      li: {
        listStyle: 'initial',
        marginBottom: 15, // bodyCopy's font size
      },
    },
  ],
  imageContainer: {
    marginBottom: SPACING.SIZE_40,
    marginLeft: -FULLSCREEN_LATERAL_PADDING,
    width: `calc(100% + ${FULLSCREEN_LATERAL_PADDING * 2}px)`,
  },
  link: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  subtitle: [
    typography.largeCopy,
    {
      marginBottom: SPACING.SIZE_30,
    },
  ],
  supportContainer: {
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    marginTop: SPACING.SIZE_50,
    paddingTop: SPACING.SIZE_50,
  },
  title: [
    typography.jumboHeadline,
    {
      marginBottom: SPACING.SIZE_10,
    },
  ],
};

export default styles;
