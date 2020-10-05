import { FormError, Rule } from '../models';

const getValidateError = (
  validate: Rule<(value: string) => boolean>,
  value: string
): FormError | false =>
  !!validate &&
  !validate.value(value) && {
    type: "validate",
    message: validate.message,
  };

export { getValidateError };
