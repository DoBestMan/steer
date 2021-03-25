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
      margin: `${SPACING.SIZE_25}px -${CONTENT_LATERAL_PADDING.S}px 0`,
      [MQ.M]: {
        margin: `${SPACING.SIZE_25}px -${CONTENT_LATERAL_PADDING.M}px 0`,
      },
      [MQ.L]: {
        margin: `${SPACING.SIZE_25}px -${CONTENT_LATERAL_PADDING.L}px 0`,
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
    paddingBottom: SPACING.SIZE_10,

    [MQ.M]: {
      paddingBottom: 0,
    },
  },
  copyConfirmation: {
    marginBottom: SPACING.SIZE_40,

    [MQ.L]: {
      marginBottom: SPACING.SIZE_50,
    },
  },
  decorator: {
    ':before': {
      padding: `0 ${SPACING.SIZE_05}px`,
      content: '"•"',
      fontSize: 8,
    },

    alignItems: 'center',
    display: 'flex',
  },
  modalContent: {
    [MQ.L]: {
      height: '100%',
    },
  },
  numberControlsWrapper: {
    marginTop: SPACING.SIZE_30,
    textAlign: 'center',
  },
  pickerContainer: {
    borderTop: BORDERS.SOLID_GRAY_20_1PX,
    marginTop: SPACING.SIZE_30,
    padding: `${SPACING.SIZE_30}px 0 ${SPACING.SIZE_40}px`,

    [MQ.L]: {
      marginTop: SPACING.SIZE_40,
      padding: `${SPACING.SIZE_40}px 0 ${SPACING.SIZE_40}px`,
    },
  },
  subtitle: {
    display: 'flex',
  },
};

export default styles;
