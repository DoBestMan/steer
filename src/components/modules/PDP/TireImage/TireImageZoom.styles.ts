import { MQ, SPACING, StylesMap } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: StylesMap = {
  brandContainer: {
    position: 'absolute',
  },
  brandLabel: typography.tertiaryHeadline,
  brandLogo: {
    height: 15,
    marginBottom: SPACING.SIZE_05,
    marginTop: SPACING.SIZE_10,
    width: 'auto',

    [MQ.M]: {
      height: 18,
    },
    [MQ.L]: {
      height: 25,
      marginBottom: SPACING.SIZE_15,
    },
  },
  imageWrap: {
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
};

export default styles;
