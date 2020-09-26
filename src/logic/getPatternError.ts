import { Rule, TypeError } from "../models";

const getPatternError = (pattern: Rule<RegExp>, value: string) =>
  !!pattern &&
  !pattern.value.test(value) &&
  ({ pattern: pattern.message } as TypeError);

export { getPatternError };
