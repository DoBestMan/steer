import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography, typographyStyles } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    padding: `${SPACING.SIZE_20}px 0px`,
    [MQ.M]: {
      display: 'flex',
      flexFlow: 'column',
      padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_20}px 0px`,
    },
  },
  ctaMenu: {
    display: 'flex',
    justifyContent: 'center',
    [MQ.M]: {
      flex: 1,
    },
  },
  ctaMenuIcon: {
    '&:hover': {
      backgroundColor: COLORS.ORANGE.SHADE_30,
    },
    '&[data-icon-type="brand"]': {
      svg: {
        width: '120px',
        [MQ.M]: {
          width: '160px',
        },
      },
    },

    '.SVGInline-svg': {
      [MQ.M]: {
        left: '-66px',
        position: 'absolute',
        top: '32px',
        width: '160px',
      },
      width: '70px',
      '.body-car': {
        path: {
          stroke: COLORS.LIGHT.OFF_WHITE_40,
        },
      },
      ['.front-wheel, .back-wheel']: {
        path: {
          stroke: COLORS.GLOBAL.WHITE,
          fill: COLORS.GLOBAL.WHITE,
        },
      },
    },

    alignItems: 'center',
    backgroundColor: COLORS.LIGHT.GRAY_20,
    borderRadius: '100%',
    boxSizing: 'border-box',
    color: COLORS.GLOBAL.WHITE,
    display: 'flex',
    height: '90px',
    justifyContent: 'center',
    marginBottom: SPACING.SIZE_20,
    overflow: 'hidden',
    position: 'relative',
    svg: {
      path: {
        fillOpacity: 1,
      },
    },
    width: '90px',
    [MQ.M]: {
      height: '120px',
      width: '120px',
    },
  },
  ctaMenuItem: {
    ':last-of-type': {
      marginRight: 0,
    },

    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flexFlow: 'column',
    marginRight: SPACING.SIZE_10,
    [MQ.M]: {
      marginRight: SPACING.SIZE_30,
    },
  },
  ctaMenuLabel: [
    typography.eyebrow,
    {
      color: COLORS.GLOBAL.WHITE,
      textTransform: 'uppercase',
    },
  ],
  headerSection: {
    display: 'flex',
    marginBottom: SPACING.SIZE_10,
    [MQ.M]: {
      marginBottom: 0,
    },
  },
  homepageContainer: {
    padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_20}px`,
    [MQ.M]: {
      display: 'flex',
      padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_60}px`,
    },
  },
  locationIcon: {
    height: '16px',
    marginRight: '10px',
    width: '12px',
  },
  title: [
    typography.eyebrow,
    {
      flex: 1,
      textTransform: 'uppercase',
      [MQ.M]: [
        typography.primarySubhead,
        {
          padding: `0 ${SPACING.SIZE_60}px`,
          [MQ.M]: {
            padding: 0,
          },
        },
      ],
      [MQ.L]: [typographyStyles.tertiaryHeadline],
    },
  ],
  zipLabel: {
    borderBottom: '2px dotted',
  },
  zipSection: [
    typography.labelCopyTight,
    {
      alignItems: 'center',
      color: COLORS.ORANGE.SHADE_85,
      cursor: 'pointer',
      display: 'flex',
    },
  ],
};

export default styles;
