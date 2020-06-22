import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: {
    display: 'block',
    width: '100%',
    [MQ.L]: {
      marginTop: 'auto',
    },
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
