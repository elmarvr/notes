import { Field, FormErrors } from '../models';
import { excludeFalse } from '../utils/excludeFalse';
import { getMatchError } from './getMatchError';
import { getPatternError } from './getPatternError';
import { getRequiredError } from './getRequiredError';
import { getValidateError } from './getValidateError';

const getFieldErrors = (field: Field, fields: Field[]) => {
  const {
    input: { value },
    required,
    validate,
    pattern,
    match,
  } = field;

  const inputValue = value.trim();

  const requiredError = getRequiredError(required, inputValue);
  const validateError = getValidateError(validate, inputValue);
  const patternError = getPatternError(pattern, inputValue);
  const matchError = getMatchError(match, fields, inputValue);

  return [requiredError, validateError, patternError, matchError].filter(
    excludeFalse
  );
};

const getFormErrors = (fields: Field[]): FormErrors => {
  const obj = {};
  fields.forEach((field) => {
    const errors = getFieldErrors(field, fields);
    errors.length > 0 &&
      Object.assign(obj, {
        [field.input.name]: errors[0],
      });
  });
  return obj;
};

export { getFormErrors };
