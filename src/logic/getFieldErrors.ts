import { Field, TypeError, FieldError } from "../models";

import { isEmpty } from "../utils/isEmpty";

import { getRequiredError } from "./getRequiredError";
import { getValidateError } from "./getValidateError";
import { getPatternError } from "./getPatternError";
import { getMatchError } from "./getMatchError";

const getFieldError = (field: Field, fields: Field[]) => {
  const { ref, required, validate, pattern, match } = field;

  const inputValue = ref.value.trim();

  const requiredError = getRequiredError(required, inputValue);
  const validateError = getValidateError(validate, inputValue);
  const patternError = getPatternError(pattern, inputValue);
  const matchError = getMatchError(match, fields, inputValue);

  const typeErrors: TypeError = {
    ...requiredError,
    ...validateError,
    ...patternError,
    ...matchError,
  };

  return (
    !isEmpty(typeErrors) &&
    ({
      [ref.name]: typeErrors,
    } as FieldError)
  );
};

const getFieldErrors = (fields: Field[]) => {
  const fieldErrors: FieldError = {};

  fields.forEach((field) =>
    Object.assign(fieldErrors, getFieldError(field, fields))
  );

  return fieldErrors;
};

export { getFieldErrors };
