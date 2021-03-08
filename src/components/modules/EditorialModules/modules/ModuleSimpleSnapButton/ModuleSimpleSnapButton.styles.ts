import { COLORS, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const simpleSnapStyles: StylesMap = {
  wrapper: {
    alignItems: 'center',
    background: COLORS.GLOBAL.ORANGE,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    left: 0,
    position: 'fixed',
    right: 0,
    zIndex: Z_INDEX.FRONT,
  },
  simpleSnapButtonSection: {
    marginBottom: SPACING.SIZE_40,
    marginTop: SPACING.SIZE_20,
  },
  userInfo: [
    typography.tertiaryHeadline,
    {
      backgroundColor: COLORS.LIGHT.OFF_WHITE,
      padding: `${SPACING.SIZE_20}px 0 ${SPACING.SIZE_60}px`,
      textAlign: 'center',
    },
  ],
};
export default simpleSnapStyles;
