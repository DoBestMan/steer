import { COLORS, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  container: {
    cursor: 'pointer',
    '&:hover': {
      'span:last-of-type': {
        borderBottom: '2px dotted',
        borderBottomColor: COLORS.GLOBAL.BLACK,
      },
    },
  },
  svgContainer: {
    svg: {
      width: '18px',
      height: '32px',
    },
  },
};

export default styles;
