/**
 * A function that emits a side effect and does not return anything.
 */
/* eslint-disable-next-line @typescript-eslint/no-explicit-any */
export type Procedure = (...args: any[]) => void;

export type Options = {
  isImmediate: boolean;
};

export function debounce<F extends Procedure>(
  callback: F,
  waitMilliseconds = 100,
  options: Options = {
    isImmediate: false,
  },
): (this: ThisParameterType<F>, ...args: Parameters<F>) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return function (this: ThisParameterType<F>, ...args: Parameters<F>) {
    const doLater = () => {
      timeoutId = undefined;
      if (!options.isImmediate) {
        callback(...args);
      }
    };

    const shouldCallNow = options.isImmediate && timeoutId === undefined;

    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(doLater, waitMilliseconds);

    if (shouldCallNow) {
      callback(...args);
    }
  };
}

export default debounce;
