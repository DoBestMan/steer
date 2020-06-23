// Simple pub/sub to transmit translate value from Carousel without having to re-render the React loop
import { randomString } from '~/lib/utils/string';

export enum TRANSLATE_DIRECTION {
  DOWN = 'down',
  LEFT = 'left',
  NONE = '',
  RIGHT = 'right',
  UP = 'UP',
}

export type TranslateObject = {
  x?: number;
  y?: number;
};

export type CallbackList = {
  [key: string]: () => void;
};

const aCB: CallbackList = {};

const callbacks = () => {
  for (const key in aCB) {
    if (aCB[key]) {
      aCB[key]();
    }
  }
};

class Translate {
  _directionX: TRANSLATE_DIRECTION = TRANSLATE_DIRECTION.NONE;
  _directionY: TRANSLATE_DIRECTION = TRANSLATE_DIRECTION.NONE;
  _x = 0;
  _y = 0;

  set directionX(direction) {
    const update = direction !== this._directionX;
    this._directionX = direction;
    if (update) {
      callbacks();
    }
  }

  get directionX() {
    return this._directionX;
  }

  set directionY(direction) {
    const update = direction !== this._directionY;
    this._directionY = direction;
    if (update) {
      callbacks();
    }
  }

  get directionY() {
    return this._directionY;
  }

  set x(x) {
    const update = x !== this._x;
    this._x = x;
    if (update) {
      callbacks();
    }
  }

  get x() {
    return this._x;
  }

  set y(y) {
    const update = y !== this._y;
    this._y = y;

    if (update) {
      callbacks();
    }
  }

  get y() {
    return this._y;
  }
}

let translate = new Translate();

export const resetTranslateInstance = () => {
  translate = new Translate();
};

export const getTranslate = () => ({
  directionX: translate.directionX,
  directionY: translate.directionY,
  x: translate.x,
  y: translate.y,
});

export const setTranslate = (translateObject: TranslateObject) => {
  translate.directionY =
    translateObject.y && translate.y > translateObject.y
      ? TRANSLATE_DIRECTION.UP
      : TRANSLATE_DIRECTION.DOWN;
  translate.directionX =
    translateObject.x && translate.x > translateObject.x
      ? TRANSLATE_DIRECTION.LEFT
      : TRANSLATE_DIRECTION.RIGHT;

  if (translateObject.x) {
    translate.x = translateObject.x;
  }
  if (translateObject.y) {
    translate.y = translateObject.y;
  }

  return getTranslate();
};

export const subscribeTranslate = (callback = () => {}, _id = null) => {
  // "id" is only for tracking a value for debugging
  const id = _id ? _id + randomString() : randomString();

  aCB[id] = callback;

  // return the dispose function
  return () => {
    delete aCB[id];
  };
};
