import { COLORS, RADIUS, SPACING, StylesMap, TIME } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const stylesTireSnap: StylesMap = {
  buttonWrapper: {
    bottom: SPACING.SIZE_10,
    display: 'inline-block',
    'input[type=file]': {
      left: 0,
      opacity: 0,
      padding: `${SPACING.SIZE_15}px 0`,
      position: 'absolute',
      top: 0,
      width: '100%',
    },
    overflow: 'hidden',
    position: 'relative',
  },
  content: {
    backgroundColor: COLORS.DARK.GRAY_DARKER_SOLID,
    color: COLORS.DARK.GRAY_40,
    paddingBottom: SPACING.SIZE_100,
  },
  headerImage: {
    marginTop: SPACING.SIZE_60,
  },
  instructionsList: [
    typography.bodyCopy,
    {
      '& li': {
        listStylePosition: 'inside',
        listStyleType: 'decimal',
        marginBottom: SPACING.SIZE_15,
      },
      marginBottom: SPACING.SIZE_50,
    },
  ],
  paragraph: [
    typography.bodyCopy,
    {
      padding: `${SPACING.SIZE_10}px 0 ${SPACING.SIZE_40}px`,
    },
  ],
  screenWrapper: {
    backgroundColor: COLORS.DARK.GRAY_DARKER_SOLID,
    height: '100%',
    left: 0,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  smallTitle: [
    typography.tertiaryHeadline,
    {
      color: COLORS.GLOBAL.WHITE,
      marginTop: SPACING.SIZE_60,
    },
  ],
  snapButton: [
    typography.primarySubhead,
    {
      alignItems: 'center',
      backgroundColor: COLORS.GLOBAL.WHITE,
      borderRadius: RADIUS.RADIUS_25,
      borderStyle: 'solid',
      borderWidth: 2,
      boxSizing: 'border-box',
      color: COLORS.GLOBAL.ORANGE,
      display: 'inline-flex',
      height: 50,
      padding: `0 ${SPACING.SIZE_25}px`,
      transition: `all ${TIME.MS100}ms ease`,
      width: 'auto',
    },
  ],
  title: {
    '& span': [
      typography.primaryHeadline,
      {
        color: COLORS.GLOBAL.ORANGE,
      },
    ],
    '& p': [
      typography.modalHeadline,
      {
        color: COLORS.GLOBAL.WHITE,
      },
    ],
    padding: `${SPACING.SIZE_40}px 0 ${SPACING.SIZE_40}px`,
  },
  widthWrapper: {
    padding: `0 ${SPACING.SIZE_20}px`,
  },
  wrapper: {
    height: '100%',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
  },
};
export default stylesTireSnap;
