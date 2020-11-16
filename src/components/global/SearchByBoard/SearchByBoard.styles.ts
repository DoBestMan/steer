import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography, typographyStyles } from '~/styles/typography.styles';

const styles: StylesMap = {
  container: {
    backgroundColor: COLORS.GLOBAL.ORANGE,
    padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_20}px`,
    [MQ.M]: {
      display: 'flex',
      padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_40}px`,
    },
    [MQ.L]: {
      padding: `${SPACING.SIZE_20}px ${SPACING.SIZE_60}px`,
    },
  },
  ctaMenu: {
    display: 'flex',
    justifyContent: 'center',
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
  title: [
    typography.eyebrow,
    {
      marginBottom: SPACING.SIZE_20,
      textTransform: 'uppercase',
      [MQ.M]: [
        typography.primarySubhead,
        {
          padding: `0 ${SPACING.SIZE_60}px`,
          [MQ.M]: {
            flexBasis: '26%',
            padding: 0,
          },
        },
      ],
      [MQ.L]: [
        typographyStyles.tertiaryHeadline,
        {
          flexBasis: '28%',
        },
      ],
      [MQ.XL]: {
        flexBasis: '36%',
      },
    },
  ],
};

export default styles;
