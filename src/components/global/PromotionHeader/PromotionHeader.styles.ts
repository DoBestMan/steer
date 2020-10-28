import { COLORS, MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  iconStyles: {
    color: COLORS.GLOBAL.ORANGE,
    width: '16px',

    [MQ.M]: {
      width: '22px',
    },
  },
  promoTagSection: { marginBottom: SPACING.SIZE_20 },
  root: {
    padding: SPACING.SIZE_20,
  },
  spacingRight10: { marginRight: SPACING.SIZE_10 },
  subTitle: [
    typography.bodyCopyTight,
    {
      color: COLORS.LIGHT.GRAY_70,
    },
  ],
  titleContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    marginBottom: SPACING.SIZE_10,
  },
};

export default styles;
