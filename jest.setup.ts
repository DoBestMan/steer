import '@testing-library/jest-dom/extend-expect';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
global.IntersectionObserver = jest.fn(function () {
  this.observe = jest.fn();
  this.unobserve = jest.fn();
  this.disconnect = jest.fn();
});
