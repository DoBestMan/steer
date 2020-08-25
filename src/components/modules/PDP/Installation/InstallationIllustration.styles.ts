import { CSSObject, keyframes } from '@emotion/core';
import { Keyframes } from '@emotion/serialize';

import { EASING, MQ, TIME } from '~/lib/constants';

const carEntrance = keyframes({
  '0%': {
    right: '120%',
  },
  '100%': {
    right: 136,
  },
});

export const rotateWheel = keyframes({
  '0%': {
    transform: 'rotateZ(0deg)',
  },
  '100%': {
    transform: 'rotateZ(1080deg)',
  },
});

export const rotateWheelM = keyframes({
  '0%': {
    transform: 'rotateZ(0deg)',
  },
  '100%': {
    transform: 'rotateZ(3600deg)',
  },
});

const sceneryEntrance = keyframes({
  '0%': {
    backgroundPosition: '0 0',
  },
  '100%': {
    backgroundPosition: '-25vw 0',
  },
});

const sceneryEntranceM = keyframes({
  '0%': {
    backgroundPosition: '0 0',
  },
  '100%': {
    backgroundPosition: '-15vw 0',
  },
});

const shopEntrance = keyframes({
  '0%': {
    right: -200,
  },
  '100%': {
    right: 40,
  },
});

const durationS = `${TIME.MS3000}ms`;
const durationM = `${TIME.MS3000}ms`;
const durationL = `${TIME.MS5000}ms`;

const animate = (animationName: Keyframes, animationNameM?: Keyframes) => ({
  animation: `${animationName} ${durationS} ${EASING.QUAD_EASE_OUT} forwards`,

  [MQ.M]: {
    animationName: animationNameM || animationName,
    animationDuration: durationM,
  },

  [MQ.L]: {
    animationDuration: durationL,
  },
});

const styles: CSSObject = {
  car: {
    bottom: -6,
    position: 'absolute',
    right: 116,

    [MQ.XL]: {
      bottom: 0,
      transform: 'translateX(-180px)',
    },
  },
  carAnimate: [
    animate(carEntrance),
    {
      '.back-wheel, .front-wheel': animate(rotateWheel, rotateWheelM),
    },
  ],
  root: {
    position: 'relative',
    overflow: 'hidden',
  },
  scenery: {
    backgroundSize: 'auto 75px',
    height: '100%',
    left: 0,
    opacity: 0.5,
    position: 'absolute',
    right: 0,
    top: 0,

    [MQ.XL]: {
      backgroundSize: 'auto 133px',
    },
  },
  sceneryAnimate: animate(sceneryEntrance, sceneryEntranceM),
  shop: {
    backgroundImage: 'url(/static/assets/pdp/shop.svg)',
    backgroundRepeat: 'no-repeat',
    bottom: 0,
    height: 83,
    position: 'absolute',
    width: 130,

    [MQ.XL]: {
      backgroundSize: 'contain',
      height: 122,
      right: 40,
      transform: 'translateX(-90px)',
      width: 205,
    },
  },
  shopAnimate: animate(shopEntrance),
};

export default styles;
