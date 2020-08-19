import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: {
    justifyContent: 'center',
    width: '100%',

    ':disabled': {
      // To keep button width untouched
      '> span': {
        height: 0,
        visibility: 'hidden',
      },
    },
  },
  buttonLoading: {
    position: 'absolute',
  },
  copy: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
      marginBottom: SPACING.SIZE_15,

      span: {
        display: 'block',
      },
    },
  ],
  copyHeader: [
    typography.primarySubhead,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  link: [
    typography.smallCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  loading: {
    display: 'flex',
  },
  modalHeaderStyles: {
    marginBottom: SPACING.SIZE_30,
  },
  price: [
    typography.primarySubhead,
    {
      color: COLORS.GLOBAL.ORANGE,
      marginBottom: SPACING.SIZE_15,
    },
  ],
  removeCoverageRadio: {
    marginBottom: SPACING.SIZE_40,
  },
  roadHazardRadio: {
    marginBottom: SPACING.SIZE_10,
  },
};

export default styles;
