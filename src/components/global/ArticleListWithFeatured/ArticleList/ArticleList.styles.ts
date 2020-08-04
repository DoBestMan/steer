import { COLORS, SPACING, StylesMap } from '~/lib/constants';

const styles: StylesMap = {
  list: {
    // enables the entire list item to be clickable while only triggering focus styles on link label
    'a:after': {
      content: '""',
      height: '100%',
      position: 'absolute',
      width: '100%',
    },
    width: '100%',
  },
  link: {
    marginTop: SPACING.SIZE_10,
    '& > span': { borderColor: COLORS.GLOBAL.WHITE },
    '& > span:hover': {
      borderColor: COLORS.GLOBAL.WHITE,
    },
    position: 'relative',
  },
};

export default styles;
