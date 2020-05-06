/* eslint-disable @typescript-eslint/ban-ts-ignore */

import '@testing-library/jest-dom/extend-expect';
import { FetchError, Response } from 'node-fetch';

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
