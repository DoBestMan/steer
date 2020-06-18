/* eslint-disable @typescript-eslint/ban-ts-ignore */

import '@testing-library/jest-dom/extend-expect';

import fetch, { FetchError, Response } from 'node-fetch';

// @ts-ignore
global.IntersectionObserver = jest.fn(function () {
  this.observe = jest.fn();
  this.unobserve = jest.fn();
  this.disconnect = jest.fn();
});

// Access Response/FetchError objects in tests
// https://github.com/jefflau/jest-fetch-mock/issues/13#issuecomment-299413329

// @ts-ignore
global.Response = Response;
// @ts-ignore
global.FetchError = FetchError;
// @ts-ignore
global.fetch = fetch;

// Manually mock next/dynamic as the next.js (7.0.2) babel plugin will compile to Webpack
// lazy imports (require.resolveWeak) who're conflicting with the Node module system.
jest.mock('next/dynamic', () => () => {
  function DynamicComponent() {
    return null;
  }
  DynamicComponent.displayName = 'LoadableComponent';
  DynamicComponent.preload = jest.fn();
  return DynamicComponent;
});
