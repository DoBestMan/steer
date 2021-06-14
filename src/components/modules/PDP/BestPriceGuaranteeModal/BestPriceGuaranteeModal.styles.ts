import { COLORS, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  button: {
    width: '100%',
    justifyContent: 'center',
  },
  contentWrapper: {
    marginTop: SPACING.SIZE_80,
  },
  description: {
    '& > li': {
      listStyleType: 'disc',
    },
    color: COLORS.LIGHT.GRAY_70,
    fontSize: '12px',
    lineHeight: '22px',
    marginTop: SPACING.SIZE_60,
    paddingLeft: SPACING.SIZE_20,
  },
  iconStyle: {
    margin: SPACING.SIZE_10,
    width: 19,
    height: 19,
  },
  subTitle: [
    typography.largeCopy,
    {
      marginTop: SPACING.SIZE_10,
      marginBottom: SPACING.SIZE_40,
    },
  ],
  title: [typography.jumboHeadline],
};

export default styles;
