import { keyframes } from '@emotion/core';

import { MQ, StylesMap } from '~/lib/constants';

const searchScrollAnimation = keyframes({
  '0%, 30%': {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  '32%': {
    opacity: 0,
  },
  '34%, 63%': {
    opacity: 1,
    transform: 'translate3d(0, 100%, 0)',
  },
  '65%': {
    opacity: 0,
  },
  '67%, 96%': {
    opacity: 1,
    transform: 'translate3d(0, 200%, 0)',
  },
  '98%': {
    opacity: 0,
  },
  '100%': {
    opacity: 1,
    transform: 'translate3d(0, 300%, 0)',
  },
});

const styles: StylesMap = {
  label: {
    height: 'inherit',
  },
  hideOnSmallMedium: {
    display: 'none',

    [MQ.L]: {
      display: 'block',
    },
  },
  scrollContainer: {
    alignSelf: 'flex-end',
    display: 'inline-flex',
    flexDirection: 'column-reverse',
    height: 'inherit',
    marginLeft: '0.5ch',
    overflow: 'hidden',
  },
  scrollItem: {
    animation: `9s infinite 4s ${searchScrollAnimation}`,
    transition: 'opacity 0.1 ease, transform 0.1 ease',
  },
};

export default styles;
