import { MQ, StylesMap, Z_INDEX } from '~/lib/constants';

const styles: StylesMap = {
  root: {
    bottom: 0,
    display: 'block',
    height: 0,
    left: '50%',
    margin: 'auto',
    position: 'absolute',
    top: 0,
    transform: 'translateX(-50%)',
    width: 300,
    zIndex: Z_INDEX.TOP,

    [MQ.M]: {
      width: 478,
    },
    [MQ.L]: {},
  },
};

export default styles;
