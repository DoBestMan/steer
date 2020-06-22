import { CONTENT_LATERAL_PADDING } from '~/components/global/Modal/BottomCardModal.styles';
import { BORDERS, MQ, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  button: {
    [MQ.L]: {
      width: '100%',
      display: 'block',
    },
  },
  carouselStyles: [
    {
      margin: `0 -${CONTENT_LATERAL_PADDING.S}px`,
      [MQ.M]: {
        margin: `0 -${CONTENT_LATERAL_PADDING.M}px`,
      },
      [MQ.L]: {
        margin: `0 -${CONTENT_LATERAL_PADDING.L}px`,
      },
      /* eslint-disable sort-keys */
      '.swiper-slide:first-of-type': {
        marginLeft: CONTENT_LATERAL_PADDING.S,
        [MQ.M]: {
          marginLeft: CONTENT_LATERAL_PADDING.M,
        },
        [MQ.L]: {
          marginLeft: CONTENT_LATERAL_PADDING.L,
        },
      },

      '.swiper-slide:last-of-type': {
        marginRight: CONTENT_LATERAL_PADDING.S,
        [MQ.M]: {
          marginRight: CONTENT_LATERAL_PADDING.M,
        },
        [MQ.L]: {
          marginRight: CONTENT_LATERAL_PADDING.L,
        },
      },
      /* eslint-enable sort-keys */
    },
  ],
  container: {
    paddingTop: SPACING.SIZE_30,
    textAlign: 'center',

    [MQ.L]: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      paddingBottom: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_60,
    },
  },
  copyConfirmation: {
    marginBottom: SPACING.SIZE_50,
  },
  cta: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',

    /* eslint-disable sort-keys */
    '> :only-child': {
      width: '100%',
      display: 'block',
    },
    '> :not(:only-child):first-of-type': {
      marginLeft: SPACING.SIZE_10,

      [MQ.L]: {
        marginLeft: 0,
        marginBottom: SPACING.SIZE_10,
      },
    },
    /* eslint-enable sort-keys */

    [MQ.L]: {
      display: 'block',
      marginTop: 'auto',
    },
  },
  decorator: {
    ':before': {
      padding: `0 ${SPACING.SIZE_02}px`,
      content: '"•"',
      fontSize: 8,
    },
  },
  modalContentStyles: {
    height: '100%',
  },
  pickerContainer: {
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    marginTop: SPACING.SIZE_30,
    padding: `${SPACING.SIZE_30}px 0 ${SPACING.SIZE_40}px`,
  },
};

export default styles;
