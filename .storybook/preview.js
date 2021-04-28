import './mockNextRouter';

import React from 'react';
import { Global } from '@emotion/core';
import { withA11y } from '@storybook/addon-a11y';
import { withKnobs } from '@storybook/addon-knobs';
import { addDecorator, addParameters } from '@storybook/react';

import Layout from '../src/components/global/Layout/Layout';
import { NavContextProvider } from '../src/context/Nav.context';
import { UserPersonalizationContextProvider } from '../src/context/UserPersonalization.context';
import { global } from '../src/styles/document/global.styles';

const withGlobal = (cb) => (
  <>
    <Global styles={global} />
    <NavContextProvider>
      <UserPersonalizationContextProvider isStorybook>
        <Layout>{cb()}</Layout>
      </UserPersonalizationContextProvider>
    </NavContextProvider>
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
addDecorator(withA11y);
