import { FormError, Rule } from '../models';

const getPatternError = (
  pattern: Rule<RegExp>,
  value: string
): FormError | false =>
  !!pattern &&
  !pattern.value.test(value) && {
    type: "pattern",
    message: pattern.message,
  };

export { getPatternError };
