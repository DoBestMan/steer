import { COLORS, SPACING, StylesMap } from '~/lib/constants';

import { fontBase } from '../CompareTable.styles';

const BASE_COLOR = '#333333';

const styles: StylesMap = {
  buttonIcon: {
    width: 22,
    svg: {
      display: 'block',
      height: 5,
      padding: SPACING.SIZE_05,
    },
  },
  content: [
    fontBase,
    {
      color: COLORS.LIGHT.GRAY_70,
      opacity: 0.75,
      fontWeight: 450,
    },
  ],
  root: {
    '& button': [
      fontBase,
      {
        color: BASE_COLOR,
        display: 'flex',
        fontWeight: 'bold',
        justifyContent: 'start',
        padding: 0,
      },
    ],
    '& button span': {
      flexGrow: 'inherit',
    },
    '& button[aria-expanded="true"]': [fontBase],
    '& div[role="region"][aria-hidden="false"]': {
      paddingBottom: SPACING.SIZE_10,
    },
  },
};

export default styles;
