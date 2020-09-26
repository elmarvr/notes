export const isEmpty = (arg: Object | string) => {
  if (typeof arg === "string") {
    return arg === "";
  }
  return Object.keys(arg as Object).length === 0;
};
