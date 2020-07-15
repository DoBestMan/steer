import { StylesMap, TIME } from '~/lib/constants';

const styles: StylesMap = {
  root: {
    transform: 'translateY(100%)',
    transition: `transform ${TIME.MS400}ms ease`,

    // eslint-disable-next-line sort-keys
    '&[aria-hidden="false"]': {
      transform: 'translateY(0)',
    },
  },
};

export default styles;
