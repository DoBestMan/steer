import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { Global } from '@emotion/core';
import { global } from '../src/styles/global/global.styles';

const withGlobal = (cb) => (
  <>
    <Global styles={global} />
    {cb()}
  </>
);

const customViewports = {
  small: {
    name: 'small',
    styles: {
      height: '812px',
      width: '375px',
    },
    type: 'mobile',
  },
  medium: {
    name: 'medium',
    styles: {
      height: '1024px',
      width: '768px',
    },
    type: 'tablet',
  },
  large: {
    name: 'large',
    styles: {
      height: 'calc(100% - 20px)',
      width: '1024px',
    },
    type: 'desktop',
  },
  xlarge: {
    name: 'xlarge',
    styles: {
      height: 'calc(100% - 20px)',
      width: '1440px',
    },
    type: 'desktop',
  },
};

addParameters({
  viewport: {
    viewports: customViewports,
    defaultViewport: 'responsive',
  },
});

addDecorator(withGlobal);
addDecorator(withKnobs);
