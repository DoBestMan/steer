import { Emitter } from './Emitter';

let callbackFake1: jest.Mock;
let callbackFake2: jest.Mock;
const emitter = new Emitter<string>();

beforeEach(() => {
  callbackFake1 = jest.fn();
  callbackFake2 = jest.fn();
});

afterEach(() => {
  emitter.DEBUG_destroy();
});

it('should call the callback listeners of a event', () => {
  emitter.on(callbackFake1);
  emitter.on(callbackFake2);

  emitter.emit('Test');

  expect(callbackFake1).toHaveBeenCalledWith('Test');
  expect(callbackFake2).toHaveBeenCalledWith('Test');
});

it('should not call the unsubscribed callback', () => {
  emitter.on(callbackFake1);
  emitter.on(callbackFake2);

  emitter.emit('Test');

  expect(callbackFake1).toHaveBeenCalledWith('Test');
  expect(callbackFake2).toHaveBeenCalledWith('Test');

  // unsubscribe from the event
  emitter.off(callbackFake1);

  emitter.emit('Test');

  expect(callbackFake1).toHaveBeenCalledTimes(1);
  expect(callbackFake2).toHaveBeenCalledTimes(2);
});

it('should not throw if I unsubscribe an inexistent callback', () => {
  expect(() => {
    emitter.off(callbackFake1);
  }).not.toThrow();
});

it('should remove all the callbacks after call DEBUG_destroy', () => {
  emitter.on(callbackFake1);
  emitter.on(callbackFake2);
  emitter.DEBUG_destroy();

  emitter.emit('Test');

  expect(callbackFake1).not.toHaveBeenCalled();
  expect(callbackFake2).not.toHaveBeenCalled();
});
