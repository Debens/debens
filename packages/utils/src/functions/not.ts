export const not =
  <F extends (...args: Args) => boolean, Args extends any[]>(fn: F) =>
  (...args: Parameters<F>) =>
    !fn(...args);
