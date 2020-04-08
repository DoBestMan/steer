import { addDecorator } from '@storybook/react';

import { Global } from '@emotion/core';
import { global } from '../src/styles/global.styles';

const withGlobal = (cb) => (
  <>
    <Global styles={global} />
    {cb()}
  </>
);

addDecorator(withGlobal);
