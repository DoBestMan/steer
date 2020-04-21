import { addDecorator, addParameters } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import { Global } from '@emotion/core';
import { global } from '../src/styles/document/global.styles';
import Layout from '../src/components/global/Layout/Layout'

import './mockNextRouter';

const withGlobal = (cb) => (
  <>
    <Global styles={global} />
    <Layout>
      {cb()}
    </Layout>
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
  },
});

addDecorator(withGlobal);
addDecorator(withKnobs);
