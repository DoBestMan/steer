import { MQ } from '~/lib/constants';

export const layout = {
  centeredHorizontal: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  centeredVertical: {
    alignItems: 'center',
  },
  container: {
    display: 'flex',
  },
  hideOnSmall: {
    display: 'none',

    [MQ.M]: {
      display: 'block',
    },
  },
};
