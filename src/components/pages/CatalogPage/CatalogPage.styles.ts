import { css } from '@emotion/core';

import { MQ } from '~/lib/constants';

const styles = {
  root: css({
    marginTop: '-50px', // TEMP

    [MQ.M]: {
      marginTop: '-110px', // TEMP
    },
  }),
};

export default styles;
