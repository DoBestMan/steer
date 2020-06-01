import { CSSObject, keyframes } from '@emotion/core';

import { MQ } from '~/lib/constants';

const searchScrollAnimation = keyframes({
  '0%, 23%': {
    opacity: 1,
    transform: 'translate3d(0, 0, 0)',
  },
  '24%': {
    opacity: 0,
  },
  '25%, 48%': {
    opacity: 1,
    transform: 'translate3d(0, 100%, 0)',
  },
  '49%': {
    opacity: 0,
  },
  '50%, 73%': {
    opacity: 1,
    transform: 'translate3d(0, 200%, 0)',
  },
  '74%': {
    opacity: 0,
  },
  '75%, 100%': {
    opacity: 1,
    transform: 'translate3d(0, 300%, 0)',
  },
});

const styles: CSSObject = {
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
