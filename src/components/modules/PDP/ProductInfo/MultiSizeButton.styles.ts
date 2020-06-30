import { CSSObject } from '@emotion/core';

import { BORDERS, SPACING } from '~/lib/constants';
import { typography } from '~/styles/typography.styles';

const styles: CSSObject = {
  button: [
    typography.primarySubhead,
    {
      alignItems: 'center',
      borderTop: BORDERS.SOLID_GRAY_20_1PX,
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingBottom: SPACING.SIZE_20,
      paddingTop: SPACING.SIZE_20,
      textAlign: 'left',
      width: '100%',
    },
  ],
  icon: {
    marginLeft: SPACING.SIZE_05,
    order: 3,
  },
  loadIndex: {
    fontWeight: 'normal',
  },
  price: {
    display: 'block',
    order: 4,
    flexBasis: '100%',
  },
  quantity: {
    order: 2,
    marginRight: SPACING.SIZE_05,
  },
  root: {
    marginTop: SPACING.SIZE_20,
    width: '100%',
  },
  size: {
    order: 1,
    flexGrow: 1,
  },
};

export default styles;
