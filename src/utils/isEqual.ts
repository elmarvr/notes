export const isEqual = <T>(arg1: T, arg2: T) =>
  JSON.stringify(arg1) === JSON.stringify(arg2);
