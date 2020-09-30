import { Field, FieldError } from '../models';
import { getMatchError } from './getMatchError';
import { getPatternError } from './getPatternError';
import { getRequiredError } from './getRequiredError';
import { getValidateError } from './getValidateError';

const getFieldError = (field: Field, fields: Field[]) => {
  const { ref, required, validate, pattern, match } = field;

  const inputValue = ref.value.trim();

  const requiredError = getRequiredError(required, inputValue);
  const validateError = getValidateError(validate, inputValue);
  const patternError = getPatternError(pattern, inputValue);
  const matchError = getMatchError(match, fields, inputValue);

  const typeErrors = [
    requiredError,
    validateError,
    patternError,
    matchError,
  ].filter(Boolean);

  return (
    typeErrors.length > 0 && {
      [ref.name]: typeErrors[0],
    }
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
