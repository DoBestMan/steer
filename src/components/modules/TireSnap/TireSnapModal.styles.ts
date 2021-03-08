import { COLORS, SPACING, StylesMap, Z_INDEX } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  actionButton: {
    bottom: SPACING.SIZE_10,
    margin: `0 ${SPACING.SIZE_05}px`,
    position: 'relative',
  },
  control: {
    alignItems: 'center',
    background: COLORS.GLOBAL.ORANGE,
    bottom: 0,
    boxSizing: 'border-box',
    display: 'flex',
    height: SPACING.SIZE_100,
    justifyContent: 'center',
    position: 'fixed',
    width: '100%',
  },
  failureScreenWrapper: {
    '& h2 p span': {
      color: COLORS.GLOBAL.ORANGE,
    },
    '& h2, & h2 p': [
      typography.primaryHeadline,
      {
        color: COLORS.GLOBAL.BLACK,
        marginBottom: SPACING.SIZE_20,
      },
    ],
    '& p': typography.tertiaryHeadline,
    background: COLORS.GLOBAL.WHITE,
    color: COLORS.GLOBAL.BLACK,
    height: '100%',
    overflow: 'auto',
    paddingBottom: SPACING.SIZE_100,
    position: 'fixed',
    width: '100%',
    zIndex: Z_INDEX.ZERO,
  },
  failureTopSection: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    marginTop: SPACING.SIZE_60,
    overflow: 'auto',
    padding: `0 ${SPACING.SIZE_20}px`,
    position: 'relative',
    textAlign: 'center',
    width: '100%',
  },
  fullScreenImagePreview: {
    backgroundPosition: 'top',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    height: '100%',
    position: 'absolute',
    width: '100%',
  },
  fullScreenImagePreviewControl: {
    alignItems: 'center',
    background: COLORS.GLOBAL.ORANGE,
    bottom: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    height: SPACING.SIZE_100,
    justifyContent: 'space-around',
    position: 'fixed',
    width: '100%',
    zIndex: Z_INDEX.FRONT,
  },
  headerFailureImage: {
    marginTop: SPACING.SIZE_20,
    marginBottom: SPACING.SIZE_40,
  },
  help: [
    typography.secondaryHeadline,
    {
      border: '2px solid #fff',
      borderRadius: 9,
      color: COLORS.GLOBAL.WHITE,
      left: SPACING.SIZE_20,
      padding: `${SPACING.SIZE_01}px ${SPACING.SIZE_10}px`,
      position: 'absolute',
      top: SPACING.SIZE_20,
    },
  ],
  highlightedText: {
    color: COLORS.GLOBAL.ORANGE,
  },
  loadingDots: {
    width: SPACING.SIZE_15,
    textAlign: 'left',
    display: 'inline-block',
  },
  loadingWheel: {
    backgroundColor: COLORS.GLOBAL.WHITE,
  },
  mainIcon: {
    '& svg': {
      backgroundColor: COLORS.GLOBAL.WHITE,
      height: 124,
      width: 124,
    },
    backgroundColor: COLORS.GLOBAL.WHITE,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_40,
  },
  screenContent: {
    padding: `0 ${SPACING.SIZE_20}px`,
    position: 'absolute',
    textAlign: 'center',
    top: '50%',
    transform: 'translateY(-60%)',
    width: '100%',
  },
  screenWrapper: {
    '& h2 p span': {
      color: COLORS.GLOBAL.ORANGE,
    },
    '& h2, & h2 p': [
      typography.primaryHeadline,
      {
        color: COLORS.GLOBAL.BLACK,
        marginBottom: SPACING.SIZE_20,
      },
    ],
    '& p': typography.tertiaryHeadline,
    background: COLORS.GLOBAL.WHITE,
    color: COLORS.GLOBAL.BLACK,
    height: '100%',
    position: 'fixed',
    width: '100%',
    zIndex: Z_INDEX.ZERO,
  },
  smallTitle: [
    typography.tertiaryHeadline,
    {
      marginTop: SPACING.SIZE_20,
    },
  ],
  wrapper: {
    height: '100%',
    overflow: 'auto',
    position: 'fixed',
    width: '100%',
    zIndex: Z_INDEX.ZERO,
  },
};

export default styles;
