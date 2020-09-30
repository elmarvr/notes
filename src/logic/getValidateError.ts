import { Rule, TypeError } from "../models";

const getValidateError = (
  validate: Rule<(value: string) => boolean>,
  value: string
) => !!validate && !validate.value(value) && validate.message;

export { getValidateError };
